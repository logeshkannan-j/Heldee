import React from "react";
import ReactDOM from "react-dom/client";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import App from "./App";
import Login from "./pages/Login";
import AdminLayout from "./pages/admin/AdminLayout";
import Overview from "./pages/admin/Overview";
import ProjectsAdmin from "./pages/admin/ProjectsAdmin";
import SkillsAdmin from "./pages/admin/SkillsAdmin";
import PricingAdmin from "./pages/admin/PricingAdmin";
import EnquiriesAdmin from "./pages/admin/EnquiriesAdmin";
import ContentAdmin from "./pages/admin/ContentAdmin";
import { AuthProvider } from "./lib/auth";
import ProtectedRoute from "./components/ProtectedRoute";
import "./index.css";

ReactDOM.createRoot(document.getElementById("root")!).render(
  <React.StrictMode>
    <BrowserRouter>
      <AuthProvider>
        <Routes>
          <Route path="/" element={<App />} />
          <Route path="/login" element={<Login />} />
          <Route
            path="/control"
            element={
              <ProtectedRoute>
                <AdminLayout />
              </ProtectedRoute>
            }
          >
            <Route index element={<Overview />} />
            <Route path="projects" element={<ProjectsAdmin />} />
            <Route path="skills" element={<SkillsAdmin />} />
            <Route path="pricing" element={<PricingAdmin />} />
            <Route path="enquiries" element={<EnquiriesAdmin />} />
            <Route path="content" element={<ContentAdmin />} />
          </Route>
        </Routes>
      </AuthProvider>
    </BrowserRouter>
  </React.StrictMode>
);
