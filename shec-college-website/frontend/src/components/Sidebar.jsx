import { Link } from 'react-router-dom';

function Sidebar() {
  return (
    <aside className="sidebar">
      <h3>Portal Menu</h3>
      <nav>
        <Link to="/student-login">Student Dashboard</Link>
        <Link to="/faculty">Faculty</Link>
        <Link to="/admissions">Admissions</Link>
        <Link to="/fees">Fee Structure</Link>
        <Link to="/hostel">Hostel</Link>
        <Link to="/admin">Admin Panel</Link>
      </nav>
    </aside>
  );
}

export default Sidebar;
