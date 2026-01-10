import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import { AuthProvider } from "./contexts/AuthContext";
import Login from "./pages/Login";
import Dashboard from "./pages/Dashboard";

function App() {
  return (
    <AuthProvider>
      <BrowserRouter>
        <Routes>
          {/* Public Route - Login (optional now) */}
          <Route path="/login" element={<Login />} />

          {/* Direct access to Dashboard (no auth required in bypass mode) */}
          <Route path="/dashboard" element={<Dashboard />} />

          {/* Admin Route (no auth required in bypass mode) */}
          <Route
            path="/admin"
            element={
              <div className="p-8">
                <h1 className="text-2xl font-bold">Admin Panel</h1>
                <p>Only admins can see this page.</p>
              </div>
            }
          />

          {/* Default - Go directly to Dashboard */}
          <Route path="/" element={<Navigate to="/dashboard" replace />} />

          {/* 404 - Redirect to Dashboard */}
          <Route path="*" element={<Navigate to="/dashboard" replace />} />
        </Routes>
      </BrowserRouter>
    </AuthProvider>
  );
}

export default App;
