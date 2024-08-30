import { BrowserRouter as Router, Routes, Route, Navigate } from "react-router-dom";
import App from "./App.jsx";
import Error from "./screens/Error";
import Albums from "./screens/Albums.jsx";
import Users from "./screens/Users";
import ManageSubAdmins from "./screens/ManageSubAdmins";
import Login from "./screens/Login";
import Dashboard from "./screens/Dashboard.jsx";

const MyRoutes = () => {
  return (
    <Routes>
      <Route path="/" element={<App />}>
        <Route path="/" element={<Navigate to="/dashboard" />} />
        <Route path="dashboard" element={<Dashboard />} />
        <Route path="albums" element={<Albums />} />
        <Route path="users" element={<Users />} />
        <Route path="manage-subadmins" element={<ManageSubAdmins />} />
      </Route>
      <Route path="login" element={<Login />} />
      <Route path="*" element={<Error />} />
    </Routes>
  );
};

export default MyRoutes;
