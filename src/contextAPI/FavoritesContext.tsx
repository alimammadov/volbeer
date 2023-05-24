import React, { createContext, useState, useEffect } from "react";

export interface FavoritesContextType {
  favorites: string[];
  addToFavorites: (beerId: string) => void;
  removeFromFavorites: (beerId: string) => void;
  isFavorite: (beerId: string) => boolean;
}

export const FavoritesContext = createContext<FavoritesContextType>({
  favorites: [],
  addToFavorites: () => {},
  removeFromFavorites: () => {},
  isFavorite: () => false,
});

interface FavoritesProviderProps {
  children: React.ReactNode;
}

export const FavoritesProvider = ({ children }: FavoritesProviderProps) => {
  const [favorites, setFavorites] = useState<string[]>(() => {
    const storedFavorites = localStorage.getItem("favorites");
    return storedFavorites ? JSON.parse(storedFavorites) : [];
  });

  useEffect(() => {
    localStorage.setItem("favorites", JSON.stringify(favorites));
  }, [favorites]);

  const addToFavorites = (beerId: string) => {
    setFavorites((prevFavorites) => [...prevFavorites, beerId]);
  };

  const removeFromFavorites = (beerId: string) => {
    setFavorites((prevFavorites) =>
      prevFavorites.filter((id) => id !== beerId)
    );
  };

  const isFavorite = (beerId: string) => {
    return favorites.includes(beerId);
  };

  const contextValue: FavoritesContextType = {
    favorites,
    addToFavorites,
    removeFromFavorites,
    isFavorite,
  };

  return (
    <FavoritesContext.Provider value={contextValue}>
      {children}
    </FavoritesContext.Provider>
  );
};
