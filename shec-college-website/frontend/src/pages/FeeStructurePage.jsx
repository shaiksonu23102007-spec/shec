import { feeStructure, scholarships } from '../data/siteData';

function FeeStructurePage() {
  return (
    <>
      <section className="page-banner">
        <div className="container">
          <div className="kicker text-blue-100">Fee Structure</div>
          <h1>Transparent and student-friendly fee policies.</h1>
        </div>
      </section>

      <section className="page-content">
        <div className="container">
          <div className="table-wrap">
            <table>
              <thead>
                <tr>
                  <th>Department</th>
                  <th>Annual Fee</th>
                  <th>Semester Fee</th>
                </tr>
              </thead>
              <tbody>
                {feeStructure.tuition.map((row) => (
                  <tr key={row.department}>
                    <td>{row.department}</td>
                    <td>{row.annual}</td>
                    <td>{row.semester}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>

          <div className="two-col" style={{ marginTop: 36 }}>
            <div className="info-card">
              <h3>Counselling & Hostel</h3>
              <p><strong>Counselling Fee:</strong> {feeStructure.counselling}</p>
              <p><strong>Hostel Fee:</strong> {feeStructure.hostel.hostel}</p>
              <p><strong>Mess Fee:</strong> {feeStructure.hostel.mess}</p>
              <p><strong>Security Deposit:</strong> {feeStructure.hostel.security}</p>
            </div>

            <div className="info-card">
              <h3>Scholarships</h3>
              {scholarships.map((scholarship) => (
                <div key={scholarship.name} style={{ marginBottom: 18 }}>
                  <strong>{scholarship.name}</strong>
                  <div>{scholarship.eligibility}</div>
                  <div>Deadline: {scholarship.deadline}</div>
                  <div>Amount: {scholarship.amount}</div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>
    </>
  );
}

export default FeeStructurePage;
