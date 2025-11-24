export interface User {
  id: string;
  email: string;
  name: string;
  type: 'user' | 'artist';
  avatar?: string;
  joinDate: string;

  country?: string;
  city?: string;
  storename?: string;
}

export interface StoredUser extends User {
  password: string;
  businessRegistered?: string;
  portfolio?: string;
  bio?: string;
  specialties?: string[];
}

export interface AuthState {
  user: User | null;
  isAuthenticated: boolean;
  isLoading: boolean;
}

export type LoginCredentials = {
  email: string;
  password: string;
};

export type SignUpCredentials = {
  name: string;
  email: string;
  password: string;
  confirmPassword: string;
  country: string;
  city: string;
};

export type ArtistSignUpCredentials = SignUpCredentials & {
  storename: string;
  businessRegistered: string;
  portfolio?: string;
  bio?: string;
  specialties?: string[];
};