import React, { useEffect } from "react";
import {
  BrowserRouter as Router,
  Routes,
  Route,
  Navigate,
} from "react-router-dom"; // ⬅️ tambah Navigate
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { useDispatch } from "react-redux";
import { getUser } from "./store/slices/userSlice";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";

// Layout
import Layout from "./components/Layout";

// Pages
import HomePage from "./pages/HomePage";
import Login from "./pages/Login";
import ResetPassword from "./pages/ResetPassword";
import ForgotPassword from "./pages/ForgotPassword";
import ManageSkills from "./pages/ManageSkills";
import ManageTimeline from "./pages/ManageTimeline";
import ManageProjects from "./pages/ManageProjects";
import ViewProjects from "./pages/ViewProjects";
import UpdateProject from "./pages/UpdateProject";
import KanbanBoard from "./pages/KanbanPage";
import ArchiveProjects from "./pages/ArchiveProjects";
import FinanceManagement from "./pages/FinanceManagement";
import RevenueSharing from "./pages/RevenueSharing";
import ProjectCalendar from "./pages/ProjectCalendar";
import CrewArchivePage from "./pages/CrewArchivePage";
import NotesArchive from "./pages/NotesArchive";

function App() {
  const dispatch = useDispatch();

  const queryClient = new QueryClient();

  useEffect(() => {
    dispatch(getUser());
  }, [dispatch]);

  return (
    <QueryClientProvider client={queryClient}>
      <Router>
        <Routes>
          {/* ⬅️ Redirect otomatis dari root ke /login */}
          <Route path="/" element={<Navigate to="/login" replace />} />

          {/* Login dan Auth */}
          <Route path="/login" element={<Login />} />
          <Route path="/password/forgot" element={<ForgotPassword />} />
          <Route path="/password/reset/:token" element={<ResetPassword />} />

          {/* Dashboard */}
          <Route
            path="/dashboard"
            element={
              <Layout>
                <HomePage />
              </Layout>
            }
          />
          <Route
            path="/manage/skills"
            element={
              <Layout>
                <ManageSkills />
              </Layout>
            }
          />
          <Route
            path="/manage/timeline"
            element={
              <Layout>
                <ManageTimeline />
              </Layout>
            }
          />
          <Route
            path="/manage/projects"
            element={
              <Layout>
                <ManageProjects />
              </Layout>
            }
          />
          <Route
            path="/view/project/:id"
            element={
              <Layout>
                <ViewProjects />
              </Layout>
            }
          />
          <Route
            path="/update/project/:id"
            element={
              <Layout>
                <UpdateProject />
              </Layout>
            }
          />
          <Route
            path="/manage/kanban"
            element={
              <Layout>
                <KanbanBoard />
              </Layout>
            }
          />
          <Route
            path="/manage/calendar"
            element={
              <Layout>
                <ProjectCalendar />
              </Layout>
            }
          />
          <Route
            path="/archive-projects"
            element={
              <Layout>
                <ArchiveProjects />
              </Layout>
            }
          />
          <Route
            path="/finance-management"
            element={
              <Layout>
                <FinanceManagement />
              </Layout>
            }
          />
          <Route
            path="/revenue-sharing"
            element={
              <Layout>
                <RevenueSharing />
              </Layout>
            }
          />
          <Route
            path="/crew-archive"
            element={
              <Layout>
                <CrewArchivePage />
              </Layout>
            }
          />
          <Route
            path="/notes-archive"
            element={
              <Layout>
                <NotesArchive />
              </Layout>
            }
          />
        </Routes>

        <ToastContainer position="bottom-right" theme="dark" />
      </Router>
    </QueryClientProvider>
  );
}

export default App;
