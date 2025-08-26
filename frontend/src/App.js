 import { BrowserRouter as Router, Routes, Route, useLocation } from 'react-router-dom';
import Register from './Components/Register';
import Login from './Components/Login';
import Profile from './Components/Profile';
import Navbar from './Components/Navbar';
import Home from './Components/Home';
import UpdateProfile from './Components/UpdateProfile';
import AdminDashboard from './Components/Admin/AdminDashboard';
import AdminLogin from './Components/Admin/AdminLogin';
import AdminViewUsers from './Components/Admin/AdminViewUsers';

 function AppWrapper() {
  const location = useLocation();
  const hideNavbar = location.pathname.startsWith('/admin');

  return (
    <>
      {!hideNavbar && <Navbar />}
      <Routes>
        <Route path="/" element={<Login />} />
        <Route path="/register" element={<Register />} />
        <Route path="/login" element={<Login />} />
        <Route path="/profile" element={<Profile />} />
        <Route path="/update" element={<UpdateProfile />} />
        <Route path="/home" element={<Home />} />

         <Route path="/admin-dashboard" element={<AdminDashboard />} />
        <Route path="/admin-login" element={<AdminLogin />} />
        <Route path="/admin/users" element={<AdminViewUsers />} />
      </Routes>
    </>
  );
}

function App() {
  return (
    <Router>
      <AppWrapper />
    </Router>
  );
}

export default App;
