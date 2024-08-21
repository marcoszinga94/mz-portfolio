import React from "react";
import { usePlayerStore } from "../hooks/playerHook";

export default function Player({ currentsong }) {
  const { setCurrentMusic, setIsPlaying } = usePlayerStore((state) => ({
    setCurrentMusic: state.setCurrentMusic,
    setIsPlaying: state.setIsPlaying,
  }));

  React.useEffect(() => {
    if (currentsong) {
      setCurrentMusic({ song: { src: currentsong }, playlist: null, songs: [{ src: currentsong }] });
      setIsPlaying(true);
    }
  }, [currentsong, setCurrentMusic, setIsPlaying]);

  return (
    <div className="w-full h-24 bg-black flex justify-between items-center p-3">
      <CurrentSong title={currentSong.title} artists={currentSong.artists} />

      <div className="flex flex-col items-center">
        <Controls />
        <SongControl audio={audioRef} />
      </div>

      <VolumeControl />
    </div>
  );
}
