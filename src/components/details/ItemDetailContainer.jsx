import { useState, useEffect } from "react";
import { getItemByLink } from "../../helpers/getData";
import ItemDetail from "../details/ItemDetail";
import { Container, Typography, Box, CircularProgress } from "@mui/material";
import { useParams } from "react-router-dom";

const ItemDetailContainer = () => {
  const [loading, setLoading] = useState(true);
  const [item, setItem] = useState(null);
  const category = useParams().category;
  const link = useParams().link;

  useEffect(() => {
    setLoading(true);
    return () => {
      getItemByLink(link, 1500).then((res) => {
        setItem(res);
        setLoading(false);
      });
    };
  }, [category, link]);

  const actualLink = category + "/" + link;

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
          <Typography>
            <ItemDetail item={item} actualLink={actualLink}/>
          </Typography>
        )}
      </Container>
    </>
  );
};

export default ItemDetailContainer;
