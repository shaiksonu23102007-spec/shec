import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import IDCard from '../components/IDCard';
import { loginUser } from '../services/auth';

function StudentLoginPage() {
  const navigate = useNavigate();
  const [form, setForm] = useState({ email: 'student1@shec.edu.in', password: 'student123' });
  const [message, setMessage] = useState('');
  const [error, setError] = useState('');

  const handleChange = (event) => {
    const { name, value } = event.target;
    setForm((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    setMessage('');
    setError('');

    try {
      const result = await loginUser(form);
      localStorage.setItem('shec_token', result.token);
      setMessage(`Welcome back, ${result.user.full_name}!`);
      setTimeout(() => navigate('/student-dashboard'), 500);
    } catch (err) {
      setError(err.message);
    }
  };

  return (
    <>
      <section className="page-banner">
        <div className="container">
          <div className="kicker" style={{ color: '#cfe3ff' }}>Student Portal</div>
          <h1>Secure access to your academic records.</h1>
        </div>
      </section>

      <section className="page-content">
        <div className="container two-col">
          <div className="form-panel">
            <h3>Student Login</h3>
            <form onSubmit={handleSubmit}>
              <div className="field">
                <label>Email</label>
                <input
                  type="email"
                  name="email"
                  value={form.email}
                  onChange={handleChange}
                  placeholder="student1@shec.edu.in"
                />
              </div>
              <div className="field">
                <label>Password</label>
                <input
                  type="password"
                  name="password"
                  value={form.password}
                  onChange={handleChange}
                  placeholder="Enter password"
                />
              </div>
              <button type="submit" className="btn btn-primary">Login</button>
              {message ? <p style={{ color: '#16a34a', marginTop: 14 }}>{message}</p> : null}
              {error ? <p style={{ color: '#dc2626', marginTop: 14 }}>{error}</p> : null}
            </form>
          </div>

          <div className="info-card">
            <h3>Student Dashboard Highlights</h3>
            <ul className="list">
              <li>Personal attendance overview</li>
              <li>Class timetable and assignment status</li>
              <li>Fee payment progress</li>
              <li>Downloadable digital ID card</li>
            </ul>
            <div style={{ marginTop: 24 }}>
              <IDCard />
            </div>
          </div>
        </div>
      </section>
    </>
  );
}

export default StudentLoginPage;
