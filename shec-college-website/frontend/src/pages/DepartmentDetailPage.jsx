import { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { departments } from '../data/siteData';

function DepartmentDetailPage() {
  const { slug } = useParams();
  const [department, setDepartment] = useState(null);

  useEffect(() => {
    const found = departments.find((item) => item.slug === slug);
    setDepartment(found || null);
  }, [slug]);

  if (!department) {
    return <div className="container page-content"><div className="info-card">Loading department details...</div></div>;
  }

  return (
    <>
      <section className="page-banner">
        <div className="container">
          <div className="kicker text-blue-100">{department.short}</div>
          <h1>{department.name}</h1>
        </div>
      </section>

      <section className="page-content">
        <div className="container two-col">
          <div className="text-panel">
            <h3>Department introduction</h3>
            <p>{department.description}</p>
            <ul className="list">
              {department.courses.map((course) => (
                <li key={course}>{course}</li>
              ))}
            </ul>
          </div>

          <div className="info-card">
            <h3>Faculty</h3>
            {department.faculty.map((facultyMember) => (
              <div key={facultyMember.name} style={{ marginBottom: '14px' }}>
                <strong>{facultyMember.name}</strong>
                <div>{facultyMember.designation}</div>
              </div>
            ))}
          </div>
        </div>

        <div className="container" style={{ marginTop: 40 }}>
          <div className="table-wrap">
            <table>
              <thead>
                <tr>
                  <th>Semester</th>
                  <th>Course</th>
                  <th>Faculty</th>
                  <th>Lab / Room</th>
                </tr>
              </thead>
              <tbody>
                {department.courses.slice(0, 5).map((course, index) => (
                  <tr key={course}>
                    <td>Semester 5</td>
                    <td>{course}</td>
                    <td>{department.faculty[index % department.faculty.length].name}</td>
                    <td>{department.short}-Lab</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </section>
    </>
  );
}

export default DepartmentDetailPage;
