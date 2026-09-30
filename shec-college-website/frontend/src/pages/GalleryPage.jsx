import { galleryItems } from '../data/siteData';

function GalleryPage() {
  return (
    <>
      <section className="page-banner">
        <div className="container">
          <div className="kicker" style={{ color: '#cfe3ff' }}>Gallery</div>
          <h1>A look into campus life and learning spaces.</h1>
        </div>
      </section>

      <section className="page-content">
        <div className="container">
          <div className="filter-row">
            {['All', 'Campus', 'Cafeteria', 'Hostel', 'Classrooms', 'Lab', 'Library'].map((filter) => (
              <button key={filter} type="button" className={`filter-chip ${filter === 'All' ? 'active' : ''}`}>
                {filter}
              </button>
            ))}
          </div>

          <div className="gallery-grid">
            {galleryItems.map((item) => (
              <article key={item.title} className="gallery-card">
                <img src={item.image} alt={item.title} />
                <div className="card-body">
                  <div className="kicker" style={{ color: '#0d2d62' }}>{item.category}</div>
                  <h3>{item.title}</h3>
                </div>
              </article>
            ))}
          </div>
        </div>
      </section>
    </>
  );
}

export default GalleryPage;
