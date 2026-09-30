from flask import Blueprint, jsonify, request

from app.models import get_db_connection

admin_bp = Blueprint('admin', __name__)

FALLBACK_STUDENTS = [
    {'id': 1, 'name': 'Student One', 'roll_number': 'CSE-2024-101', 'department': 'CSE', 'semester': 'Semester 5'},
    {'id': 2, 'name': 'Aditi Verma', 'roll_number': 'ECE-2024-110', 'department': 'ECE', 'semester': 'Semester 5'},
    {'id': 3, 'name': 'Rahul Menon', 'roll_number': 'MECH-2024-214', 'department': 'Mechanical', 'semester': 'Semester 5'}
]

FALLBACK_FACULTY = [
    {'id': 1, 'name': 'Dr. Anjali Menon', 'department': 'CSE', 'designation': 'Professor & HOD', 'email': 'cse@shec.edu.in'},
    {'id': 2, 'name': 'Dr. Kavya Nair', 'department': 'CSE-AI', 'designation': 'Associate Professor', 'email': 'cseai@shec.edu.in'},
    {'id': 3, 'name': 'Dr. Krishna Rao', 'department': 'ECE', 'designation': 'Professor', 'email': 'ece@shec.edu.in'}
]

FALLBACK_FEES = [
    {'id': 1, 'student_name': 'Student One', 'department': 'CSE', 'total_fee': 130000, 'status': 'pending'},
    {'id': 2, 'student_name': 'Aditi Verma', 'department': 'ECE', 'total_fee': 125000, 'status': 'paid'},
    {'id': 3, 'student_name': 'Rahul Menon', 'department': 'Mechanical', 'total_fee': 118000, 'status': 'partial'}
]

FALLBACK_LEADERSHIP = [
    {'id': 1, 'name': 'Ravi Kumar', 'designation': 'Chairman', 'bio': 'Visionary education leader and founder of the SHEC legacy.', 'legacy': 'History of Chairman Sir: Ravi Kumar built SHEC with values-driven leadership and strategic campus growth.', 'photo_url': 'https://images.unsplash.com/photo-1506794778202-cad84cf45f1d', 'category': 'chairman'},
    {'id': 2, 'name': 'Harshith', 'designation': 'Director', 'bio': 'Guides institutional strategy, innovation, and academic excellence.', 'legacy': 'The director has led SHEC through digital transformation and stronger industry-linked education systems.', 'photo_url': 'https://images.unsplash.com/photo-1500648767791-00dcc994a43e', 'category': 'director'},
    {'id': 3, 'name': 'Srinivasa Rao', 'designation': 'Principal', 'bio': 'Leads teaching quality, governance, and student affairs.', 'legacy': 'The principal has fostered outcome-based learning and strong academic standards across departments.', 'photo_url': 'https://images.unsplash.com/photo-1556157382-97eda2d62296', 'category': 'principal'},
    {'id': 4, 'name': 'Sudheer Chakravarthy', 'designation': 'Vice Principal', 'bio': 'Supports academic operations and institutional quality assurance.', 'legacy': 'Works closely with departments on mentoring systems and student success initiatives.', 'photo_url': 'https://images.unsplash.com/photo-1504593811423-6dd665756598', 'category': 'vice-principal'},
    {'id': 5, 'name': 'Manikanta', 'designation': 'Controller of Examinations (COE)', 'bio': 'Oversees exam integrity, digital evaluation, and transparent assessment processes.', 'legacy': 'The COE introduced stronger digital workflows and more transparent result communication.', 'photo_url': 'https://images.unsplash.com/photo-1534528741775-53994a69daeb', 'category': 'coe'}
]


def get_leadership_profiles():
    conn = get_db_connection()
    if conn is not None:
        try:
            with conn.cursor() as cursor:
                cursor.execute('SELECT * FROM leadership_profiles ORDER BY id')
                rows = cursor.fetchall()
                if rows:
                    return [
                        {
                            'id': row['id'],
                            'name': row['name'],
                            'designation': row['designation'],
                            'bio': row['bio'],
                            'legacy': row['legacy'],
                            'photo_url': row['photo_url'],
                            'category': row['category']
                        } for row in rows
                    ]
        finally:
            conn.close()
    return FALLBACK_LEADERSHIP


@admin_bp.get('/dashboard')
def dashboard():
    conn = get_db_connection()
    if conn is not None:
        try:
            with conn.cursor() as cursor:
                cursor.execute('SELECT COUNT(*) as c FROM students')
                students_count = cursor.fetchone()['c']
                cursor.execute('SELECT COUNT(*) as c FROM faculty')
                faculty_count = cursor.fetchone()['c']
                cursor.execute('SELECT COUNT(*) as c FROM departments')
                departments_count = cursor.fetchone()['c']
                cursor.execute('SELECT COUNT(*) as c FROM admissions')
                admissions_count = cursor.fetchone()['c']
        finally:
            conn.close()
    else:
        students_count = len(FALLBACK_STUDENTS)
        faculty_count = len(FALLBACK_FACULTY)
        departments_count = 6
        admissions_count = 320

    return jsonify({
        'stats': {
            'students': students_count,
            'faculty': faculty_count,
            'departments': departments_count,
            'admissions': admissions_count
        },
        'recent_activity': [
            {'title': 'New admission received', 'time': '2 hours ago'},
            {'title': 'Fee reminder sent', 'time': '4 hours ago'},
            {'title': 'Leadership profile updated', 'time': 'Today'}
        ]
    })


