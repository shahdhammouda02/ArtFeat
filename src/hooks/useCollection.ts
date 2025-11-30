import { useContext } from 'react';
import { CollectionContext } from '@/contexts/CollectionContext';
import type { CollectionContextType } from '@/types/collection-types';

export const useCollection = (): CollectionContextType => {
  const context = useContext(CollectionContext);
  if (context === undefined) {
    throw new Error('useCollection must be used within a CollectionProvider');
  }
  return context;
};