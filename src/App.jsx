import { useState } from "react";
import { SessionProvider } from "./context/SessionContext";
import { AuthProvider, useAuth } from "./context/AuthContext";
import Tracker from "./components/Tracker";
import SessionReport from "./components/SessionReport";
import Dashboard from "./components/Dashboard";
import Login from "./components/Login";
import { Eye, BarChart2, LayoutDashboard, LogOut } from "lucide-react";
import "./App.css";

const tabs = [
  { id: "tracker", label: "Track", icon: Eye },
  { id: "report",  label: "Report", icon: BarChart2 },
  { id: "history", label: "History", icon: LayoutDashboard },
];

function AppContent() {
  const [tab, setTab] = useState("tracker");
  const { user, signOut, loading } = useAuth();

  if (loading) {
    return (
      <div className="app" style={{ display: "flex", alignItems: "center", justifyContent: "center", minHeight: "100vh" }}>
        <div style={{ color: "var(--muted)" }}>Loading...</div>
      </div>
    );
  }

  if (!user) {
    return <Login />;
  }

  return (
    <SessionProvider>
      <div className="app">
        <header className="app-header">
          <div className="app-logo">
            <Eye size={24} strokeWidth={1.5} />
            <span>ici!</span>
          </div>
          <nav className="app-nav">
            {tabs.map(t => (
              <button key={t.id} className={`nav-tab ${tab === t.id ? "active" : ""}`} onClick={() => setTab(t.id)}>
                <t.icon size={16} />
                {t.label}
              </button>
            ))}
            <button className="nav-tab" onClick={signOut} title="Sign out">
              <LogOut size={16} />
            </button>
          </nav>
        </header>
        <main className="app-main">
          {tab === "tracker" && <Tracker />}
          {tab === "report"  && <SessionReport />}
          {tab === "history" && <Dashboard />}
        </main>
      </div>
    </SessionProvider>
  );
}

export default function App() {
  return (
    <AuthProvider>
      <AppContent />
    </AuthProvider>
  );
}
