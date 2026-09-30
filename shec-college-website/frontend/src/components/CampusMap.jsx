function CampusMap() {
  return (
    <div className="card" style={{ padding: 0, overflow: 'hidden' }}>
      <div
        style={{
          height: '340px',
          background: 'linear-gradient(135deg, #d9e9df, #f6d59b)',
          position: 'relative'
        }}
      >
        <div
          style={{
            position: 'absolute',
            inset: 0,
            backgroundImage:
              'linear-gradient(rgba(29,73,66,0.15) 1px, transparent 1px), linear-gradient(90deg, rgba(29,73,66,0.15) 1px, transparent 1px)',
            backgroundSize: '36px 36px'
          }}
        />
        <div
          style={{
            position: 'absolute',
            left: '8%',
            top: '18%',
            width: '140px',
            height: '90px',
            background: '#fff',
            border: '2px solid #1d4942',
            borderRadius: '12px',
            display: 'grid',
            placeItems: 'center',
            fontWeight: 700,
            color: '#1d4942'
          }}
        >
          Admin
        </div>
        <div
          style={{
            position: 'absolute',
            right: '12%',
            top: '16%',
            width: '160px',
            height: '100px',
            background: '#fff',
            border: '2px solid #1d4942',
            borderRadius: '12px',
            display: 'grid',
            placeItems: 'center',
            fontWeight: 700,
            color: '#1d4942'
          }}
        >
          Academic Block
        </div>
        <div
          style={{
            position: 'absolute',
            left: '30%',
            bottom: '18%',
            width: '180px',
            height: '90px',
            background: '#fff',
            border: '2px solid #1d4942',
            borderRadius: '12px',
            display: 'grid',
            placeItems: 'center',
            fontWeight: 700,
            color: '#1d4942'
          }}
        >
          Library
        </div>
        <div
          style={{
            position: 'absolute',
            right: '22%',
            bottom: '20%',
            width: '180px',
            height: '90px',
            background: '#fff',
            border: '2px solid #1d4942',
            borderRadius: '12px',
            display: 'grid',
            placeItems: 'center',
            fontWeight: 700,
            color: '#1d4942'
          }}
        >
          Hostel
        </div>
      </div>
    </div>
  );
}

export default CampusMap;
