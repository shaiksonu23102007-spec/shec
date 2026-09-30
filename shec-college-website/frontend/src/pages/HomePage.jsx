import { Link } from 'react-router-dom';
import { ArrowUpRight } from 'lucide-react';
import SectionTitle from '../components/SectionTitle';
import { announcements, departments, leadership, statCards } from '../data/siteData';

const highlights = [
  { icon: '🎓', title: 'Industry-Ready Learning', text: 'Hands-on curriculum combining theory with practical outcomes and campus mentoring.' },
  { icon: '🏫', title: 'Smart Campus', text: 'Modern classrooms, digital labs and technology-enabled academic support.' },
  { icon: '💼', title: 'Strong Placements', text: 'Career support with internships, mentorship, and hiring events with recruiters.' },
  { icon: '🌍', title: 'Global Vision', text: 'Research exposure, innovation-driven projects and socially responsible leadership.' }
];

function HomePage() {
  return (
    <>
      <section
        className="relative isolate overflow-hidden bg-pine-900 text-white"
        style={{
          backgroundImage: "linear-gradient(90deg, rgba(14, 43, 38, .96) 0%, rgba(14, 43, 38, .86) 47%, rgba(14, 43, 38, .3) 100%), url('https://images.unsplash.com/photo-1562774053-701939374585?auto=format&fit=crop&w=2200&q=88')",
          backgroundPosition: 'center',
          backgroundSize: 'cover'
        }}
      >
        <div className="container mx-auto grid min-h-[620px] items-center gap-14 py-16 sm:py-20 lg:grid-cols-[1.15fr_.85fr] lg:py-24">
          <div className="max-w-3xl animate-[fadeUp_.7s_ease-out_both]">
            <div className="mb-7 inline-flex items-center gap-3 text-xs font-extrabold uppercase tracking-[0.2em] text-citrus">
              <span className="h-px w-9 bg-citrus" /> Welcome to SHEC
            </div>
            <h1 className="max-w-3xl font-display text-5xl leading-[1.04] text-white sm:text-6xl lg:text-7xl">
              Make your ambition <span className="text-citrus">matter.</span>
            </h1>
            <p className="mt-7 max-w-xl text-base leading-8 text-white/78 sm:text-lg">
              A campus for curious minds, practical thinkers, and the next generation of engineers and leaders.
            </p>
            <div className="mt-9 flex flex-wrap gap-3">
              <Link to="/admissions" className="inline-flex items-center gap-2 rounded-full bg-citrus px-6 py-3.5 text-sm font-extrabold text-ink transition-transform hover:-translate-y-0.5">
                Explore admissions <ArrowUpRight size={17} />
              </Link>
              <Link to="/departments" className="inline-flex items-center rounded-full border border-white/40 px-6 py-3.5 text-sm font-bold text-white transition-colors hover:bg-white/10">
                Find your department
              </Link>
            </div>
            <div className="mt-10 flex flex-wrap gap-x-6 gap-y-2 text-xs font-semibold text-white/65">
              <span>Practice-led learning</span><span className="text-coral">/</span>
              <span>Industry mentorship</span><span className="text-coral">/</span>
              <span>Student-first campus</span>
            </div>
          </div>

          <div className="self-end border-l border-white/35 pb-1 pl-7 pt-2 lg:mb-8 lg:ml-auto lg:w-[330px] lg:animate-[fadeUp_.7s_.15s_ease-out_both]">
            <div className="mb-5 text-xs font-extrabold uppercase tracking-[0.2em] text-citrus">Campus, at a glance</div>
            <div className="grid grid-cols-2 gap-x-8 gap-y-6">
              {statCards.map((stat) => (
                <div key={stat.label} className="border-t border-white/25 pt-3">
                  <strong className="block font-display text-3xl font-normal text-white">{stat.value}</strong>
                  <span className="mt-1 block text-xs font-semibold text-white/65">{stat.label}</span>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      <section className="section bg-paper">
        <div className="container">
          <SectionTitle kicker="Announcements" title="Latest updates across campus" />
          <div className="rounded-xl border border-ink/10 bg-white px-5 py-4 shadow-sm">
            <div className="flex flex-wrap gap-3">
              {announcements.map((item) => (
                <span key={item} className="rounded-full border border-pine-100 bg-pine-50 px-4 py-2 text-xs font-bold text-pine-800">{item}</span>
              ))}
            </div>
          </div>
        </div>
      </section>

      <section className="section bg-pine-50">
        <div className="container">
          <SectionTitle kicker="Why SHEC" title="A modern college experience with purpose" />
          <div className="card-grid">
            {highlights.map((item) => (
              <article key={item.title} className="feature-card">
                <div className="feature-icon">{item.icon}</div>
                <h3>{item.title}</h3>
                <p>{item.text}</p>
              </article>
            ))}
          </div>
        </div>
      </section>

      <section className="section">
        <div className="container">
          <SectionTitle kicker="Departments" title="Academic excellence across disciplines" action={{ href: '/departments', label: 'View all departments' }} />
          <div className="card-grid">
            {departments.slice(0, 4).map((dept) => (
              <article key={dept.id} className="card dept-card">
                <div className="dept-banner" style={{ background: `linear-gradient(135deg, ${dept.color}, rgba(13,45,98,0.9))` }}>
                  <h3>{dept.short}</h3>
                </div>
                <div className="dept-body">
                  <h3>{dept.name}</h3>
                  <p>{dept.description}</p>
                  <div className="tag-list">
                    {dept.courses.slice(0, 3).map((course) => (
                      <span key={course} className="tag">{course}</span>
                    ))}
                  </div>
                </div>
              </article>
            ))}
          </div>
        </div>
      </section>

      <section className="section section-alt">
        <div className="container">
          <SectionTitle kicker="Leadership" title="Guiding the SHEC vision" action={{ href: '/leadership', label: 'Meet our leaders' }} />
          <div className="leadership-grid">
            {leadership.slice(0, 3).map((person) => (
              <article key={person.name} className="person-card">
                <div className="person-photo" style={{ backgroundImage: `url(${person.photo})` }} />
                <div className="card-body">
                  <h3>{person.name}</h3>
                  <div className="role">{person.designation}</div>
                  <p>{person.bio}</p>
                </div>
              </article>
            ))}
          </div>
        </div>
      </section>
    </>
  );
}

export default HomePage;
