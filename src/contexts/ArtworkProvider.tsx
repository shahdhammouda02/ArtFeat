import React, { useState, type ReactNode, useEffect } from 'react';
import { ArtworkContext } from './ArtworkContext';
import type { Artwork, ArtworkContextType } from '@/types/artwork-types';

interface ArtworkProviderProps {
  children: ReactNode;
}

export const ArtworkProvider: React.FC<ArtworkProviderProps> = ({ children }) => {
  const [artworks, setArtworks] = useState<Artwork[]>([]);
  const [isLoaded, setIsLoaded] = useState(false);

  // Load artworks from localStorage on component mount
  useEffect(() => {
    console.log('Loading artworks from localStorage...');
    const savedArtworks = localStorage.getItem('artist-artworks');
    console.log('Found saved artworks:', savedArtworks);
    
    if (savedArtworks) {
      try {
        const parsedArtworks = JSON.parse(savedArtworks);
        console.log('Parsed artworks:', parsedArtworks);
        
        // Convert string dates back to Date objects
        const artworksWithDates = parsedArtworks.map((artwork: Artwork) => ({
          ...artwork,
          createdAt: new Date(artwork.createdAt)
        }));
        
        setArtworks(artworksWithDates);
        console.log('Successfully loaded artworks:', artworksWithDates.length);
      } catch (error) {
        console.error('Error loading artworks from localStorage:', error);
        // If there's an error, start with empty array
        setArtworks([]);
      }
    } else {
      console.log('No saved artworks found, starting with empty array');
      setArtworks([]);
    }
    
    setIsLoaded(true);
  }, []);

  // Save artworks to localStorage whenever artworks change
  useEffect(() => {
    if (isLoaded) {
      console.log('Saving artworks to localStorage:', artworks);
      localStorage.setItem('artist-artworks', JSON.stringify(artworks));
    }
  }, [artworks, isLoaded]);

  const addArtwork = (artworkData: Omit<Artwork, 'id' | 'createdAt'>) => {
    console.log('Adding new artwork:', artworkData);
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