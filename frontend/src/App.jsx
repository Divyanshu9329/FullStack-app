import { Routes, Route, Navigate } from 'react-router-dom';
import LandingPage from "./pages/LandingPage";
import AdminLayout from './components/AdminLayout';
import AdminProjects from './pages/AdminProjects';
import AdminClients from './pages/AdminClients';
import AdminContacts from './pages/AdminContacts';
import AdminSubscribers from './pages/AdminSubscribers';

function App() {
  return (
    <Routes>
      <Route path="/" element={<LandingPage />} />

      <Route path="/admin" element={<AdminLayout />}>
        <Route path="projects" element={<AdminProjects />} />
        <Route path="clients" element={<AdminClients />} />
        <Route path="contacts" element={<AdminContacts />} />
        <Route path="subscribers" element={<AdminSubscribers />} />
      </Route>
    </Routes>

  );
}

export default App;
