export const ARTISTS_DATA = [
  {
    id: "1",
    name: "Eleanor Pena",
    rank: 1,
    level: "Grand Master",
    avatarUrl: "https://images.pexels.com/photos/774909/pexels-photo-774909.jpeg?auto=compress&cs=tinysrgb&w=600",
    bio: "Digital artist specializing in fantasy and sci-fi artwork with over 10 years of experience.",
    followers: 12500,
    artworks: 47,
    rating: 4.9,
  },
  {
    id: "2",
    name: "Marcus Chen",
    rank: 2,
    level: "Master",
    avatarUrl: "https://images.pexels.com/photos/614810/pexels-photo-614810.jpeg?auto=compress&cs=tinysrgb&w=600",
    bio: "Traditional painter with a modern twist, known for vibrant color palettes.",
    followers: 9800,
    artworks: 32,
    rating: 4.8,
  },
   {
    id: "3",
    name: "Sophia Rodriguez",
    rank: 3,
    level: "Expert",
    avatarUrl:
      "https://images.pexels.com/photos/1130626/pexels-photo-1130626.jpeg?auto=compress&cs=tinysrgb&w=600",
    bio: "Emerging digital artist with a focus on abstract and surrealism.",
    followers: 6200,
    artworks: 25,
    rating: 4.7,
  },
  {
    id: "4",
    name: "James Wilson",
    rank: 4,
    level: "Professional",
    avatarUrl:
      "https://images.pexels.com/photos/220453/pexels-photo-220453.jpeg?auto=compress&cs=tinysrgb&w=600",
    bio: "Professional artist with a diverse portfolio, specializing in both traditional and digital mediums.",
    followers: 4500,
    artworks: 30,
    rating: 4.6,
  },
  {
    id: "5",
    name: "Isabella Martinez",
    rank: 5,
    level: "Advanced",
    avatarUrl:
      "https://images.pexels.com/photos/415829/pexels-photo-415829.jpeg?auto=compress&cs=tinysrgb&w=600",
    bio: "Emerging artist with a passion for portraiture and a unique style.",
    followers: 3200,
    artworks: 15,
    rating: 4.5,
  },
];

export const getArtistById = (id: string) => {
  return ARTISTS_DATA.find(artist => artist.id === id);
};