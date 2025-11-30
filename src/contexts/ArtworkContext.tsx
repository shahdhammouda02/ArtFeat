import { createContext } from 'react';
import type { ArtworkContextType } from '@/types/artwork-types';

export const ArtworkContext = createContext<ArtworkContextType | undefined>(undefined);