import React, { useState, type ReactNode, useEffect } from 'react';
import { CollectionContext } from './CollectionContext';
import type { Collection, CollectionContextType } from '@/types/collection-types';

interface CollectionProviderProps {
  children: ReactNode;
}

export const CollectionProvider: React.FC<CollectionProviderProps> = ({ children }) => {
  const [collections, setCollections] = useState<Collection[]>([]);
  const [isLoaded, setIsLoaded] = useState(false);

  // Load collections from localStorage on component mount
  useEffect(() => {
    console.log('Loading collections from localStorage...');
    const savedCollections = localStorage.getItem('artist-collections');
    console.log('Found saved collections:', savedCollections);
    
    if (savedCollections) {
      try {
        const parsedCollections = JSON.parse(savedCollections);
        console.log('Parsed collections:', parsedCollections);
        
        // Convert string dates back to Date objects
        const collectionsWithDates = parsedCollections.map((collection: Collection) => ({
          ...collection,
          createdAt: new Date(collection.createdAt)
        }));
        
        setCollections(collectionsWithDates);
        console.log('Successfully loaded collections:', collectionsWithDates.length);
      } catch (error) {
        console.error('Error loading collections from localStorage:', error);
        // If there's an error, start with empty array
        setCollections([]);
      }
    } else {
      console.log('No saved collections found, starting with empty array');
      setCollections([]);
    }
    
    setIsLoaded(true);
  }, []);

  // Save collections to localStorage whenever collections change
  useEffect(() => {
    if (isLoaded) {
      console.log('Saving collections to localStorage:', collections);
      localStorage.setItem('artist-collections', JSON.stringify(collections));
    }
  }, [collections, isLoaded]);

  const addCollection = (collectionData: Omit<Collection, 'id' | 'createdAt'>) => {
    console.log('Adding new collection:', collectionData);
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