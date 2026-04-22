import { useSession } from "../context/SessionContext";
import FocusIndicator from "./FocusIndicator";
import DistractionAlert from "./DistractionAlert";
import { Play, Square, Eye } from "lucide-react";

function formatTime(secs) {
  const h = Math.floor(secs / 3600);
  const m = Math.floor((secs % 3600) / 60);
  const s = secs % 60;
  return h > 0
    ? `${h}:${String(m).padStart(2, "0")}:${String(s).padStart(2, "0")}`
    : `${String(m).padStart(2, "0")}:${String(s).padStart(2, "0")}`;
}

export default function Tracker() {
  const { sessionState, elapsed, focusLog, startSession, endSession } = useSession();
  const focusedCount = focusLog.filter(f => f.isFocused).length;
  const focusPct = focusLog.length ? Math.round((focusedCount / focusLog.length) * 100) : 0;
  const distractions = focusLog.reduce((acc, cur, i) => {
    if (i === 0) return acc;
    return acc + (focusLog[i - 1].isFocused && !cur.isFocused ? 1 : 0);
  }, 0);

  return (
    <div className="tracker-view">
      <DistractionAlert />
      <div className="tracker-hero">
        <div className="eye-orb">
          <Eye size={48} strokeWidth={1.2} />
          <div className="orb-ring" />
          <div className="orb-ring orb-ring-2" />
        </div>
        <div className="timer-display">{formatTime(elapsed)}</div>
        <FocusIndicator />
      </div>
      {sessionState === "running" && (
        <div className="live-stats">
          <div className="stat-chip">
            <span className="stat-val">{focusPct}%</span>
            <span className="stat-lbl">Focused</span>
          </div>
          <div className="stat-chip">
            <span className="stat-val">{distractions}</span>
            <span className="stat-lbl">Distractions</span>
          </div>
          <div className="stat-chip">
            <span className="stat-val">{focusLog.length}s</span>
            <span className="stat-lbl">Logged</span>
          </div>
        </div>
      )}
      <div className="tracker-controls">
        {sessionState === "idle" || sessionState === "ended" ? (
          <button className="btn-primary" onClick={startSession}>
            <Play size={18} /> Start Session
          </button>
        ) : (
          <button className="btn-danger" onClick={endSession}>
            <Square size={18} /> End Session
          </button>
        )}
      </div>
      {sessionState === "idle" && (
        <p className="tracker-hint">Your webcam will be used to track eye movement and focus patterns.</p>
      )}
    </div>
  );
}