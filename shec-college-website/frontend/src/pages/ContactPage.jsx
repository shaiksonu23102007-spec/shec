function ContactPage() {
  return (
    <>
      <section className="page-banner">
        <div className="container">
          <div className="kicker" style={{ color: '#cfe3ff' }}>Contact</div>
          <h1>Connect with SHEC.</h1>
        </div>
      </section>

      <section className="page-content">
        <div className="container two-col">
          <div className="info-card">
            <h3>Reach us</h3>
            <p>45 Knowledge Avenue, Bengaluru, Karnataka 560001</p>
            <p>+91 80 4000 7120</p>
            <p>hello@shec.edu.in</p>
            <p>Monday to Saturday: 9:00 AM to 5:00 PM</p>
          </div>

          <div className="form-panel">
            <h3>Send a message</h3>
            <form>
              <div className="field">
                <label>Name</label>
                <input type="text" placeholder="Your name" />
              </div>
              <div className="field">
                <label>Email</label>
                <input type="email" placeholder="Your email" />
              </div>
              <div className="field">
                <label>Message</label>
                <textarea placeholder="How can we help you?" />
              </div>
              <button type="submit" className="btn btn-primary">Send Message</button>
            </form>
          </div>
        </div>
      </section>
    </>
  );
}

export default ContactPage;
