import React, { useState, type ReactNode } from 'react';
import { ArtworkContext } from './ArtworkContext';
import type { Artwork, ArtworkContextType } from '@/types/artwork-types';

interface ArtworkProviderProps {
  children: ReactNode;
}

export const ArtworkProvider: React.FC<ArtworkProviderProps> = ({ children }) => {
  const [artworks, setArtworks] = useState<Artwork[]>([]);

  const addArtwork = (artworkData: Omit<Artwork, 'id' | 'createdAt'>) => {
    const newArtwork: Artwork = {
      ...artworkData,
      id: Date.now().toString(),
      createdAt: new Date(),
    };
    setArtworks(prev => [newArtwork, ...prev]);
  };

  const contextValue: ArtworkContextType = {
    artworks,
    addArtwork,
  };

  return (
    <ArtworkContext.Provider value={contextValue}>
      {children}
    </ArtworkContext.Provider>
  );
};