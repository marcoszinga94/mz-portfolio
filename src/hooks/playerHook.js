// playerHook.js
import create from "zustand";

export const usePlayerStore = create((set) => ({
  isPlaying: false,
  volume: 1,
  currentMusic: {
    song: null,
    playlist: null,
    songs: [],
  },

  setIsPlaying: (isPlaying) => set({ isPlaying }),
  togglePlay: () => set((state) => ({ isPlaying: !state.isPlaying })),

  setVolume: (volume) => set({ volume }),

  setCurrentMusic: (currentMusic) => set({ currentMusic }),

  nextSong: () => set((state) => {
    const { songs, song } = state.currentMusic;
    if (!songs || songs.length === 0) return {};

    const currentIndex = songs.findIndex((s) => s.id === song?.id);
    const nextIndex = (currentIndex + 1) % songs.length;
    const nextSong = songs[nextIndex];

    return {
      currentMusic: { ...state.currentMusic, song: nextSong },
      isPlaying: true, // Optionally start playing the next song
    };
  }),

  prevSong: () => set((state) => {
    const { songs, song } = state.currentMusic;
    if (!songs || songs.length === 0) return {};

    const currentIndex = songs.findIndex((s) => s.id === song?.id);
    const prevIndex = (currentIndex - 1 + songs.length) % songs.length;
    const prevSong = songs[prevIndex];

    return {
      currentMusic: { ...state.currentMusic, song: prevSong },
      isPlaying: true, // Optionally start playing the previous song
    };
  }),

  // Optionally, you might want to add logic for setting the current song or playlist
}));