@admin_bp.get('/students')
def list_students():
    return jsonify({'students': FALLBACK_STUDENTS})


@admin_bp.post('/students')
def add_student():
    payload = request.get_json(silent=True) or {}
    if not payload.get('name') or not payload.get('roll_number'):
        return jsonify({'error': 'Student name and roll number are required'}), 400

    student = {
        'id': (FALLBACK_STUDENTS[-1]['id'] + 1) if FALLBACK_STUDENTS else 1,
        'name': payload.get('name'),
        'roll_number': payload.get('roll_number'),
        'department': payload.get('department', 'CSE'),
        'semester': payload.get('semester', 'Semester 1')
    }
    FALLBACK_STUDENTS.append(student)
    return jsonify({'message': 'Student created', 'student': student}), 201


@admin_bp.get('/faculty')
def list_faculty():
    return jsonify({'faculty': FALLBACK_FACULTY})


@admin_bp.post('/faculty')
def add_faculty():
    payload = request.get_json(silent=True) or {}
    if not payload.get('name'):
        return jsonify({'error': 'Faculty name is required'}), 400

    faculty = {
        'id': (FALLBACK_FACULTY[-1]['id'] + 1) if FALLBACK_FACULTY else 1,
        'name': payload.get('name'),
        'department': payload.get('department', 'CSE'),
        'designation': payload.get('designation', 'Professor'),
        'email': payload.get('email', 'faculty@shec.edu.in')
    }
    FALLBACK_FACULTY.append(faculty)
    return jsonify({'message': 'Faculty created', 'faculty': faculty}), 201


@admin_bp.get('/fees')
def list_fees():
    return jsonify({'fees': FALLBACK_FEES})


@admin_bp.post('/fees')
def add_fee():
    payload = request.get_json(silent=True) or {}
    if not payload.get('student_name') or not payload.get('total_fee'):
        return jsonify({'error': 'Student name and total fee are required'}), 400

    fee = {
        'id': (FALLBACK_FEES[-1]['id'] + 1) if FALLBACK_FEES else 1,
        'student_name': payload.get('student_name'),
        'department': payload.get('department', 'CSE'),
        'total_fee': payload.get('total_fee'),
        'status': payload.get('status', 'pending')
    }
    FALLBACK_FEES.append(fee)
    return jsonify({'message': 'Fee record created', 'fee': fee}), 201


@admin_bp.get('/leadership')
def list_leadership():
    return jsonify({'leadership': get_leadership_profiles()})


@admin_bp.post('/leadership')
def add_leadership():
    payload = request.get_json(silent=True) or {}
    name = payload.get('name')
    designation = payload.get('designation')
    if not name or not designation:
        return jsonify({'error': 'Leadership name and designation are required'}), 400

    leadership = {
        'id': (FALLBACK_LEADERSHIP[-1]['id'] + 1) if FALLBACK_LEADERSHIP else 1,
        'name': name,
        'designation': designation,
        'bio': payload.get('bio', 'Leadership profile entry.'),
        'legacy': payload.get('legacy', 'Legacy statement forthcoming.'),
        'photo_url': payload.get('photo_url', 'https://images.unsplash.com/photo-1544005313-94ddf0286df2'),
        'category': payload.get('category', 'leadership')
    }
    FALLBACK_LEADERSHIP.append(leadership)
    return jsonify({'message': 'Leadership profile created', 'leadership': leadership}), 201


@admin_bp.put('/leadership/<int:leadership_id>')
def update_leadership(leadership_id):
    payload = request.get_json(silent=True) or {}
    leadership = next((item for item in FALLBACK_LEADERSHIP if item['id'] == leadership_id), None)
    if leadership is None:
        return jsonify({'error': 'Leadership profile not found'}), 404
    leadership.update(payload)
    return jsonify({'message': 'Leadership profile updated', 'leadership': leadership})


@admin_bp.delete('/leadership/<int:leadership_id>')
def delete_leadership(leadership_id):
    index = next((i for i, item in enumerate(FALLBACK_LEADERSHIP) if item['id'] == leadership_id), None)
    if index is None:
        return jsonify({'error': 'Leadership profile not found'}), 404
    deleted = FALLBACK_LEADERSHIP.pop(index)
    return jsonify({'message': 'Leadership profile deleted', 'leadership': deleted})
