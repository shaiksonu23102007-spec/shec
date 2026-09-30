import SectionTitle from '../components/SectionTitle';

const infrastructure = [
  ['🏫', 'Modern Academic Blocks'],
  ['🧪', 'Advanced Laboratories'],
  ['📚', 'Central Library'],
  ['🏕️', 'Student Hostels'],
  ['🎯', 'Innovation Center'],
  ['⚽', 'Sports Complex']
];

function AboutPage() {
  return (
    <>
      <section className="page-banner">
        <div className="container">
          <div className="kicker text-blue-100">About SHEC</div>
          <h1>Building future-ready citizens through quality education.</h1>
        </div>
      </section>

      <section className="page-content">
        <div className="container two-col">
          <div className="text-panel">
            <SectionTitle kicker="History" title="A legacy of excellence" />
            <p>
              SHEC was founded with a vision to create a multidisciplinary learning environment where students can grow academically, socially and professionally. Over the years, the college has evolved into a trusted institution for engineering and technology education, blending tradition, values and innovation.
            </p>
            <p>
              From a small foundation to a flourishing academic ecosystem, SHEC continues to offer a strong platform for applied learning, skill development and student leadership.
            </p>
          </div>

          <div className="info-card">
            <h3>Vision</h3>
            <p>
              To become a leading center of professional learning and innovation that contributes to sustainable development and societal progress.
            </p>
            <h3>Mission</h3>
            <p>
              To nurture intellectual curiosity, ethical values, and practical competency through quality teaching, research, and community engagement.
            </p>
          </div>
        </div>
      </section>

      <section className="section section-alt">
        <div className="container">
          <SectionTitle kicker="Infrastructure" title="A campus designed for world-class learning" />
          <div className="card-grid">
            {infrastructure.map(([icon, title]) => (
              <article key={title} className="feature-card">
                <div className="feature-icon">{icon}</div>
                <h3>{title}</h3>
                <p>Purpose-built spaces to support academic excellence, creativity, and student growth.</p>
              </article>
            ))}
          </div>
        </div>
      </section>
    </>
  );
}

export default AboutPage;
