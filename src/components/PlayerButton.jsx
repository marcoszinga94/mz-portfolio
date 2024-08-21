import { Pause, Play } from "./Player.jsx";
import { usePlayerStore } from "../hooks/playerHook.js";

export default function PlayerButton({ id }) {
  const { currentMusic, isPlaying, setIsPlaying, setCurrentMusic } = usePlayerStore((state) => state);

  const isPlayingPlaylist = isPlaying && currentMusic?.playlist.id === id;

  const handleClick = () => {
    setIsPlaying(!isPlaying);
  };

  fetch(`/api/get-info-playlist.json?id=${id}`)
    .then((res) => res.json())
    .then((data) => {
      const { songs, playlist } = data;

      setIsPlaying(true);
      setCurrentMusic({ songs, playlist, song: songs[0] });
    })
    .catch((err) => {
      console.error("Error fetching music data:", err);
    });

  return (
    <button onClick={handleClick} className="card-play-button rounded-full bg-white p-2 hover:scale-105 transition">
      {isPlayingPlaylist ? <Pause /> : <Play />}
    </button>
  );
}
