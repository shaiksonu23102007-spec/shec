import { Link } from 'react-router-dom';
import { departments } from '../data/siteData';

function DepartmentsPage() {
  return (
    <>
      <section className="page-banner">
        <div className="container">
          <div className="kicker" style={{ color: '#cfe3ff' }}>Departments</div>
          <h1>Explore every academic domain at SHEC.</h1>
        </div>
      </section>

      <section className="page-content">
        <div className="container card-grid">
          {departments.map((dept) => (
            <article key={dept.id} className="card dept-card">
              <div className="dept-banner" style={{ background: `linear-gradient(135deg, ${dept.color}, rgba(13,45,98,0.9))` }}>
                <h3>{dept.short}</h3>
              </div>
              <div className="dept-body">
                <h3>{dept.name}</h3>
                <p>{dept.description}</p>
                <div className="tag-list">
                  {dept.courses.slice(0, 4).map((course) => (
                    <span key={`${dept.id}-${course}`} className="tag">{course}</span>
                  ))}
                </div>
                <div style={{ marginTop: 20 }}>
                  <Link to={`/departments/${dept.slug}`} className="btn btn-primary">View Department</Link>
                </div>
              </div>
            </article>
          ))}
        </div>
      </section>
    </>
  );
}

export default DepartmentsPage;
