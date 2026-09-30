from flask import Blueprint, jsonify, request
from flask_jwt_extended import jwt_required, get_jwt_identity

from app.utils.security import hash_password, check_password
from app.utils.jwt_helper import generate_token
from app.models import get_db_connection


auth_bp = Blueprint('auth', __name__)

FALLBACK_USERS = [
    {
        'id': 1,
        'full_name': 'Student One',
        'email': 'student1@shec.edu.in',
        'password_hash': hash_password('student123'),
        'role': 'student',
        'phone': '9876543210'
    },
    {
        'id': 2,
        'full_name': 'Faculty One',
        'email': 'faculty1@shec.edu.in',
        'password_hash': hash_password('faculty123'),
        'role': 'faculty',
        'phone': '9123456780'
    },
    {
        'id': 3,
        'full_name': 'Admin One',
        'email': 'admin@shec.edu.in',
        'password_hash': hash_password('admin123'),
        'role': 'admin',
        'phone': '9988776655'
    }
]


def get_user_by_email(email):
    conn = get_db_connection()
    if conn is not None:
        try:
            with conn.cursor() as cursor:
                cursor.execute('SELECT * FROM users WHERE email = %s', (email.lower(),))
                user = cursor.fetchone()
                if user:
                    return {
                        'id': user['id'],
                        'full_name': user['full_name'],
                        'email': user['email'],
                        'password_hash': user['password_hash'],
                        'role': user['role'],
                        'phone': user['phone']
                    }
        finally:
            conn.close()

    return next((u for u in FALLBACK_USERS if u['email'].lower() == email.lower()), None)


@auth_bp.post('/register')
def register():
    payload = request.get_json(silent=True) or {}
    full_name = payload.get('full_name')
    email = payload.get('email')
    password = payload.get('password')
    role = payload.get('role', 'student')

    if not full_name or not email or not password:
        return jsonify({'error': 'full_name, email and password are required'}), 400

    if get_user_by_email(email):
        return jsonify({'error': 'User already exists'}), 409

    hashed = hash_password(password)
    conn = get_db_connection()
    if conn is not None:
        try:
            with conn.cursor() as cursor:
                cursor.execute(
                    'INSERT INTO users (full_name, email, password_hash, role, phone) VALUES (%s, %s, %s, %s, %s)',
                    (full_name, email.lower(), hashed, role, payload.get('phone', ''))
                )
            conn.commit()
            user_id = cursor.lastrowid
        finally:
            conn.close()
        user = {
            'id': user_id,
            'full_name': full_name,
            'email': email.lower(),
            'role': role,
            'phone': payload.get('phone', '')
        }
        token = generate_token({'id': user_id, 'role': role, 'email': email.lower()})
        return jsonify({'message': 'User registered successfully', 'token': token, 'user': user}), 201

    user = {
        'id': len(FALLBACK_USERS) + 1,
        'full_name': full_name,
        'email': email.lower(),
        'password_hash': hashed,
        'role': role,
        'phone': payload.get('phone', '')
    }
    FALLBACK_USERS.append(user)
    token = generate_token({'id': user['id'], 'role': user['role'], 'email': user['email']})
    return jsonify({'message': 'User registered successfully', 'token': token, 'user': {'id': user['id'], 'full_name': user['full_name'], 'email': user['email'], 'role': user['role']}}), 201


@auth_bp.post('/login')
def login():
    payload = request.get_json(silent=True) or {}
    email = payload.get('email')
    password = payload.get('password')

    if not email or not password:
        return jsonify({'error': 'email and password are required'}), 400

    user = get_user_by_email(email)
    if user is None or not check_password(password, user['password_hash']):
        return jsonify({'error': 'Invalid email or password'}), 401

    token = generate_token({'id': user['id'], 'role': user['role'], 'email': user['email']})
    return jsonify({
        'message': 'Login successful',
        'token': token,
        'user': {
            'id': user['id'],
            'full_name': user['full_name'],
            'email': user['email'],
            'role': user['role']
        }
    })


@auth_bp.get('/me')
@jwt_required()
def me():
    identity = get_jwt_identity()
    conn = get_db_connection()
    if conn is not None:
        try:
            with conn.cursor() as cursor:
                cursor.execute('SELECT * FROM users WHERE id = %s', (identity['id'],))
                user = cursor.fetchone()
                if user:
                    return jsonify({
                        'id': user['id'],
                        'full_name': user['full_name'],
                        'email': user['email'],
                        'role': user['role'],
                        'phone': user['phone']
                    })
        finally:
            conn.close()

    user = next((item for item in FALLBACK_USERS if str(item['id']) == str(identity['id'])), None)
    if user is None:
        return jsonify({'error': 'User not found'}), 404
    return jsonify({
        'id': user['id'],
        'full_name': user['full_name'],
        'email': user['email'],
        'role': user['role'],
        'phone': user['phone']
    })
