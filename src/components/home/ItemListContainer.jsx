import Container from "@mui/material/Container";
import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import { getData } from "../../helpers/getData";
import { useState, useEffect } from "react";
import ItemList from "./ItemList";
import { useParams } from "react-router-dom";
import { CircularProgress } from "@mui/material";

const ItemListContainer = () => {
  const [loading, setLoading] = useState(true);
  const [productList, setProductList] = useState([]);
  const [title, setTitle] = useState(null)
  const category = useParams().category;

  useEffect(() => {
    setLoading(true);
    getData(1500).then((res) => {
      if (category) {
        const search = res["categories"].filter((c) => c.link === category);
        setTitle(search[0]?.name);
        setProductList(
          res["products"].filter(
            (product) => product.category === search[0]?.id
          )
        );
      } else {
        setTitle("All products");
        setProductList(res["products"]);
      }
      setLoading(false);
    });
  }, [category]);

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
