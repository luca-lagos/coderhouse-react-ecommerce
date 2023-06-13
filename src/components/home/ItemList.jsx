import Grid from "@mui/material/Grid";
import SentimentVeryDissatisfiedIcon from "@mui/icons-material/SentimentVeryDissatisfied";
import { Box, Typography } from "@mui/material";
import Item from "./card/Item";

const ItemList = ({ productList }) => {
  return (
    <>
      <Grid
        container
        sx={{ display: "flex", justifyContent: "center", paddingLeft: 2 }}
        rowSpacing={{ xs: 3, sm: 4, md: 4 }}
        columnSpacing={{ xs: 1, sm: 4, md: 4 }}
      >
        {productList != "" ? (
          productList.map((value, index) => (
            <Grid xs={12} sm={4} md={3} key={index} sx={{ p: 2 }}>
              <Item product={value} />
            </Grid>
          ))
        ) : (
          <Box
            sx={{
              display: "flex",
              flexDirection: "column",
              alignItems: "center",
              justifyContent: "center",
              gap: 2,
              color: "#111111",
              marginTop: 20,
              marginLeft: 1,
            }}
          >
            <SentimentVeryDissatisfiedIcon sx={{ fontSize: "150px" }} />
            <Typography variant="h3" sx={{ fontSize: "28px", color: '#777777' }}>
              Productos no encontrados
            </Typography>
          </Box>
        )}
      </Grid>
    </>
  );
};

export default ItemList;
