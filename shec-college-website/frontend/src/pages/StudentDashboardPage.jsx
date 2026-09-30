import { useEffect, useState } from 'react';
import { apiRequest } from '../services/api';

function StudentDashboardPage() {
  const [dashboard, setDashboard] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const loadDashboard = async () => {
      try {
        const result = await apiRequest('/student/dashboard');
        setDashboard(result);
      } catch (error) {
        console.error(error);
      } finally {
        setLoading(false);
      }
    };

    loadDashboard();
  }, []);

  if (loading) {
    return <div className="container page-content"><div className="info-card">Loading student dashboard...</div></div>;
  }

  if (!dashboard) {
    return <div className="container page-content"><div className="info-card">Unable to load dashboard data.</div></div>;
  }

  const { profile, attendance, timetable, assignments, fees, id_card } = dashboard;

  return (
    <>
      <section className="page-banner">
        <div className="container">
          <div className="kicker text-blue-100">Student Dashboard</div>
          <h1>Welcome, {profile.student_name}.</h1>
        </div>
      </section>

      <section className="page-content">
        <div className="container two-col">
          <div className="info-card">
            <h3>Profile</h3>
            <p><strong>Roll Number:</strong> {profile.roll_number}</p>
            <p><strong>Department:</strong> {profile.department}</p>
            <p><strong>Semester:</strong> {profile.semester}</p>
            <p><strong>Academic Year:</strong> {profile.year}</p>
            <p><strong>Advisor:</strong> {profile.advisor}</p>
          </div>

          <div className="info-card">
            <h3>Fee status</h3>
            <p><strong>Total Fees:</strong> ₹{fees.total_fee.toLocaleString()}</p>
            <p><strong>Payment Status:</strong> {fees.payment_status}</p>
            <p><strong>Due Date:</strong> {fees.due_date || 'N/A'}</p>
          </div>
        </div>

        <div className="container" style={{ marginTop: 28 }}>
          <div className="two-col">
            <div className="info-card">
              <h3>Attendance overview</h3>
              <div className="table-wrap">
                <table>
                  <thead>
                    <tr><th>Subject</th><th>Attended</th><th>Percentage</th></tr>
                  </thead>
                  <tbody>
                    {attendance.map((item) => (
                      <tr key={item.subject}>
                        <td>{item.subject}</td>
                        <td>{item.attended}/{item.total}</td>
                        <td>{item.percentage}%</td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>

            <div className="info-card">
              <h3>Digital ID card</h3>
              <div style={{ marginTop: 18 }}>
                <div className="id-card">
                  <div className="id-card-head">
                    <div>
                      <strong style={{ fontSize: '1.05rem' }}>SHEC</strong>
                      <div style={{ fontSize: '0.72rem', opacity: 0.8 }}>Student Identity Card</div>
                    </div>
                    <div style={{ fontWeight: 800 }}>{id_card.academic_year}</div>
                  </div>
                  <div className="student-mini">
                    <img src="https://images.unsplash.com/photo-1500648767791-00dcc994a43e?auto=format&fit=crop&w=400&q=80" alt={id_card.student_name} />
                    <div>
                      <strong>{id_card.student_name}</strong>
                      <div style={{ opacity: 0.8 }}>Roll No: {id_card.roll_number}</div>
                    </div>
                  </div>
                  <div className="id-card-grid" style={{ marginTop: '16px' }}>
                    <div><strong>Department:</strong> {id_card.department}</div>
                    <div><strong>College:</strong> {id_card.college_name}</div>
                    <div><strong>Year:</strong> {id_card.academic_year}</div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>

        <div className="container" style={{ marginTop: 28 }}>
          <div className="two-col">
            <div className="info-card">
              <h3>Class timetable</h3>
              <div className="table-wrap">
                <table>
                  <thead>
                    <tr><th>Day</th><th>Slot</th><th>Subject</th><th>Room</th></tr>
                  </thead>
                  <tbody>
                    {timetable.map((period) => (
                      <tr key={`${period.day}-${period.slot}`}>
                        <td>{period.day}</td>
                        <td>{period.slot}</td>
                        <td>{period.subject}</td>
                        <td>{period.room}</td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>

            <div className="info-card">
              <h3>Assignments</h3>
              <div className="table-wrap">
                <table>
                  <thead>
                    <tr><th>Title</th><th>Subject</th><th>Status</th></tr>
                  </thead>
                  <tbody>
                    {assignments.map((item) => (
                      <tr key={item.title}>
                        <td>{item.title}</td>
                        <td>{item.subject}</td>
                        <td>{item.status}</td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          </div>
        </div>
      </section>
    </>
  );
}

export default StudentDashboardPage;
