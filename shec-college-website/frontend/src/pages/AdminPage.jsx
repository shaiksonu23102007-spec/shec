import { useEffect, useState } from 'react';
import Sidebar from '../components/Sidebar';
import { apiRequest } from '../services/api';

const emptyStudent = { name: '', roll_number: '', department: 'CSE', semester: 'Semester 1' };
const emptyFaculty = { name: '', department: 'CSE', designation: 'Professor', email: '' };
const emptyFee = { student_name: '', department: 'CSE', total_fee: 0, status: 'pending' };
const emptyLeadership = {
  name: '',
  designation: '',
  bio: '',
  legacy: '',
  photo_url: '',
  category: 'leadership'
};

function AdminPage() {
  const [stats, setStats] = useState({ students: 0, faculty: 0, departments: 0, admissions: 0 });
  const [activity, setActivity] = useState([]);
  const [students, setStudents] = useState([]);
  const [faculty, setFaculty] = useState([]);
  const [fees, setFees] = useState([]);
  const [leadership, setLeadership] = useState([]);
  const [loading, setLoading] = useState(true);
  const [studentForm, setStudentForm] = useState(emptyStudent);
  const [facultyForm, setFacultyForm] = useState(emptyFaculty);
  const [feeForm, setFeeForm] = useState(emptyFee);
  const [leadershipForm, setLeadershipForm] = useState(emptyLeadership);

  const loadAdminData = async () => {
    try {
      const dashboard = await apiRequest('/admin/dashboard');
      const studentList = await apiRequest('/admin/students');
      const facultyList = await apiRequest('/admin/faculty');
      const feeList = await apiRequest('/admin/fees');
      const leadershipList = await apiRequest('/admin/leadership');

      setStats(dashboard.stats);
      setActivity(dashboard.recent_activity || []);
      setStudents(studentList.students || []);
      setFaculty(facultyList.faculty || []);
      setFees(feeList.fees || []);
      setLeadership(leadershipList.leadership || []);
    } catch (error) {
      console.error(error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    loadAdminData();
  }, []);

  const handleStudentSubmit = async (event) => {
    event.preventDefault();
    await apiRequest('/admin/students', { method: 'POST', body: studentForm });
    setStudentForm(emptyStudent);
    loadAdminData();
  };

  const handleFacultySubmit = async (event) => {
    event.preventDefault();
    await apiRequest('/admin/faculty', { method: 'POST', body: facultyForm });
    setFacultyForm(emptyFaculty);
    loadAdminData();
  };

  const handleFeeSubmit = async (event) => {
    event.preventDefault();
    await apiRequest('/admin/fees', { method: 'POST', body: feeForm });
    setFeeForm(emptyFee);
    loadAdminData();
  };

  const handleLeadershipSubmit = async (event) => {
    event.preventDefault();
    await apiRequest('/admin/leadership', { method: 'POST', body: leadershipForm });
    setLeadershipForm(emptyLeadership);
    loadAdminData();
  };

  const adminStats = [
    { label: 'Students', value: stats.students },
    { label: 'Faculty', value: stats.faculty },
    { label: 'Departments', value: stats.departments },
    { label: 'Admissions', value: stats.admissions }
  ];

  return (
    <>
      <section className="page-banner">
        <div className="container">
          <div className="kicker text-blue-100">Admin</div>
          <h1>College management dashboard.</h1>
        </div>
      </section>

      <section className="page-content">
        <div className="container two-col">
          <Sidebar />
          <div>
            <div className="card-grid">
              {adminStats.map((item) => (
                <div key={item.label} className="feature-card">
                  <div className="kicker">{item.label}</div>
                  <h3 style={{ fontSize: '2rem', marginTop: '8px' }}>{loading ? '...' : item.value}</h3>
                </div>
              ))}
            </div>

            <div className="form-panel" style={{ marginTop: 24 }}>
              <h3>Recent activity</h3>
              <div className="filter-row" style={{ display: 'grid', gap: 8 }}>
                {(activity.length ? activity : [{ title: 'Connected to admin dashboard API', time: 'Live' }]).map((item) => (
                  <div key={`${item.title}-${item.time}`} className="info-card" style={{ padding: 14 }}>
                    <strong>{item.title}</strong>
                    <div style={{ color: '#667085' }}>{item.time}</div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>

        <div className="container" style={{ marginTop: 30 }}>
          <div className="two-col">
            <div className="form-panel">
              <h3>Add Student</h3>
              <form onSubmit={handleStudentSubmit} className="form-grid">
                <div className="field"><label>Name</label><input value={studentForm.name} onChange={(e) => setStudentForm({ ...studentForm, name: e.target.value })} /></div>
                <div className="field"><label>Roll Number</label><input value={studentForm.roll_number} onChange={(e) => setStudentForm({ ...studentForm, roll_number: e.target.value })} /></div>
                <div className="field"><label>Department</label><select value={studentForm.department} onChange={(e) => setStudentForm({ ...studentForm, department: e.target.value })}><option>CSE</option><option>ECE</option><option>EEE</option><option>Mechanical</option><option>Civil</option></select></div>
                <div className="field"><label>Semester</label><input value={studentForm.semester} onChange={(e) => setStudentForm({ ...studentForm, semester: e.target.value })} /></div>
                <div className="field full"><button className="btn btn-primary" type="submit">Save Student</button></div>
              </form>
            </div>

            <div className="form-panel">
              <h3>Add Faculty</h3>
              <form onSubmit={handleFacultySubmit} className="form-grid">
                <div className="field"><label>Name</label><input value={facultyForm.name} onChange={(e) => setFacultyForm({ ...facultyForm, name: e.target.value })} /></div>
                <div className="field"><label>Department</label><select value={facultyForm.department} onChange={(e) => setFacultyForm({ ...facultyForm, department: e.target.value })}><option>CSE</option><option>CSE-AI</option><option>ECE</option><option>EEE</option></select></div>
                <div className="field"><label>Designation</label><input value={facultyForm.designation} onChange={(e) => setFacultyForm({ ...facultyForm, designation: e.target.value })} /></div>
                <div className="field"><label>Email</label><input value={facultyForm.email} onChange={(e) => setFacultyForm({ ...facultyForm, email: e.target.value })} /></div>
                <div className="field full"><button className="btn btn-primary" type="submit">Save Faculty</button></div>
              </form>
            </div>
          </div>

          <div className="two-col" style={{ marginTop: 30 }}>
            <div className="form-panel">
              <h3>Add Fee Record</h3>
              <form onSubmit={handleFeeSubmit} className="form-grid">
                <div className="field"><label>Student Name</label><input value={feeForm.student_name} onChange={(e) => setFeeForm({ ...feeForm, student_name: e.target.value })} /></div>
                <div className="field"><label>Department</label><select value={feeForm.department} onChange={(e) => setFeeForm({ ...feeForm, department: e.target.value })}><option>CSE</option><option>ECE</option><option>EEE</option><option>Mechanical</option></select></div>
                <div className="field"><label>Total Fee</label><input type="number" value={feeForm.total_fee} onChange={(e) => setFeeForm({ ...feeForm, total_fee: e.target.value })} /></div>
                <div className="field"><label>Status</label><select value={feeForm.status} onChange={(e) => setFeeForm({ ...feeForm, status: e.target.value })}><option>pending</option><option>paid</option><option>partial</option></select></div>
                <div className="field full"><button className="btn btn-primary" type="submit">Save Fee</button></div>
              </form>
            </div>

            <div className="info-card">
              <h3>Current records</h3>
              <div style={{ display: 'grid', gap: 12 }}>
                <div><strong>Students:</strong> {students.length}</div>
                <div><strong>Faculty:</strong> {faculty.length}</div>
                <div><strong>Fee Records:</strong> {fees.length}</div>
              </div>
            </div>
          </div>

          <div className="form-panel" style={{ marginTop: 30 }}>
            <h3>Leadership Profiles</h3>
            <div className="leadership-grid compact-grid">
              {leadership.map((leader) => (
                <div key={leader.id} className="info-card compact-card">
                  <strong>{leader.name}</strong>
                  <div>{leader.designation}</div>
                </div>
              ))}
            </div>
            <form onSubmit={handleLeadershipSubmit} className="form-grid" style={{ marginTop: 20 }}>
              <div className="field"><label>Name</label><input value={leadershipForm.name} onChange={(e) => setLeadershipForm({ ...leadershipForm, name: e.target.value })} /></div>
              <div className="field"><label>Designation</label><input value={leadershipForm.designation} onChange={(e) => setLeadershipForm({ ...leadershipForm, designation: e.target.value })} /></div>
              <div className="field"><label>Category</label><input value={leadershipForm.category} onChange={(e) => setLeadershipForm({ ...leadershipForm, category: e.target.value })} /></div>
              <div className="field"><label>Photo URL</label><input value={leadershipForm.photo_url} onChange={(e) => setLeadershipForm({ ...leadershipForm, photo_url: e.target.value })} /></div>
              <div className="field full"><label>Bio</label><textarea value={leadershipForm.bio} onChange={(e) => setLeadershipForm({ ...leadershipForm, bio: e.target.value })} /></div>
              <div className="field full"><label>Legacy</label><textarea value={leadershipForm.legacy} onChange={(e) => setLeadershipForm({ ...leadershipForm, legacy: e.target.value })} /></div>
              <div className="field full"><button className="btn btn-primary" type="submit">Save Leadership Profile</button></div>
            </form>
          </div>
        </div>
      </section>
    </>
  );
}

export default AdminPage;
