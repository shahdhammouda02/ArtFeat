import { useContext } from 'react';
import { ArtworkContext } from '@/contexts/ArtworkContext';
import type { ArtworkContextType } from '@/types/artwork-types';

export const useArtwork = (): ArtworkContextType => {
  const context = useContext(ArtworkContext);
  if (context === undefined) {
    throw new Error('useArtwork must be used within an ArtworkProvider');
  }
  return context;
};