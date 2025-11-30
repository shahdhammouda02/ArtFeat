import { createContext } from 'react';
import type { CollectionContextType } from '@/types/collection-types';

export const CollectionContext = createContext<CollectionContextType | undefined>(undefined);