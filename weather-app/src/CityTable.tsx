import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import axios from "axios";
import {
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Paper,
  TextField,
  Button,
  Typography,
  AppBar,
  Toolbar,
  Box,
} from "@mui/material";

const CityTable: React.FC = () => {
  const [cities, setCities] = useState<any[]>([]);
  const [filter, setFilter] = useState("");
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  const [sortOrder, setSortOrder] = useState<"asc" | "desc">("asc");

  useEffect(() => {
    const fetchCities = async () => {
      try {
        const response = await axios.get(
          "https://public.opendatasoft.com/api/explore/v2.1/catalog/datasets/geonames-all-cities-with-a-population-1000/records?limit=100"
        );
        // console.log(response.data.results);
        setCities(response.data.results);
      } catch (error) {
        console.error("Error fetching cities:", error);
        // console.log("error");
      }
    };
    fetchCities();
  }, []);

  const handleFilterChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setFilter(event.target.value);
  };

  const filteredCities = cities.filter((city) =>
    city.name.toLowerCase().includes(filter.toLowerCase())
  );

  const handleSortAsc = () => {
    const sortedCities = [...cities].sort((a: any, b: any) => {
      if (a && a.name && b && b.name) {
        return a.name.localeCompare(b.name);
      } else {
        return 0;
      }
    });
    setCities(sortedCities);
    setSortOrder("asc");
  };
  const handleSortDesc = () => {
    const sortedCities = [...cities].sort((a: any, b: any) => {
      if (a && a.name && b && b.name) {
        return b.name.localeCompare(a.name);
      } else {
        return 0;
      }
    });
    setCities(sortedCities);
    setSortOrder("desc");
  };
  return (
    <Box style={{ backgroundColor: "#EEF5FF" }}>
      <AppBar position="static" style={{ backgroundColor: "#0C2D57" }}>
        <Toolbar>
          <Typography variant="h6" component="div" sx={{ flexGrow: 1 }}>
            Weather Application
          </Typography>
        </Toolbar>
      </AppBar>
      <Box style={{ marginBottom: "20px", textAlign: "center" }}>
        <Typography
          sx={{ backgroundColor: "#D5F0C1", padding: "10px" }}
          component="div"
        >
          Sort the data in Ascending or Descending Order
        </Typography>
        <Button
          onClick={handleSortAsc}
          variant="outlined"
          sx={{ margin: "5px", padding: "10px" }}
        >
          Sort Asc
        </Button>
        <Button
          onClick={handleSortDesc}
          variant="outlined"
          sx={{ margin: "5px", padding: "10px" }}
        >
          Sort Desc
        </Button>
        <Typography>
          <TextField
            label="Filter cities"
            variant="outlined"
            value={filter}
            onChange={handleFilterChange}
            sx={{ padding: "10px" }}
            component="div"
          />
        </Typography>
        <Typography
          sx={{ backgroundColor: "#D5F0C1", padding: "10px" }}
          component="div"
        >
          Select name of the city to see the weather
        </Typography>
        <TableContainer
          component={Paper}
          sx={{
            marginTop: "20px",
          }}
        >
          <Table stickyHeader>
            <TableHead>
              <TableRow>
                <TableCell
                  scope="row"
                  style={{
                    fontSize: "20px",
                    backgroundColor: "#D5F0C1",
                    color: "black",
                  }}
                >
                  City Name
                </TableCell>
                <TableCell
                  style={{
                    fontSize: "20px",
                    backgroundColor: "#D5F0C1",
                    color: "black",
                  }}
                >
                  Country
                </TableCell>
                <TableCell
                  style={{
                    fontSize: "20px",
                    backgroundColor: "#D5F0C1",
                    color: "black",
                  }}
                >
                  Timezone
                </TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {filteredCities.map((city: any) => (
                <TableRow key={city.name}>
                  <TableCell>
                    <Link
                      style={{ textDecoration: "none", color: "black" }}
                      to={`/weather/${city.name}`}
                    >
                      {city.name}
                    </Link>
                  </TableCell>
                  <TableCell>{city.label_en}</TableCell>
                  <TableCell>{city.timezone}</TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </TableContainer>
      </Box>
    </Box>
  );
};

export default CityTable;
