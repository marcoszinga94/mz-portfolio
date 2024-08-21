import { PlayPauseButton } from "./PlayPauseButton";
import { usePlayerStore } from "../hooks/playerHook";
import { NextSong, PrevSong } from "./Icons";

const Controls = () => {
  const isPlaying = usePlayerStore((state) => state.isPlaying);
  const nextSong = usePlayerStore((state) => state.nextSong);
  const prevSong = usePlayerStore((state) => state.prevSong);

  return (
    <div className="flex gap-x-3 items-center">
      <button className="p-2 rounded-full hover:bg-white/20" onClick={prevSong}>
        <PrevSong />
      </button>

      <PlayPauseButton isPlaying={isPlaying} />

      <button className="p-2 rounded-full hover:bg-white/20" onClick={nextSong}>
        <NextSong />
      </button>
    </div>
  );
};

export default Controls;
