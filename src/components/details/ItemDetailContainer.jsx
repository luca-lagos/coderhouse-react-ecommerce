import { useState, useEffect } from "react";
import ItemDetail from "../details/ItemDetail";
import { Container, Typography, Box, CircularProgress } from "@mui/material";
import { useParams } from "react-router-dom";
import { useItem } from "../../hooks/CustomHooks";

const ItemDetailContainer = () => {
  const [loading, setLoading] = useState(true);
  const [item, setItem] = useState([]);
  const category = useParams().category;
  const link = useParams().link;

  const { getItemByKey } = useItem();

  useEffect(() => {
    getItemByKey(link).then((res) => {
      const item = res.docs.map((doc) => {
        const data = doc.data();
        data.id = doc.id;
        return data;
      });
      setItem(item);
    });
    setLoading(false);
  }, [link, getItemByKey]);

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
                <ItemDetail item={item} actualLink={actualLink} />
              </Typography>
        )}
      </Container>
    </>
  );
};

export default ItemDetailContainer;
