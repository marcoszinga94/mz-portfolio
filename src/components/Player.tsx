import { useState, useRef, useEffect } from "react";
import { Button } from "../components/ui/button";
import { Card } from "../components/ui/card";
import { Slider } from "../components/ui/slider";
import { PlayIcon, PauseIcon, SkipBackIcon, SkipForwardIcon, Volume2, VolumeOff } from "lucide-react";

const songs = [
  { title: "Lost in the City", artist: "Suno AI", src: "/Music/1/Lost in the City.mp3", cover: "/Images/playlist01/Lost in the City.jpeg" },
  { title: "Lost in the Rain", artist: "Suno AI", src: "/Music/1/Lost in the Rain.mp3", cover: "/Images/playlist01/Lost in the Rain.jpeg" },
  { title: "Wandering Melodies", artist: "Suno AI", src: "/Music/1/Wandering Melodies.mp3", cover: "/Images/playlist01/Wandering Melodies.jpeg" },
  { title: "Whispers in the Wind", artist: "Suno AI", src: "/Music/1/Whispers in the Wind.mp3", cover: "/Images/playlist01/Whispers in the Wind.jpeg" },
];

const formatTime = (time: number) => {
  const minutes = Math.floor(time / 60);
  const seconds = Math.floor(time % 60);
  return `${minutes}:${seconds.toString().padStart(2, "0")}`;
};

const SongInfo = ({ title, artist, cover }: { title: string; artist: string; cover: string }) => (
  <div className="flex flex-row justify-center items-center gap-4">
    <img src={cover} alt={`${title} caratula`} className="h-10 w-10 rounded-md" />
    <div className="flex flex-col">
      <h2 className="text-sm font-semibold text-claro">{title}</h2>
      <p className="text-xs text-medio">{artist}</p>
    </div>
  </div>
);

const ProgressBar = ({
  currentTime,
  duration,
  onProgressChange,
}: {
  currentTime: number;
  duration: number;
  onProgressChange: (newValue: number[]) => void;
}) => (
  <>
    <div className="flex flex-row items-center gap-2">
      <span>{formatTime(currentTime)}</span>
      <Slider value={[currentTime]} max={duration} step={1} onValueChange={onProgressChange} />
      <span>{formatTime(duration)}</span>
    </div>
  </>
);

const Controls = ({
  isPlaying,
  onPrevious,
  onPlayPause,
  onNext,
}: {
  isPlaying: boolean;
  onPrevious: () => void;
  onPlayPause: () => void;
  onNext: () => void;
}) => (
  <div className="flex justify-center items-center gap-4">
    <Button onClick={onPrevious} variant="ghost" size="icon" className="text-white hover:bg-zinc-800">
      <SkipBackIcon className="size-5" />
    </Button>
    <Button onClick={onPlayPause} variant="ghost" size="icon" className="text-white hover:bg-zinc-800">
      {isPlaying ? <PauseIcon className="size-8" /> : <PlayIcon className="size-8" />}
    </Button>
    <Button onClick={onNext} variant="ghost" size="icon" className="text-white hover:bg-zinc-800">
      <SkipForwardIcon className="size-5" />
    </Button>
  </div>
);

const VolumeControl = ({ volume, onVolumeChange }: { volume: number; onVolumeChange: (newValue: number[]) => void }) => (
  <div className="flex items-center gap-2">
    <VolumeOff className="size-5 text-zinc-400" />
    <Slider value={[volume]} max={1} step={0.01} onValueChange={onVolumeChange} className="w-full" />
    <Volume2 className="size-5 text-zinc-400" />
  </div>
);

export default function MusicPlayer() {
  const [isPlaying, setIsPlaying] = useState(false);
  const [currentSongIndex, setCurrentSongIndex] = useState(0);
  const [currentTime, setCurrentTime] = useState(0);
  const [duration, setDuration] = useState(0);
  const [volume, setVolume] = useState(0.1);
  const audioRef = useRef<HTMLAudioElement | null>(null);

  const loadSong = (index: number) => {
    if (audioRef.current) {
      audioRef.current.pause();
      audioRef.current.currentTime = 0;
      audioRef.current.src = songs[index].src;
      audioRef.current.load();
      setCurrentTime(0);
      setDuration(0);
      if (isPlaying) {
        audioRef.current.play();
      }
    }
  };

  useEffect(() => {
    audioRef.current = new Audio(songs[currentSongIndex].src);
    audioRef.current.volume = volume;

    const handleEnded = () => handleNext();
    const handleTimeUpdate = () => setCurrentTime(audioRef.current?.currentTime || 0);
    const handleLoadedMetadata = () => setDuration(audioRef.current?.duration || 0);

    audioRef.current.addEventListener("ended", handleEnded);
    audioRef.current.addEventListener("timeupdate", handleTimeUpdate);
    audioRef.current.addEventListener("loadedmetadata", handleLoadedMetadata);

    return () => {
      if (audioRef.current) {
        audioRef.current.pause();
        audioRef.current.removeEventListener("ended", handleEnded);
        audioRef.current.removeEventListener("timeupdate", handleTimeUpdate);
        audioRef.current.removeEventListener("loadedmetadata", handleLoadedMetadata);
      }
    };
  }, []);

  useEffect(() => {
    loadSong(currentSongIndex);
  }, [currentSongIndex]);

  const togglePlayPause = () => {
    if (audioRef.current) {
      if (isPlaying) {
        audioRef.current.pause();
      } else {
        audioRef.current.play();
      }
      setIsPlaying(!isPlaying);
    }
  };

  const handleNext = () => setCurrentSongIndex((prevIndex) => (prevIndex + 1) % songs.length);
  const handlePrevious = () => setCurrentSongIndex((prevIndex) => (prevIndex - 1 + songs.length) % songs.length);

  const handleProgressChange = (newValue: number[]) => {
    if (audioRef.current) {
      const newTime = newValue[0];
      audioRef.current.currentTime = newTime;
      setCurrentTime(newTime);
    }
  };

  const handleVolumeChange = (newValue: number[]) => {
    const newVolume = newValue[0];
    setVolume(newVolume);
    if (audioRef.current) {
      audioRef.current.volume = newVolume;
    }
  };

  return (
    <Card className="static lg:fixed bottom-5 flex text-white px-6 py-4 gap-4 mx-5">
      <div className="flex flex-col gap-4 flex-1">
        <div className="flex flex-col gap-4">
          <SongInfo {...songs[currentSongIndex]} />
          <Controls isPlaying={isPlaying} onPrevious={handlePrevious} onPlayPause={togglePlayPause} onNext={handleNext} />
        </div>
        <div className="flex flex-col gap-4">
          <ProgressBar currentTime={currentTime} duration={duration} onProgressChange={handleProgressChange} />
          <VolumeControl volume={volume} onVolumeChange={handleVolumeChange} />
        </div>
      </div>
    </Card>
  );
}
