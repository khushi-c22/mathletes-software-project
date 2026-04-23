import { useState } from "react";
import { SessionProvider } from "./context/SessionContext";
import Tracker from "./components/Tracker";
import SessionReport from "./components/SessionReport";
import Dashboard from "./components/Dashboard";
import { Eye, BarChart2, LayoutDashboard } from "lucide-react";
import "./App.css";

const tabs = [
  { id: "tracker", label: "Track", icon: Eye },
  { id: "report",  label: "Report", icon: BarChart2 },
  { id: "history", label: "History", icon: LayoutDashboard },
];

export default function App() {
  const [tab, setTab] = useState("tracker");
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
