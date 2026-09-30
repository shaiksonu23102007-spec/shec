import CampusMap from '../components/CampusMap';

function HostelPage() {
  return (
    <>
      <section className="page-banner">
        <div className="container">
          <div className="kicker" style={{ color: '#cfe3ff' }}>Hostel & Campus Life</div>
          <h1>Comfortable living for a focused student journey.</h1>
        </div>
      </section>

      <section className="page-content">
        <div className="container two-col">
          <div className="text-panel">
            <h3>Hostel facility overview</h3>
            <ul className="list">
              <li>Secure residential blocks with 24/7 wardens and CCTV coverage.</li>
              <li>Shared and single rooms with furnished essentials and ventilation.</li>
              <li>Mess and common rooms for study, recreation and community building.</li>
              <li>Dedicated support for health, counselling and day-to-day student needs.</li>
            </ul>
          </div>

          <div className="info-card">
            <h3>Hostel features</h3>
            <p><strong>Room Type:</strong> Twin-sharing / Single</p>
            <p><strong>Facilities:</strong> Wi-Fi, laundry, water purifier, cleaning support</p>
            <p><strong>Fees:</strong> ₹22,000 hostel + ₹18,000 mess</p>
          </div>
        </div>

        <div className="container" style={{ marginTop: 40 }}>
          <div className="text-panel">
            <h3>Campus map</h3>
            <CampusMap />
          </div>
        </div>
      </section>
    </>
  );
}

export default HostelPage;
