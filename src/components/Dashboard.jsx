import { useSession } from "../context/SessionContext";
import { BarChart, Bar, XAxis, YAxis, Tooltip, ResponsiveContainer } from "recharts";
import { Calendar, Clock, Zap, AlertTriangle } from "lucide-react";

function formatTime(secs) { return `${Math.floor(secs / 60)}m`; }
function formatDate(iso) {
  return new Date(iso).toLocaleDateString("en-US", { month: "short", day: "numeric", hour: "2-digit", minute: "2-digit" });
}

export default function Dashboard() {
  const { pastSessions } = useSession();

  if (pastSessions.length === 0) {
    return (
      <div className="report-empty">
        <Calendar size={48} strokeWidth={1} />
        <h3>No sessions yet</h3>
        <p>Your completed sessions will appear here.</p>
      </div>
    );
  }

  const avgFocus = Math.round(pastSessions.reduce((a, s) => a + s.focusPercent, 0) / pastSessions.length);
  const totalTime = pastSessions.reduce((a, s) => a + s.duration, 0);
  const chartData = [...pastSessions].reverse().slice(-10).map((s, i) => ({ label: `S${i + 1}`, focus: s.focusPercent }));

  return (
    <div className="dashboard-view">
      <div className="dash-summary">
        <div className="dash-stat"><Zap size={18} /><span className="dstat-val">{avgFocus}%</span><span className="dstat-lbl">Avg Focus</span></div>
        <div className="dash-stat"><Clock size={18} /><span className="dstat-val">{formatTime(totalTime)}</span><span className="dstat-lbl">Total Time</span></div>
        <div className="dash-stat"><Calendar size={18} /><span className="dstat-val">{pastSessions.length}</span><span className="dstat-lbl">Sessions</span></div>
      </div>
      <div className="chart-card">
        <h4>Focus % per Session</h4>
        <ResponsiveContainer width="100%" height={160}>
          <BarChart data={chartData} barSize={20}>
            <XAxis dataKey="label" tick={{ fontSize: 11, fill: "#5a7a99" }} />
            <YAxis domain={[0, 100]} tick={{ fontSize: 11, fill: "#5a7a99" }} />
            <Tooltip contentStyle={{ background: "#0f1923", border: "1px solid #1e3048", borderRadius: 8 }} itemStyle={{ color: "#00e5a0" }} labelStyle={{ color: "#5a7a99" }} />
            <Bar dataKey="focus" fill="#00e5a0" radius={[4, 4, 0, 0]} />
          </BarChart>
        </ResponsiveContainer>
      </div>
      <div className="sessions-list">
        <h4>Recent Sessions</h4>
        {pastSessions.map(s => (
          <div key={s.id} className="session-row">
            <div className="session-date">{formatDate(s.date)}</div>
            <div className="session-chips">
              <span className="schip"><Clock size={12} />{formatTime(s.duration)}</span>
              <span className="schip schip-focus"><Zap size={12} />{s.focusPercent}%</span>
              <span className="schip"><AlertTriangle size={12} />{s.distractions}</span>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}