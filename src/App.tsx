/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState } from "react";
import { BrowserRouter as Router, Routes, Route, Navigate } from "react-router-dom";
import { DashboardLayout } from "./layouts/DashboardLayout";
import { Dashboard } from "./pages/Dashboard";
import { CRM } from "./pages/CRM";
import { Inventory } from "./pages/Inventory";
import { PixelCraft } from "./pages/PixelCraft";
import { Chatbot } from "./pages/Chatbot";
import { ImageGen } from "./pages/ImageGen";
import { Login } from "./pages/Login";
import { ProjectManagement } from "./pages/ProjectManagement";
import { MyTasks } from "./pages/MyTasks";
import { Placeholder } from "./pages/Placeholder";
import { ThemeProvider } from "./components/theme-provider";

export default function App() {
  const [isAuthenticated, setIsAuthenticated] = useState(false);

  return (
    <ThemeProvider defaultTheme="dark" storageKey="karn-os-theme">
      <Router>
        <Routes>
          <Route 
            path="/login" 
            element={
              isAuthenticated ? <Navigate to="/" replace /> : <Login onLogin={() => setIsAuthenticated(true)} />
            } 
          />
          
          <Route 
            path="/*" 
            element={
              isAuthenticated ? (
                <DashboardLayout onLogout={() => setIsAuthenticated(false)}>
                  <Routes>
                    {/* Dashboard & Overview */}
                    <Route path="/" element={<Dashboard />} />
                    <Route path="/reminders" element={<Placeholder title="Reminder System" />} />
                    <Route path="/approvals" element={<Placeholder title="My Pending Approvals" />} />
                    <Route path="/calendar" element={<Placeholder title="Calendar" />} />

                    {/* CRM */}
                    <Route path="/crm" element={<CRM />} />

                    {/* HR */}
                    <Route path="/hr/attendance" element={<Placeholder title="Attendance Management" />} />
                    <Route path="/hr/leaves" element={<Placeholder title="Leave Management" />} />
                    <Route path="/hr/holidays" element={<Placeholder title="Holidays" />} />

                    {/* Project Management */}
                    <Route path="/projects" element={<ProjectManagement />} />
                    <Route path="/projects/milestones" element={<Placeholder title="Milestone Management" />} />
                    <Route path="/projects/tasks" element={<Placeholder title="Task Management" />} />
                    <Route path="/projects/assignments" element={<Placeholder title="Task Assignment" />} />
                    <Route path="/projects/my-tasks" element={<MyTasks />} />
                    <Route path="/projects/templates" element={<Placeholder title="Project Templates" />} />
                    <Route path="/projects/workflows" element={<Placeholder title="Workflow Management" />} />
                    <Route path="/projects/reports" element={<Placeholder title="Task Status Report" />} />

                    {/* Analytics & Reporting */}
                    <Route path="/analytics/team" element={<Placeholder title="Team Utilization" />} />
                    <Route path="/analytics/reports" element={<Placeholder title="Project Reports" />} />

                    {/* Document Management */}
                    <Route path="/documents" element={<Placeholder title="Document Management" />} />

                    {/* System Administration */}
                    <Route path="/admin/type-masters" element={<Placeholder title="Type Masters" />} />

                    {/* Legacy / Other Tools */}
                    <Route path="/inventory" element={<Inventory />} />
                    <Route path="/pixel-craft" element={<PixelCraft />} />
                    <Route path="/chat" element={<Chatbot />} />
                    <Route path="/image-gen" element={<ImageGen />} />
                    
                    <Route path="*" element={<Navigate to="/" replace />} />
                  </Routes>
                </DashboardLayout>
              ) : (
                <Navigate to="/login" replace />
              )
            } 
          />
        </Routes>
      </Router>
    </ThemeProvider>
  );
}

