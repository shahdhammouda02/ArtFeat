// hooks/useArtistsFilter.ts
import { useState, useMemo } from 'react';
import type { Artist } from '@/types/artists';

export function useArtistsFilter(artists: Artist[]) {
  const [type, setType] = useState<string>("All Types");
  const [q, setQ] = useState<string>("");

  const filteredArtists = useMemo(() => {
    const query = q.trim().toLowerCase();
    return artists.filter((artist: Artist) => {
      const hasMatchingArtworks = artist.artworks.some((item) => {
        const byType = type === "All Types" || item.type === type;
        const byQuery =
          !query ||
          item.title.toLowerCase().includes(query) ||
          item.type.toLowerCase().includes(query) ||
          artist.name.toLowerCase().includes(query);
        return byType && byQuery;
      });
      return hasMatchingArtworks;
    });
  }, [q, type, artists]);

  const reset = () => {
    setType("All Types");
    setQ("");
  };

  return {
    type,
    setType,
    q,
    setQ,
    filteredArtists,
    reset
  };
}