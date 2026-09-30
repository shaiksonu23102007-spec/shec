from flask import Blueprint, jsonify

from app.models import get_db_connection


department_bp = Blueprint('department', __name__)

DEFAULT_DEPARTMENTS = [
    {
        'id': 1,
        'name': 'Computer Science and Engineering',
        'short_name': 'CSE',
        'slug': 'cse',
        'description': 'Focuses on computation, software development, and systems engineering.',
        'hod': 'Dr. Anjali Menon',
        'established_year': 2001,
        'contact_email': 'cse@shec.edu.in',
        'faculty': [
            {'name': 'Dr. Anjali Menon', 'designation': 'Professor & HOD', 'specialization': 'Algorithms & Systems'},
            {'name': 'Prof. Rakesh Kumar', 'designation': 'Assistant Professor', 'specialization': 'Operating Systems'}
        ],
        'subjects': ['Data Structures', 'Operating Systems', 'Database Systems', 'Machine Learning', 'Compiler Design'],
        'timetable': [
            {'day': 'Monday', 'slot': '09:00-10:00', 'subject': 'Data Structures', 'faculty': 'Dr. Anjali Menon', 'room': 'CSE-101'},
            {'day': 'Monday', 'slot': '10:15-11:15', 'subject': 'Operating Systems', 'faculty': 'Prof. Rakesh Kumar', 'room': 'CSE-203'}
        ],
        'attendance': {'average': 87.1, 'subjects': 3},
        'assignments': [
            {'title': 'AI Mini Project', 'status': 'pending'},
            {'title': 'DBMS Lab Submission', 'status': 'submitted'}
        ]
    },
    {
        'id': 2,
        'name': 'Computer Science and Engineering (AI & DS)',
        'short_name': 'CSE-AI',
        'slug': 'cse-ai-ds',
        'description': 'AI, analytics, and data-driven engineering education.',
        'hod': 'Dr. Raghav Iyer',
        'established_year': 2020,
        'contact_email': 'cseai@shec.edu.in',
        'faculty': [
            {'name': 'Dr. Raghav Iyer', 'designation': 'Professor & HOD', 'specialization': 'AI Systems'},
            {'name': 'Dr. Kavya Nair', 'designation': 'Associate Professor', 'specialization': 'Machine Learning'}
        ],
        'subjects': ['Python for AI', 'Statistical Learning', 'Data Visualization', 'Deep Learning', 'Big Data'],
        'timetable': [
            {'day': 'Tuesday', 'slot': '11:30-12:30', 'subject': 'Machine Learning', 'faculty': 'Dr. Kavya Nair', 'room': 'AI-Lab'}
        ],
        'attendance': {'average': 88.4, 'subjects': 3},
        'assignments': [
            {'title': 'Neural Network Assignment', 'status': 'pending'},
            {'title': 'Data Visualization Report', 'status': 'graded'}
        ]
    },
    {
        'id': 3,
        'name': 'Electronics and Communication Engineering',
        'short_name': 'ECE',
        'slug': 'ece',
        'description': 'Specialization in communication systems, embedded electronics and signal processing.',
        'hod': 'Dr. Krishna Rao',
        'established_year': 2003,
        'contact_email': 'ece@shec.edu.in',
        'faculty': [
            {'name': 'Dr. Krishna Rao', 'designation': 'Professor & HOD', 'specialization': 'Signal Processing'},
            {'name': 'Prof. Nihal Verma', 'designation': 'Professor', 'specialization': 'Embedded Systems'}
        ],
        'subjects': ['Signals & Systems', 'Digital Electronics', 'VLSI', 'Communication Systems', 'Embedded Systems'],
        'timetable': [{'day': 'Thursday', 'slot': '10:15-11:15', 'subject': 'Digital Signal Processing', 'faculty': 'Dr. Krishna Rao', 'room': 'ECE-102'}],
        'attendance': {'average': 86.2, 'subjects': 3},
        'assignments': [{'title': 'Analog Circuit Lab', 'status': 'pending'}]
    },
    {
        'id': 4,
        'name': 'Electrical and Electronics Engineering',
        'short_name': 'EEE',
        'slug': 'eee',
        'description': 'Power systems, control engineering and sustainable electrical technologies.',
        'hod': 'Dr. Nisha K',
        'established_year': 2002,
        'contact_email': 'eee@shec.edu.in',
        'faculty': [
            {'name': 'Dr. Nisha K', 'designation': 'Professor & HOD', 'specialization': 'Power Systems'},
            {'name': 'Prof. Vishal Jain', 'designation': 'Professor', 'specialization': 'Control Systems'}
        ],
        'subjects': ['Power Systems', 'Electrical Machines', 'Control Systems', 'Power Electronics', 'Renewable Energy'],
        'timetable': [{'day': 'Friday', 'slot': '09:00-10:00', 'subject': 'Electrical Machines', 'faculty': 'Prof. Vishal Jain', 'room': 'EEE-201'}],
        'attendance': {'average': 84.9, 'subjects': 3},
        'assignments': [{'title': 'Smart Grid Case Study', 'status': 'submitted'}]
    },
    {
        'id': 5,
        'name': 'Mechanical Engineering',
        'short_name': 'MECH',
        'slug': 'mechanical',
        'description': 'Covers design, manufacturing, thermal sciences and industrial innovation.',
        'hod': 'Dr. Sandeep Nair',
        'established_year': 2004,
        'contact_email': 'mech@shec.edu.in',
        'faculty': [
            {'name': 'Dr. Sandeep Nair', 'designation': 'Professor & HOD', 'specialization': 'Thermal Systems'},
            {'name': 'Prof. M. Rao', 'designation': 'Professor', 'specialization': 'Design Engineering'}
        ],
        'subjects': ['Thermodynamics', 'Fluid Mechanics', 'Strength of Materials', 'CAD', 'Heat Transfer'],
        'timetable': [{'day': 'Wednesday', 'slot': '10:15-11:15', 'subject': 'CAD', 'faculty': 'Prof. M. Rao', 'room': 'MECH-110'}],
        'attendance': {'average': 85.5, 'subjects': 2},
        'assignments': [{'title': 'Design Drafting Sheet', 'status': 'pending'}]
    },
    {
        'id': 6,
        'name': 'Civil Engineering',
        'short_name': 'CIVIL',
        'slug': 'civil',
        'description': 'Infrastructure, construction management, structural engineering and sustainable design.',
        'hod': 'Dr. Deepa Mohan',
        'established_year': 2005,
        'contact_email': 'civil@shec.edu.in',
        'faculty': [
            {'name': 'Dr. Deepa Mohan', 'designation': 'Professor & HOD', 'specialization': 'Structural Engineering'},
            {'name': 'Prof. A. Sen', 'designation': 'Associate Professor', 'specialization': 'Surveying'}
        ],
        'subjects': ['Structural Analysis', 'Surveying', 'Hydraulics', 'Transportation', 'Environmental Engineering'],
        'timetable': [{'day': 'Monday', 'slot': '14:00-15:00', 'subject': 'Structural Analysis', 'faculty': 'Dr. Deepa Mohan', 'room': 'CIVIL-203'}],
        'attendance': {'average': 83.7, 'subjects': 3},
        'assignments': [{'title': 'Site Planning Portfolio', 'status': 'graded'}]
    }
]


def get_departments():
    conn = get_db_connection()
    if conn is not None:
        try:
            with conn.cursor() as cursor:
                cursor.execute('SELECT * FROM departments ORDER BY id')
                rows = cursor.fetchall()
                if rows:
                    return [
                        {
                            'id': row['id'],
                            'name': row['name'],
                            'short_name': row['short_name'],
                            'slug': row['slug'],
                            'description': row['description'],
                            'hod': row['hod_name'],
                            'established_year': row['established_year'],
                            'contact_email': row['contact_email'],
                            'faculty': [],
                            'subjects': [],
                            'timetable': [],
                            'attendance': {'average': 0, 'subjects': 0},
                            'assignments': []
                        } for row in rows
                    ]
        finally:
            conn.close()
    return DEFAULT_DEPARTMENTS


@department_bp.get('/')
def list_departments():
    return jsonify({'departments': get_departments()})


@department_bp.get('/<slug>')
def department_detail(slug):
    department = next((item for item in get_departments() if item['slug'] == slug), None)
    if department is None:
        return jsonify({'error': 'Department not found'}), 404
    return jsonify({'department': department})
