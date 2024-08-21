import React from "react";
import { usePlayerStore } from "../hooks/playerHook";
import { CurrentSong } from "./CurrentSong";
import { Controls } from "./Controls";
import { SongControl } from "./SongControl";
import { VolumeControl } from "./VolumeControl";

export default function Player({ currentsong }) {
  const audioRef = React.useRef(null);

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
      <CurrentSong title={currentsong.title} artists={currentsong.artists} />

      <div className="flex flex-col items-center">
        <Controls />
        <SongControl audio={audioRef} />
      </div>

      <VolumeControl />
    </div>
  );
}
