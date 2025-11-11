export const ARTISTS_DATA = [
  {
    id: "1",
    name: "Eléanor Vance",
    followers: 5,
    following: 2,
    avatarUrl: "https://images.pexels.com/photos/774909/pexels-photo-774909.jpeg?auto=compress&cs=tinysrgb&w=600",
    coverImage: "",
    isFollowing: false,
    about: {
      description: "A passionate digital artist exploring the intersection of nature, abstract concepts, and urban landscapes. With a focus on atmospheric scenes and vibrant colors, each piece tells a unique story that invites viewers into a world of imagination and emotion.",
      memberSince: "2024",
      totalArtworks: 6,
      style: "Contemporary, Abstract",
      yearsOfExperience: 10
    }
  },
  {
    id: "2", 
    name: "Marcus Chen",
    followers: 12,
    following: 8,
    avatarUrl: "https://images.pexels.com/photos/614810/pexels-photo-614810.jpeg?auto=compress&cs=tinysrgb&w=600",
    coverImage: "",
    isFollowing: true,
    about: {
      description: "A visionary mixed-media artist blending traditional techniques with digital innovation. Specializing in surreal portraiture and geometric abstraction, Marcus creates thought-provoking pieces that challenge perceptions of reality and identity.",
      memberSince: "2023",
      totalArtworks: 15,
      style: "Surreal, Geometric, Mixed Media",
      yearsOfExperience: 8
    }
  },
  {
    id: "3",
    name: "Sophia Rodriguez",
    followers: 8,
    following: 3,
    avatarUrl: "https://images.pexels.com/photos/1130626/pexels-photo-1130626.jpeg?auto=compress&cs=tinysrgb&w=600",
    coverImage: "",
    isFollowing: false,
    about: {
      description: "Contemporary painter and digital illustrator known for vibrant color palettes and dynamic compositions. Sophia's work explores themes of cultural identity, femininity, and the beauty found in everyday moments.",
      memberSince: "2024",
      totalArtworks: 9,
      style: "Contemporary, Figurative, Illustration",
      yearsOfExperience: 6
    }
  },
  {
    id: "4",
    name: "James Wilson",
    followers: 15,
    following: 10,
    avatarUrl: "https://images.pexels.com/photos/220453/pexels-photo-220453.jpeg?auto=compress&cs=tinysrgb&w=600",
    coverImage: "",
    isFollowing: true,
    about: {
      description: "Photorealistic digital artist with a background in traditional oil painting. James creates stunningly detailed works that capture the essence of urban life, nature, and human emotion with remarkable precision.",
      memberSince: "2022",
      totalArtworks: 22,
      style: "Photorealistic, Urban, Portrait",
      yearsOfExperience: 12
    }
  },
  {
    id: "5",
    name: "Isabella Martinez",
    followers: 20,
    following: 12,
    avatarUrl: "https://images.pexels.com/photos/415829/pexels-photo-415829.jpeg?auto=compress&cs=tinysrgb&w=600",
    coverImage: "",
    isFollowing: false,
    about: {
      description: "Abstract expressionist and digital collage artist pushing the boundaries of texture and form. Isabella's work is characterized by bold brushstrokes, layered compositions, and emotional intensity that resonates with collectors worldwide.",
      memberSince: "2021",
      totalArtworks: 18,
      style: "Abstract Expressionism, Digital Collage",
      yearsOfExperience: 15
    }
  }
];

export const getArtistById = (id: string) => {
  return ARTISTS_DATA.find(artist => artist.id === id);
};