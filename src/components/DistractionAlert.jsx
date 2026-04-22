import { useEffect, useState } from "react";
import { useSession } from "../context/SessionContext";
import { AlertTriangle } from "lucide-react";

export default function DistractionAlert() {
  const { isFocused, sessionState } = useSession();
  const [visible, setVisible] = useState(false);
  const [lostFocusFor, setLostFocusFor] = useState(0);

  useEffect(() => {
    if (sessionState !== "running") { setVisible(false); return; }
    if (!isFocused) {
      setLostFocusFor(s => {
        const next = s + 1;
        if (next >= 3) setVisible(true);
        return next;
      });
    } else {
      setLostFocusFor(0);
      setVisible(false);
    }
  }, [isFocused, sessionState]);

  if (!visible) return null;

  return (
    <div className="distraction-alert">
      <AlertTriangle size={20} />
      <div>
        <strong>Hey! Eyes back on screen</strong>
        <p>You've been away for {lostFocusFor}s — refocus to keep your streak.</p>
      </div>
      <button onClick={() => setVisible(false)}>✕</button>
    </div>
  );
}