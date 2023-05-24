import { useEffect, useState } from "react";
import { Beer } from "../../types";
import { fetchData } from "./utils";
import {
  Avatar,
  Button,
  ButtonGroup,
  List,
  ListItem,
  ListItemAvatar,
  ListItemButton,
  ListItemText,
  Pagination,
  TextField,
} from "@mui/material";
import SportsBar from "@mui/icons-material/SportsBar";

import { useNavigate } from "react-router-dom";
import { useContext } from "react";
import {
  FavoritesContext,
  FavoritesContextType,
} from "../../contextAPI/FavoritesContext";

const BeerList = () => {
  const navigate = useNavigate();
  const [beerList, setBeerList] = useState<Array<Beer>>([]);
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 10;

  //Checking favorite list
  const favoritesContext = useContext<FavoritesContextType>(FavoritesContext);
  const { addToFavorites, isFavorite } = favoritesContext;

  // eslint-disable-next-line
  useEffect(() => fetchData.bind(this, setBeerList), []);

  const onBeerClick = (id: string) => navigate(`/beer/${id}`);

  //Filtering beer
  const [filterValue, setFilterValue] = useState("");
  const [sortOrder, setSortOrder] = useState<"asc" | "desc">("asc");

  const filteredAndSortedBeers = beerList
    .filter((beer) =>
      beer.name.toLowerCase().includes(filterValue.toLowerCase())
    )
    .sort((beerA, beerB) => {
      if (sortOrder === "asc") {
        return beerA.brewery_type.localeCompare(beerB.brewery_type);
      } else {
        return beerB.brewery_type.localeCompare(beerA.brewery_type);
      }
    });

  const totalItems = filteredAndSortedBeers.length;
  const totalPages = Math.ceil(totalItems / itemsPerPage);

  // Function to handle page change
  const handlePageChange = (
    event: React.ChangeEvent<unknown>,
    page: number
  ) => {
    setCurrentPage(page);
  };

  // Count of beers for the current page
  const startIndex = (currentPage - 1) * itemsPerPage;
  const endIndex = startIndex + itemsPerPage;
  const displayedBeers = filteredAndSortedBeers.slice(startIndex, endIndex);

  return (
    <article>
      <section>
        <header>
          <h1>BeerList page</h1>
          <div className="filterContainerStyle">
            <TextField
              label="Filter beers"
              value={filterValue}
              onChange={(e) => setFilterValue(e.target.value)}
              placeholder="Enter filter value"
            />
            <ButtonGroup variant="outlined">
              <Button onClick={() => setSortOrder("asc")}>
                Sort Ascending
              </Button>
              <Button onClick={() => setSortOrder("desc")}>
                Sort Descending
              </Button>
            </ButtonGroup>
          </div>
        </header>
        <main>
          <List>
            {displayedBeers.map((beer) => (
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
                  onClick={() => addToFavorites(beer.id)}
                  disabled={isFavorite(beer.id)}
                >
                  {isFavorite(beer.id)
                    ? "Added to Favorites"
                    : "Add to Favorites"}
                </Button>
              </ListItem>
            ))}
          </List>
          <Pagination
            count={totalPages}
            page={currentPage}
            onChange={handlePageChange}
            color="primary"
            variant="outlined"
          />
        </main>
      </section>
    </article>
  );
};

export default BeerList;
