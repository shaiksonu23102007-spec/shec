from flask import Blueprint, jsonify, request

from app.models import get_db_connection

admission_bp = Blueprint('admission', __name__)

DEFAULT_ADMISSIONS = [
    {
        'id': 1,
        'applicant_name': 'Aarav Sharma',
        'email': 'aarav@example.com',
        'phone': '9876543210',
        'course': 'B.Tech',
        'department': 'CSE',
        'status': 'new'
    }
]


def load_admissions():
    conn = get_db_connection()
    if conn is not None:
        try:
            with conn.cursor() as cursor:
                cursor.execute('SELECT a.*, d.name AS department FROM admissions a LEFT JOIN departments d ON d.id = a.department_id ORDER BY a.id DESC')
                rows = cursor.fetchall()
                if rows:
                    return [
                        {
                            'id': row['id'],
                            'applicant_name': row['applicant_name'],
                            'email': row['email'],
                            'phone': row['phone'],
                            'course': row['course'],
                            'department': row['department'] or 'General',
                            'status': row['status']
                        }
                        for row in rows
                    ]
        finally:
            conn.close()
    return DEFAULT_ADMISSIONS


@admission_bp.get('/')
def list_admissions():
    return jsonify({'admissions': load_admissions()})


@admission_bp.post('/')
def submit_admission():
    payload = request.get_json(silent=True) or {}
    required = ['applicant_name', 'email', 'phone', 'course', 'department']
    missing = [field for field in required if not payload.get(field)]
    if missing:
        return jsonify({'error': f'Missing fields: {missing}'}), 400

    conn = get_db_connection()
    if conn is not None:
        try:
            with conn.cursor() as cursor:
                cursor.execute('SELECT id FROM departments WHERE slug = %s OR name = %s LIMIT 1', (payload['department'].lower().replace(' ', '-'), payload['department']))
                department_row = cursor.fetchone()
                department_id = department_row['id'] if department_row else None
                cursor.execute(
                    'INSERT INTO admissions (applicant_name, email, phone, course, department_id, status, form_data) VALUES (%s, %s, %s, %s, %s, %s, %s)',
                    (
                        payload['applicant_name'],
                        payload['email'],
                        payload['phone'],
                        payload['course'],
                        department_id,
                        'new',
                        str({k: v for k, v in payload.items() if k not in {'department'}})
                    )
                )
            conn.commit()
        finally:
            conn.close()

    record = {
        'id': len(DEFAULT_ADMISSIONS) + 1,
        'applicant_name': payload['applicant_name'],
        'email': payload['email'],
        'phone': payload['phone'],
        'course': payload['course'],
        'department': payload['department'],
        'status': 'new'
    }
    DEFAULT_ADMISSIONS.append(record)
    return jsonify({'message': 'Admission submitted successfully', 'admission': record}), 201
