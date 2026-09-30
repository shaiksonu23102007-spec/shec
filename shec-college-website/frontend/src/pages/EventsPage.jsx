import { events } from '../data/siteData';

function EventsPage() {
  return (
    <>
      <section className="page-banner">
        <div className="container">
          <div className="kicker" style={{ color: '#cfe3ff' }}>Events</div>
          <h1>Student life beyond the classroom.</h1>
        </div>
      </section>

      <section className="page-content">
        <div className="container event-grid">
          {events.map((event) => (
            <article key={event.title} className="card">
              <div className="card-body">
                <div className="kicker" style={{ color: '#0d2d62' }}>{event.category}</div>
                <h3>{event.title}</h3>
                <div style={{ color: '#0d2d62', fontWeight: 700 }}>{event.date}</div>
                <p style={{ marginTop: 12 }}>{event.description}</p>
              </div>
            </article>
          ))}
        </div>
      </section>
    </>
  );
}

export default EventsPage;
