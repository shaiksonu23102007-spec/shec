from flask import Blueprint, jsonify

from app.models import get_db_connection

fees_bp = Blueprint('fees', __name__)

DEFAULT_FEE_STRUCTURE = [
    {'department': 'CSE', 'annual_fee': 85000, 'semester_fee': 42500},
    {'department': 'CSE (AI & DS)', 'annual_fee': 90000, 'semester_fee': 45000},
    {'department': 'ECE', 'annual_fee': 82000, 'semester_fee': 41000},
    {'department': 'EEE', 'annual_fee': 80000, 'semester_fee': 40000},
    {'department': 'Mechanical', 'annual_fee': 78000, 'semester_fee': 39000},
    {'department': 'Civil', 'annual_fee': 76000, 'semester_fee': 38000}
]

DEFAULT_SCHOLARSHIPS = [
    {'name': 'Merit Excellence Scholarship', 'eligibility': 'CGPA above 8.5 and no backlogs', 'deadline': '2026-11-30', 'amount': 50000, 'application_link': 'https://example.com/scholarships/merit'},
    {'name': 'EWS Support Grant', 'eligibility': 'Family income below threshold', 'deadline': '2026-12-15', 'amount': 25000, 'application_link': 'https://example.com/scholarships/ews'},
    {'name': 'Sports Achievement Award', 'eligibility': 'State/national sports participation certificate', 'deadline': '2026-12-01', 'amount': 30000, 'application_link': 'https://example.com/scholarships/sports'}
]


def get_fee_structure():
    conn = get_db_connection()
    if conn is not None:
        try:
            with conn.cursor() as cursor:
                cursor.execute('SELECT d.name AS department, s.tuition_fee AS annual_fee, ROUND(s.tuition_fee/2, 2) AS semester_fee FROM students st JOIN fees s ON s.student_id = st.id JOIN departments d ON d.id = s.department_id LIMIT 6')
                rows = cursor.fetchall()
                if rows:
                    return [
                        {'department': row['department'], 'annual_fee': float(row['annual_fee']), 'semester_fee': float(row['semester_fee'])}
                        for row in rows
                    ]
        finally:
            conn.close()
    return DEFAULT_FEE_STRUCTURE


def get_scholarships():
    conn = get_db_connection()
    if conn is not None:
        try:
            with conn.cursor() as cursor:
                cursor.execute('SELECT * FROM scholarships ORDER BY deadline')
                rows = cursor.fetchall()
                if rows:
                    return [
                        {
                            'name': row['name'],
                            'eligibility': row['eligibility'],
                            'deadline': row['deadline'].strftime('%Y-%m-%d') if row['deadline'] else None,
                            'amount': float(row['amount']) if row['amount'] is not None else 0,
                            'application_link': row['application_link']
                        }
                        for row in rows
                    ]
        finally:
            conn.close()
    return DEFAULT_SCHOLARSHIPS


@fees_bp.get('/structure')
def fee_structure():
    return jsonify({
        'tuition_fees': get_fee_structure(),
        'counselling_fee': 5000,
        'hostel_mess': {
            'hostel_fee': 22000,
            'mess_fee': 18000,
            'security_deposit': 10000
        }
    })


@fees_bp.get('/scholarships')
def scholarships():
    return jsonify({'scholarships': get_scholarships()})
