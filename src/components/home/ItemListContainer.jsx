import Container from "@mui/material/Container";
import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import { useState, useEffect } from "react";
import ItemList from "./ItemList";
import { useParams } from "react-router-dom";
import { CircularProgress } from "@mui/material";
import { useItem } from "../../hooks/customHooks";

const ItemListContainer = () => {
  const [productList, setProductList] = useState([]);
  const [title, setTitle] = useState(null);
  const category = useParams().category;

  const { items, categories, loading } = useItem();

  useEffect(() => {
    if (category) {
      const search = categories.filter((c) => c.key === category);
      setTitle(search[0]?.name);
      setProductList(items.filter((doc) => doc.categoryId === search[0]?.id));
    } else {
      setTitle("All products");
      setProductList(items);
    }
  }, [categories, items, category]);

  return (
    <>
      <Container
        maxWidth="xl"
        sx={{
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          mt: { xs: 15, md: 22 },
        }}
      >
        {loading ? (
          <Box
            sx={{
              width: "100%",
              height: "400px",
              display: "flex",
              justifyContent: "center",
              alignItems: "center",
            }}
          >
            <CircularProgress size={60} color="success" />
          </Box>
        ) : (
          <>
            <Box>
              <Typography
                component="h2"
                sx={{
                  fontSize: "28px",
                  fontWeight: "bold",
                  mb: 6,
                  color: "#66bb6a",
                  textDecoration: "underline",
                  textTransform: "uppercase",
                }}
              >
                {title}
              </Typography>
            </Box>
            <ItemList productList={productList} />
          </>
        )}
      </Container>
    </>
  );
};

export default ItemListContainer;
