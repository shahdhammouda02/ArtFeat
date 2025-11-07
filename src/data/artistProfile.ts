export const ARTISTS_DATA = [
  {
    id: "1",
    name: "Eléanor Vance",
    followers: 5,
    following: 2,
    avatarUrl: "https://images.pexels.com/photos/774909/pexels-photo-774909.jpeg?auto=compress&cs=tinysrgb&w=600",
    coverImage: "",
    isFollowing: false
  },
  {
    id: "2", 
    name: "Marcus Chen",
    followers: 12,
    following: 8,
    avatarUrl: "https://images.pexels.com/photos/614810/pexels-photo-614810.jpeg?auto=compress&cs=tinysrgb&w=600",
    coverImage: "",
    isFollowing: true
  },
    {
    id: "3",
    name: "Sophia Rodriguez",
    followers: 8,
    following: 3,
    avatarUrl: "https://images.pexels.com/photos/1130626/pexels-photo-1130626.jpeg?auto=compress&cs=tinysrgb&w=600",
    coverImage: "",
    isFollowing: false
  },
  {
    id: "4",
    name: "James Wilson",
    followers: 15,
    following: 10,
    avatarUrl: "https://images.pexels.com/photos/220453/pexels-photo-220453.jpeg?auto=compress&cs=tinysrgb&w=600",
    coverImage: "",
    isFollowing: true
  },
  {
    id: "5",
    name: "Isabella Martinez",
    followers: 20,
    following: 12,
    avatarUrl: "https://images.pexels.com/photos/415829/pexels-photo-415829.jpeg?auto=compress&cs=tinysrgb&w=600",
    coverImage: "",
    isFollowing: false
  }
];

export const getArtistById = (id: string) => {
  return ARTISTS_DATA.find(artist => artist.id === id);
};