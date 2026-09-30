import SectionTitle from '../components/SectionTitle';
import { leadership } from '../data/siteData';

function LeadershipPage() {
  return (
    <>
      <section className="page-banner">
        <div className="container">
          <div className="kicker text-blue-100">Leadership</div>
          <h1>Meet the leaders shaping SHEC’s mission.</h1>
        </div>
      </section>

      <section className="page-content">
        <div className="container">
          <SectionTitle kicker="Profiles" title="Institutional leadership" />
          <div className="leadership-grid">
            {leadership.map((person) => (
              <article key={person.name} className="person-card">
                <div className="person-photo" style={{ backgroundImage: `url(${person.photo})` }} />
                <div className="card-body">
                  <h3>{person.name}</h3>
                  <div className="role">{person.designation}</div>
                  <div className="role muted-role">{person.qualification}</div>
                  <p>{person.bio}</p>
                  <div className="legacy-heading">Legacy</div>
                  <p className="legacy-text">{person.legacy}</p>
                </div>
              </article>
            ))}
          </div>
        </div>
      </section>
    </>
  );
}

export default LeadershipPage;
