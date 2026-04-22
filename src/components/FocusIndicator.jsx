import { useSession } from "../context/SessionContext";
import { Eye, EyeOff } from "lucide-react";

export default function FocusIndicator() {
  const { isFocused, gazeScore, sessionState } = useSession();
  if (sessionState !== "running") return null;
  return (
    <div className={`focus-indicator ${isFocused ? "focused" : "distracted"}`}>
      <div className="focus-pulse" />
      {isFocused ? <Eye size={18} /> : <EyeOff size={18} />}
      <span className="focus-label">{isFocused ? "Focused" : "Distracted"}</span>
      <span className="gaze-score">{Math.round(gazeScore * 100)}%</span>
    </div>
  );
}