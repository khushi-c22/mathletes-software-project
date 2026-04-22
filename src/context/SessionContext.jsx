import { createContext, useContext, useState, useEffect, useCallback } from "react";

const SessionContext = createContext(null);

function useMockEyeTracker(isRunning) {
  const [focusState, setFocusState] = useState({ isFocused: true, gazeScore: 0.95 });
  useEffect(() => {
    if (!isRunning) return;
    const interval = setInterval(() => {
      const rand = Math.random();
      const isFocused = rand > 0.25;
      const gazeScore = isFocused ? 0.7 + Math.random() * 0.3 : Math.random() * 0.4;
      setFocusState({ isFocused, gazeScore });
    }, 1500);
    return () => clearInterval(interval);
  }, [isRunning]);
  return focusState;
}

export function SessionProvider({ children }) {
  const [sessionState, setSessionState] = useState("idle");
  const [elapsed, setElapsed] = useState(0);
  const [focusLog, setFocusLog] = useState([]);
  const [currentSession, setCurrentSession] = useState(null);
  const [pastSessions, setPastSessions] = useState(() => {
    try { return JSON.parse(localStorage.getItem("eyetracker_sessions") || "[]"); }
    catch { return []; }
  });

  const isRunning = sessionState === "running";
  const { isFocused, gazeScore } = useMockEyeTracker(isRunning);

  useEffect(() => {
    if (!isRunning) return;
    const interval = setInterval(() => setElapsed(e => e + 1), 1000);
    return () => clearInterval(interval);
  }, [isRunning]);

  useEffect(() => {
    if (!isRunning) return;
    setFocusLog(log => [...log, { time: elapsed, isFocused, gazeScore }]);
  }, [elapsed]);

  const startSession = useCallback(() => {
    setElapsed(0);
    setFocusLog([]);
    setCurrentSession(null);
    setSessionState("running");
  }, []);

  const endSession = useCallback(() => {
    setSessionState("ended");
    setFocusLog(log => {
      const focusedSeconds = log.filter(f => f.isFocused).length;
      const totalSeconds = log.length || 1;
      const distractions = log.reduce((acc, cur, i) => {
        if (i === 0) return acc;
        return acc + (log[i - 1].isFocused && !cur.isFocused ? 1 : 0);
      }, 0);
      const session = {
        id: Date.now(),
        date: new Date().toISOString(),
        duration: elapsed,
        focusPercent: Math.round((focusedSeconds / totalSeconds) * 100),
        distractions,
        focusLog: log.map(f => ({ time: f.time, score: f.gazeScore })),
      };
      setCurrentSession(session);
      setPastSessions(prev => {
        const updated = [session, ...prev].slice(0, 20);
        localStorage.setItem("eyetracker_sessions", JSON.stringify(updated));
        return updated;
      });
      return log;
    });
  }, [elapsed]);

  return (
    <SessionContext.Provider value={{
      sessionState, elapsed, isFocused, gazeScore, focusLog,
      currentSession, pastSessions, startSession, endSession
    }}>
      {children}
    </SessionContext.Provider>
  );
}

export const useSession = () => useContext(SessionContext);