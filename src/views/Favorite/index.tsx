import { useEffect, useState } from "react";
import { Beer } from "../../types";
import { fetchData } from "../BeerList/utils";
import {
  Avatar,
  Button,
  List,
  ListItem,
  ListItemAvatar,
  ListItemButton,
  ListItemText,
} from "@mui/material";
import SportsBar from "@mui/icons-material/SportsBar";
import { useNavigate } from "react-router-dom";

import { useContext } from "react";
import {
  FavoritesContext,
  FavoritesContextType,
} from "../../contextAPI/FavoritesContext";

const Favorites = () => {
  const navigate = useNavigate();

  const [beerList, setBeerList] = useState<Array<Beer>>([]);

  // eslint-disable-next-line
  useEffect(fetchData.bind(this, setBeerList), []);

  const onBeerClick = (id: string) => navigate(`/beer/${id}`);

  //Checking favorite list
  const favoritesContext = useContext<FavoritesContextType>(FavoritesContext);
  const { removeFromFavorites, isFavorite, favorites } = favoritesContext;

  //filter only favorite beers
  const favoriteBeers = beerList.filter((beer) => favorites.includes(beer.id));

  console.log(favoriteBeers);
  return (
    <article>
      <section>
        <header>
          <h1>Favorites</h1>
        </header>
        <main>
          <List>
            {favoriteBeers.map((beer) => (
              <ListItem key={beer.id}>
                <ListItemButton onClick={onBeerClick.bind(this, beer.id)}>
                  <ListItemAvatar>
                    <Avatar>
                      <SportsBar />
                    </Avatar>
                  </ListItemAvatar>
                  <ListItemText
                    primary={beer.name}
                    secondary={beer.brewery_type}
                  />
                </ListItemButton>
                <Button
                  variant="outlined"
                  onClick={() => removeFromFavorites(beer.id)}
                  disabled={!isFavorite(beer.id)}
                >
                  {isFavorite(beer.id)
                    ? "Remove from Favorites"
                    : "Add to Favorites"}
                </Button>
              </ListItem>
            ))}
          </List>
        </main>
      </section>
    </article>
  );
};

export default Favorites;
