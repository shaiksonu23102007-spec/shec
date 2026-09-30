import { Routes, Route } from 'react-router-dom';
import Navbar from './components/Navbar';
import Footer from './components/Footer';
import HomePage from './pages/HomePage';
import AboutPage from './pages/AboutPage';
import LeadershipPage from './pages/LeadershipPage';
import DepartmentsPage from './pages/DepartmentsPage';
import DepartmentDetailPage from './pages/DepartmentDetailPage';
import AdmissionsPage from './pages/AdmissionsPage';
import StudentLoginPage from './pages/StudentLoginPage';
import StudentDashboardPage from './pages/StudentDashboardPage';
import FacultyPage from './pages/FacultyPage';
import FeeStructurePage from './pages/FeeStructurePage';
import EventsPage from './pages/EventsPage';
import GalleryPage from './pages/GalleryPage';
import HostelPage from './pages/HostelPage';
import ContactPage from './pages/ContactPage';
import AdminPage from './pages/AdminPage';

function App() {
  return (
    <div className="app-shell flex min-h-screen flex-col">
      <Navbar />
      <main className="page-layout flex-1">
        <Routes>
          <Route path="/" element={<HomePage />} />
          <Route path="/about" element={<AboutPage />} />
          <Route path="/leadership" element={<LeadershipPage />} />
          <Route path="/departments" element={<DepartmentsPage />} />
          <Route path="/departments/:slug" element={<DepartmentDetailPage />} />
          <Route path="/admissions" element={<AdmissionsPage />} />
          <Route path="/student-login" element={<StudentLoginPage />} />
          <Route path="/student-dashboard" element={<StudentDashboardPage />} />
          <Route path="/faculty" element={<FacultyPage />} />
          <Route path="/fees" element={<FeeStructurePage />} />
          <Route path="/events" element={<EventsPage />} />
          <Route path="/gallery" element={<GalleryPage />} />
          <Route path="/hostel" element={<HostelPage />} />
          <Route path="/contact" element={<ContactPage />} />
          <Route path="/admin" element={<AdminPage />} />
        </Routes>
      </main>
      <Footer />
    </div>
  );
}

export default App;
