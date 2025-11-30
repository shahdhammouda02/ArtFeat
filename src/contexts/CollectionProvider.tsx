import React, { useState, type ReactNode } from 'react';
import { CollectionContext } from './CollectionContext';
import type { Collection, CollectionContextType } from '@/types/collection-types';

interface CollectionProviderProps {
  children: ReactNode;
}

export const CollectionProvider: React.FC<CollectionProviderProps> = ({ children }) => {
  const [collections, setCollections] = useState<Collection[]>([]);

  const addCollection = (collectionData: Omit<Collection, 'id' | 'createdAt'>) => {
    const newCollection: Collection = {
      ...collectionData,
      id: Date.now().toString(),
      createdAt: new Date(),
    };
    setCollections(prev => [newCollection, ...prev]);
  };

  const contextValue: CollectionContextType = {
    collections,
    addCollection,
  };

  return (
    <CollectionContext.Provider value={contextValue}>
      {children}
    </CollectionContext.Provider>
  );
};