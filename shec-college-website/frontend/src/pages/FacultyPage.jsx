import { useEffect, useState } from 'react';
import SectionTitle from '../components/SectionTitle';
import { apiRequest } from '../services/api';

function FacultyPage() {
  const [faculty, setFaculty] = useState([]);

  useEffect(() => {
    const loadFaculty = async () => {
      try {
        const result = await apiRequest('/admin/faculty');
        setFaculty(result.faculty || []);
      } catch (error) {
        console.error(error);
      }
    };

    loadFaculty();
  }, []);

  return (
    <>
      <section className="page-banner">
        <div className="container">
          <div className="kicker text-blue-100">Faculty</div>
          <h1>Experienced educators guiding innovation and excellence.</h1>
        </div>
      </section>

      <section className="page-content">
        <div className="container">
          <SectionTitle kicker="Profiles" title="Department faculty" />
          <div className="card-grid">
            {faculty.map((member) => (
              <article key={member.name} className="card">
                <div className="card-body">
                  <h3>{member.name}</h3>
                  <div className="role" style={{ color: '#0d2d62', marginBottom: 10 }}>{member.department}</div>
                  <p><strong>Designation:</strong> {member.designation}</p>
                  <p><strong>Contact:</strong> {member.email || 'faculty@shec.edu.in'}</p>
                </div>
              </article>
            ))}
          </div>
        </div>
      </section>
    </>
  );
}

export default FacultyPage;
