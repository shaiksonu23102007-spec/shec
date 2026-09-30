function IDCard() {
  return (
    <div className="id-card">
      <div className="id-card-head">
        <div>
          <strong style={{ fontSize: '1.05rem' }}>SHEC</strong>
          <div style={{ fontSize: '0.72rem', opacity: 0.8 }}>Student Identity Card</div>
        </div>
        <div style={{ fontWeight: 800 }}>2024-25</div>
      </div>

      <div className="student-mini">
        <img
          src="https://images.unsplash.com/photo-1500648767791-00dcc994a43e?auto=format&fit=crop&w=400&q=80"
          alt="Student"
        />
        <div>
          <strong>Student One</strong>
          <div style={{ opacity: 0.8 }}>Roll No: CSE-2024-101</div>
        </div>
      </div>

      <div className="id-card-grid" style={{ marginTop: '16px' }}>
        <div><strong>Department:</strong> CSE</div>
        <div><strong>Branch:</strong> Computer Science & Engineering</div>
        <div><strong>Academic Year:</strong> 2024-2025</div>
        <div><strong>Blood Group:</strong> O+</div>
      </div>
    </div>
  );
}

export default IDCard;
