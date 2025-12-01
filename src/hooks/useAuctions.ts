import { useState, useEffect } from "react";
import { parse, isAfter } from 'date-fns';


export interface Auction {
  id: string;
  artworkId: string;
  artworkTitle: string;
  artworkImage: string;
  artworkType: string;
  startDate: string;
  startTime: string;
  endDate: string;
  endTime: string;
  startingPrice: number;
  currentPrice: number;
  status: 'active' | 'ended' | 'pending';
  duration: number;
  createdAt: string;
  bids: Array<{
    id: string;
    bidder: string;
    amount: number;
    timestamp: string;
  }>;
}

export const useAuction = () => {
  const [auctions, setAuctions] = useState<Auction[]>([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
  const checkAndUpdateAuctionStatus = () => {
    const now = new Date();
    const updatedAuctions = auctions.map(auction => {
      if (auction.status === 'ended') {
        return auction;
      }

      try {
        const endDateTimeStr = `${auction.endDate} ${auction.endTime}`;
        const endDateTime = parse(endDateTimeStr, 'MMMM d, yyyy HH:mm', new Date());
        
        if (isAfter(now, endDateTime)) {
          return { ...auction, status: 'ended' as const };
        }
      } catch (error) {
        console.error('Error parsing date for auction:', auction.id, error);
      }
      
      return auction;
    });

    const hasChanges = JSON.stringify(updatedAuctions) !== JSON.stringify(auctions);
    if (hasChanges) {
      setAuctions(updatedAuctions);
      localStorage.setItem('artistAuctions', JSON.stringify(updatedAuctions));
    }
  };

  const interval = setInterval(checkAndUpdateAuctionStatus, 60000);
  
  checkAndUpdateAuctionStatus();
  
  return () => clearInterval(interval);
}, [auctions]);


  useEffect(() => {
    // Load auctions from localStorage on mount
    const loadAuctions = () => {
      try {
        const savedAuctions = localStorage.getItem('artistAuctions');
        if (savedAuctions) {
          setAuctions(JSON.parse(savedAuctions));
        }
      } catch (error) {
        console.error("Error loading auctions:", error);
      } finally {
        setIsLoading(false);
      }
    };

    loadAuctions();
    
    // Listen for storage changes (in case auctions are added from other tabs)
    const handleStorageChange = (e: StorageEvent) => {
      if (e.key === 'artistAuctions') {
        loadAuctions();
      }
    };
    
    window.addEventListener('storage', handleStorageChange);
    return () => window.removeEventListener('storage', handleStorageChange);
  }, []);

  const addAuction = (auction: Omit<Auction, 'id' | 'createdAt' | 'bids'>) => {
    const newAuction: Auction = {
      ...auction,
      id: Date.now().toString(),
      createdAt: new Date().toISOString(),
      bids: []
    };
    
    const updatedAuctions = [...auctions, newAuction];
    setAuctions(updatedAuctions);
    localStorage.setItem('artistAuctions', JSON.stringify(updatedAuctions));
    return newAuction;
  };

  const updateAuction = (id: string, updates: Partial<Auction>) => {
    const updatedAuctions = auctions.map(auction => 
      auction.id === id ? { ...auction, ...updates } : auction
    );
    setAuctions(updatedAuctions);
    localStorage.setItem('artistAuctions', JSON.stringify(updatedAuctions));
  };

  const deleteAuction = (id: string) => {
    const updatedAuctions = auctions.filter(auction => auction.id !== id);
    setAuctions(updatedAuctions);
    localStorage.setItem('artistAuctions', JSON.stringify(updatedAuctions));
  };

  const addBid = (auctionId: string, bidder: string, amount: number) => {
    const updatedAuctions = auctions.map(auction => {
      if (auction.id === auctionId && amount > auction.currentPrice) {
        const newBid = {
          id: Date.now().toString(),
          bidder,
          amount,
          timestamp: new Date().toISOString()
        };
        
        return {
          ...auction,
          currentPrice: amount,
          bids: [...auction.bids, newBid]
        };
      }
      return auction;
    });
    
    setAuctions(updatedAuctions);
    localStorage.setItem('artistAuctions', JSON.stringify(updatedAuctions));
  };

  const getAuction = (id: string) => {
    return auctions.find(auction => auction.id === id);
  };

  const getAuctionsByStatus = (status: Auction['status']) => {
    return auctions.filter(auction => auction.status === status);
  };

  return {
    auctions,
    isLoading,
    addAuction,
    updateAuction,
    deleteAuction,
    addBid,
    getAuction,
    getAuctionsByStatus
  };
};