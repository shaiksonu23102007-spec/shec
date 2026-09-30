from flask import Blueprint, jsonify

from app.models import get_db_connection

student_bp = Blueprint('student', __name__)

DEFAULT_DASHBOARD = {
    'profile': {
        'student_name': 'Student One',
        'roll_number': 'CSE-2024-101',
        'department': 'Computer Science and Engineering',
        'semester': 'Semester 5',
        'year': '2024-2025',
        'advisor': 'Dr. Anjali Menon'
    },
    'attendance': [
        {'subject': 'Data Structures', 'total': 40, 'attended': 35, 'percentage': 87.5},
        {'subject': 'Operating Systems', 'total': 35, 'attended': 30, 'percentage': 85.7},
        {'subject': 'Machine Learning', 'total': 38, 'attended': 33, 'percentage': 86.8}
    ],
    'timetable': [
        {'day': 'Monday', 'slot': '09:00-10:00', 'subject': 'Data Structures', 'faculty': 'Dr. Anjali Menon', 'room': 'CSE-101'},
        {'day': 'Monday', 'slot': '10:15-11:15', 'subject': 'Operating Systems', 'faculty': 'Prof. Rakesh Kumar', 'room': 'CSE-203'},
        {'day': 'Tuesday', 'slot': '11:30-12:30', 'subject': 'Machine Learning', 'faculty': 'Dr. Kavya Nair', 'room': 'AI-Lab'}
    ],
    'assignments': [
        {'title': 'AI Mini Project', 'subject': 'Machine Learning', 'status': 'pending', 'due_date': '2026-10-05'},
        {'title': 'DBMS Lab Submission', 'subject': 'Database Systems', 'status': 'submitted', 'due_date': '2026-10-03'},
        {'title': 'Seminar Note Submission', 'subject': 'Communication Skills', 'status': 'graded', 'due_date': '2026-10-10'}
    ],
    'fees': {
        'tuition_fee': 85000,
        'hostel_fee': 22000,
        'mess_fee': 18000,
        'counselling_fee': 5000,
        'total_fee': 130000,
        'payment_status': 'pending'
    },
    'id_card': {
        'student_name': 'Student One',
        'roll_number': 'CSE-2024-101',
        'department': 'CSE',
        'college_name': 'SHEC',
        'academic_year': '2024-2025'
    }
}


def get_student_dashboard():
    conn = get_db_connection()
    if conn is not None:
        try:
            with conn.cursor() as cursor:
                cursor.execute('''SELECT s.id, s.roll_number, d.name AS department_name, d.short_name AS department_short, s.academic_year, s.semester, concat(u.full_name) AS student_name
                                 FROM students s JOIN departments d ON d.id = s.department_id JOIN users u ON u.id = s.user_id WHERE s.id = 1''')
                student = cursor.fetchone()
                if student:
                    cursor.execute('SELECT subject_name AS subject, total_classes AS total, attended_classes AS attended, percentage FROM attendance WHERE student_id = %s', (student['id'],))
                    attendance = cursor.fetchall()
                    cursor.execute('SELECT day_name AS day, slot, subject_name AS subject, faculty_name AS faculty, room_no AS room FROM timetables WHERE department_id = %s ORDER BY id LIMIT 3', (student['department_id'] if 'department_id' in student else 1,))
                    timetable = cursor.fetchall()
                    cursor.execute('SELECT title, subject_name AS subject, status, due_date FROM assignments WHERE student_id = %s ORDER BY due_date', (student['id'],))
                    assignments = cursor.fetchall()
                    cursor.execute('SELECT tuition_fee, hostel_fee, mess_fee, counselling_fee, total_fee, payment_status FROM fees WHERE student_id = %s ORDER BY id DESC LIMIT 1', (student['id'],))
                    fee_row = cursor.fetchone()
                    return {
                        'profile': {
                            'student_name': student['student_name'],
                            'roll_number': student['roll_number'],
                            'department': student['department_name'],
                            'semester': student['semester'],
                            'year': student['academic_year'],
                            'advisor': 'Dr. Anjali Menon'
                        },
                        'attendance': [
                            {'subject': row['subject'], 'total': row['total'], 'attended': row['attended'], 'percentage': float(row['percentage'])}
                            for row in attendance
                        ],
                        'timetable': [
                            {'day': row['day'], 'slot': row['slot'], 'subject': row['subject'], 'faculty': row['faculty'], 'room': row['room']}
                            for row in timetable
                        ],
                        'assignments': [
                            {'title': row['title'], 'subject': row['subject'], 'status': row['status'], 'due_date': row['due_date'].strftime('%Y-%m-%d') if row['due_date'] else None}
                            for row in assignments
                        ],
                        'fees': {
                            'tuition_fee': float(fee_row['tuition_fee']) if fee_row else 0,
                            'hostel_fee': float(fee_row['hostel_fee']) if fee_row else 0,
                            'mess_fee': float(fee_row['mess_fee']) if fee_row else 0,
                            'counselling_fee': float(fee_row['counselling_fee']) if fee_row else 0,
                            'total_fee': float(fee_row['total_fee']) if fee_row else 0,
                            'payment_status': fee_row['payment_status'] if fee_row else 'pending'
                        },
                        'id_card': {
                            'student_name': student['student_name'],
                            'roll_number': student['roll_number'],
                            'department': student['department_short'],
                            'college_name': 'SHEC',
                            'academic_year': student['academic_year']
                        }
                    }
        finally:
            conn.close()
    return DEFAULT_DASHBOARD


@student_bp.get('/dashboard')
def dashboard():
    return jsonify(get_student_dashboard())


@student_bp.get('/attendance')
def attendance():
    dashboard = get_student_dashboard()
    return jsonify({'attendance': dashboard['attendance']})


@student_bp.get('/fees')
def fees():
    dashboard = get_student_dashboard()
    return jsonify({
        'student_name': dashboard['profile']['student_name'],
        'tuition_fee': dashboard['fees']['tuition_fee'],
        'hostel_fee': dashboard['fees']['hostel_fee'],
        'mess_fee': dashboard['fees']['mess_fee'],
        'counselling_fee': dashboard['fees']['counselling_fee'],
        'total_fee': dashboard['fees']['total_fee'],
        'payment_status': dashboard['fees']['payment_status'],
        'due_date': '2026-10-30'
    })
