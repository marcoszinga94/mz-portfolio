import { Play, Pause } from "./Icons.jsx";
import { usePlayerStore } from "../hooks/playerHook.js";

export default function PlayPauseButton() {
  const togglePlay = usePlayerStore((state) => state.togglePlay);

  return (
    <button className="flex justify-center items-center bg-white/20 text-black w-8 h-8 rounded-full" onClick={togglePlay}>
      {isPlaying ? <Pause /> : <Play />}
    </button>
  );
}
