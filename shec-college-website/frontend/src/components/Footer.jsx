function Footer() {
  return (
    <footer className="site-footer">
      <div className="container">
        <div className="footer-grid">
          <div className="footer-brand">
            <div className="brand" style={{ color: '#fff' }}>
              <div className="brand-mark">S</div>
              <div>
                <span className="brand-name">SHEC</span>
                <small>College Website</small>
              </div>
            </div>
            <p>
              SHEC empowers students with future-ready learning, practical exposure,
              and values-driven leadership for a better world.
            </p>
          </div>

          <div className="footer-col">
            <h4>Quick Links</h4>
            <a href="/about">About</a>
            <a href="/admissions">Admissions</a>
            <a href="/departments">Departments</a>
            <a href="/events">Events</a>
          </div>

          <div className="footer-col">
            <h4>Campus</h4>
            <a href="/gallery">Gallery</a>
            <a href="/hostel">Hostels</a>
            <a href="/faculty">Faculty</a>
            <a href="/fees">Fees</a>
          </div>

          <div className="footer-col">
            <h4>Contact</h4>
            <p>45 Knowledge Avenue, Bengaluru</p>
            <p>+91 80 4000 7120</p>
            <p>hello@shec.edu.in</p>
          </div>
        </div>

        <div className="footer-bottom">
          © 2026 SHEC College. All rights reserved.
        </div>
      </div>
    </footer>
  );
}

export default Footer;
