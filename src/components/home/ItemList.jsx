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
              mt: 12,
            }}
          >
            <SentimentVeryDissatisfiedIcon
              sx={{ width: 150, height: "auto", color: "#66bb6a" }}
            />
            <Typography
              variant="h3"
              sx={{ fontSize: 20, fontWeight: "600", color: "#515151" }}
            >
              Products not found.
            </Typography>
          </Box>
        )}
      </Grid>
    </>
  );
};

export default ItemList;
