import { useSession } from "../context/SessionContext";
import { AreaChart, Area, XAxis, YAxis, Tooltip, PieChart, Pie, Cell, ResponsiveContainer } from "recharts";
import { Clock, Zap, AlertTriangle, TrendingUp } from "lucide-react";

function formatTime(secs) {
  const m = Math.floor(secs / 60);
  const s = secs % 60;
  return `${m}m ${s}s`;
}

export default function SessionReport() {
  const { currentSession, sessionState } = useSession();

  if (sessionState !== "ended" || !currentSession) {
    return (
      <div className="report-empty">
        <TrendingUp size={48} strokeWidth={1} />
        <h3>No report yet</h3>
        <p>Complete a session to see your focus report.</p>
      </div>
    );
  }

  const { duration, focusPercent, distractions, focusLog } = currentSession;
  const chartData = focusLog.filter((_, i) => i % 5 === 0).map(f => ({
    time: `${Math.floor(f.time / 60)}:${String(f.time % 60).padStart(2, "0")}`,
    score: Math.round(f.score * 100),
  }));
  const pieData = [
    { name: "Focused", value: focusPercent },
    { name: "Distracted", value: 100 - focusPercent },
  ];
  const rating = focusPercent >= 80 ? "Excellent" : focusPercent >= 60 ? "Good" : focusPercent >= 40 ? "Fair" : "Needs Work";
  const ratingColor = focusPercent >= 80 ? "#4ade80" : focusPercent >= 60 ? "#facc15" : focusPercent >= 40 ? "#fb923c" : "#f87171";

  return (
    <div className="report-view">
      <div className="report-header">
        <h2>Session Report</h2>
        <span className="rating-badge" style={{ color: ratingColor, borderColor: ratingColor }}>{rating}</span>
      </div>
      <div className="report-stats">
        <div className="report-stat"><Clock size={20} /><span className="rstat-val">{formatTime(duration)}</span><span className="rstat-lbl">Total Time</span></div>
        <div className="report-stat"><Zap size={20} /><span className="rstat-val">{focusPercent}%</span><span className="rstat-lbl">Focused</span></div>
        <div className="report-stat"><AlertTriangle size={20} /><span className="rstat-val">{distractions}</span><span className="rstat-lbl">Distractions</span></div>
      </div>
      <div className="charts-row">
        <div className="chart-card">
          <h4>Focus Over Time</h4>
          <ResponsiveContainer width="100%" height={180}>
            <AreaChart data={chartData}>
              <defs>
                <linearGradient id="focusGrad" x1="0" y1="0" x2="0" y2="1">
                  <stop offset="5%" stopColor="#00e5a0" stopOpacity={0.3} />
                  <stop offset="95%" stopColor="#00e5a0" stopOpacity={0} />
                </linearGradient>
              </defs>
              <XAxis dataKey="time" tick={{ fontSize: 11, fill: "#5a7a99" }} />
              <YAxis domain={[0, 100]} tick={{ fontSize: 11, fill: "#5a7a99" }} />
              <Tooltip contentStyle={{ background: "#0f1923", border: "1px solid #1e3048", borderRadius: 8 }} labelStyle={{ color: "#5a7a99" }} itemStyle={{ color: "#00e5a0" }} />
              <Area type="monotone" dataKey="score" stroke="#00e5a0" strokeWidth={2} fill="url(#focusGrad)" />
            </AreaChart>
          </ResponsiveContainer>
        </div>
        <div className="chart-card chart-card-sm">
          <h4>Focus Split</h4>
          <ResponsiveContainer width="100%" height={180}>
            <PieChart>
              <Pie data={pieData} cx="50%" cy="50%" innerRadius={50} outerRadius={75} dataKey="value" strokeWidth={0}>
                <Cell fill="#00e5a0" />
                <Cell fill="#1e3048" />
              </Pie>
              <Tooltip contentStyle={{ background: "#0f1923", border: "1px solid #1e3048", borderRadius: 8 }} />
            </PieChart>
          </ResponsiveContainer>
          <div className="pie-legend">
            <span><span className="dot" style={{ background: "#00e5a0" }} />Focused {focusPercent}%</span>
            <span><span className="dot" style={{ background: "#1e3048" }} />Distracted {100 - focusPercent}%</span>
          </div>
        </div>
      </div>
      <div className="insight-box">
        <h4>Insight</h4>
        <p>
          {focusPercent >= 80 ? "Outstanding session! You maintained excellent concentration throughout."
            : focusPercent >= 60 ? "Good work. Try reducing distractions to push your focus above 80%."
            : focusPercent >= 40 ? `You had ${distractions} distractions. Consider a quieter environment or shorter work blocks.`
            : "Tough session. Try the Pomodoro technique — 25 min focused, 5 min break."}
        </p>
      </div>
    </div>
  );
}