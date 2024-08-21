export interface Playlist {
  id: string;
  albumId: number;
  title: string;
  cover: string;
  artists: string[];
}

export const playlists: Playlist[] = [
  {
    id: "01",
    albumId: 1,
    title: "01",
    cover: "/Images/playlist01/Lost in the City.jpeg",
    artists: ["none"],
  },
  {
    id: "02",
    albumId: 2,
    title: "Lo-Fi Chill Session",
    cover: "/Images/playlist2/cancion01.jpeg",
    artists: ["none"],
  },
];

export const morePlaylists = playlists.map((item) => ({
  ...item,
  id: item.id + "_more",
}));

export const sidebarPlaylists = playlists.map((item) => ({
  ...item,
  id: item.id + "_side",
}));

export const allPlaylists = [...playlists, ...morePlaylists, ...sidebarPlaylists];

export interface Song {
  id: number;
  albumId: number;
  title: string;
  image: string;
  duration: string;
}

export const songs: Song[] = [
  {
    id: 1,
    albumId: 1,
    title: "Lost in the City",
    image: "/Images/playlist01/Lost in the City.jpeg",
    duration: "2:20",
  },
  {
    id: 2,
    albumId: 1,
    title: "Lost in the Rain",
    image: "/Images/playlist01/Lost in the Rain.jpeg",
    duration: "2:46",
  },
  {
    id: 3,
    albumId: 1,
    title: "Wandering Melodies",
    image: "/Images/playlist01/Wandering Melodies.jpeg",
    duration: "2:14",
  },
  {
    id: 4,
    albumId: 1,
    title: "Whispers in the Wind",
    image: "/Images/playlist01/Whispers in the Wind.jpeg",
    duration: "4:00",
  },
];
