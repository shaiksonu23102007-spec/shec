import { useState } from 'react';
import SectionTitle from '../components/SectionTitle';
import { apiRequest } from '../services/api';

function AdmissionsPage() {
  const [form, setForm] = useState({
    applicant_name: '',
    email: '',
    phone: '',
    course: 'B.Tech',
    department: 'CSE'
  });
  const [status, setStatus] = useState('');

  const handleChange = (event) => {
    const { name, value } = event.target;
    setForm((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    try {
      const result = await apiRequest('/admissions/', {
        method: 'POST',
        body: form
      });
      setStatus(`Application submitted successfully for ${result.admission.applicant_name}.`);
      setForm({ applicant_name: '', email: '', phone: '', course: 'B.Tech', department: 'CSE' });
    } catch (error) {
      setStatus(error.message);
    }
  };

  return (
    <>
      <section className="page-banner">
        <div className="container">
          <div className="kicker text-blue-100">Admissions</div>
          <h1>Start your SHEC journey with confidence.</h1>
        </div>
      </section>

      <section className="page-content">
        <div className="container two-col">
          <div className="text-panel">
            <SectionTitle kicker="Process" title="Admission overview" />
            <ul className="list">
              <li>Choose your preferred undergraduate programme and campus stream.</li>
              <li>Submit academic details, certificates and a valid photo ID.</li>
              <li>Pay the counselling or application fee and await review.</li>
              <li>Complete document verification and final confirmation.</li>
            </ul>
          </div>

          <div className="info-card">
            <h3>Eligibility</h3>
            <p>Minimum 10+2/PUC qualification with required subjects depending on programme and merit criteria.</p>
            <h3>Documents</h3>
            <p>Mark sheets, transfer certificate, passport-size photo, address proof and category certificate if applicable.</p>
          </div>
        </div>

        <div className="container" style={{ marginTop: 40 }}>
          <div className="form-panel">
            <SectionTitle kicker="Apply now" title="Online Admission Form" />
            <form className="form-grid" onSubmit={handleSubmit}>
              <div className="field">
                <label>Full Name</label>
                <input type="text" name="applicant_name" value={form.applicant_name} onChange={handleChange} placeholder="Enter your full name" />
              </div>
              <div className="field">
                <label>Email</label>
                <input type="email" name="email" value={form.email} onChange={handleChange} placeholder="you@example.com" />
              </div>
              <div className="field">
                <label>Phone</label>
                <input type="tel" name="phone" value={form.phone} onChange={handleChange} placeholder="Mobile number" />
              </div>
              <div className="field">
                <label>Course</label>
                <select name="course" value={form.course} onChange={handleChange}>
                  <option>B.Tech</option>
                  <option>M.Tech</option>
                  <option>BBA</option>
                </select>
              </div>
              <div className="field">
                <label>Department</label>
                <select name="department" value={form.department} onChange={handleChange}>
                  <option>CSE</option>
                  <option>CSE (AI & DS)</option>
                  <option>ECE</option>
                  <option>EEE</option>
                  <option>Mechanical</option>
                  <option>Civil</option>
                </select>
              </div>
              <div className="field full">
                <label>Academic Background</label>
                <textarea placeholder="List your board, marks, and stream details" />
              </div>
              <div className="field full">
                <label>Document Upload</label>
                <input type="file" />
              </div>
              <div className="field full">
                <button type="submit" className="btn btn-primary">Submit Application</button>
                {status ? <p style={{ marginTop: 12, color: '#16a34a' }}>{status}</p> : null}
              </div>
            </form>
          </div>
        </div>
      </section>
    </>
  );
}

export default AdmissionsPage;
