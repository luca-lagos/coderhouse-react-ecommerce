import { Button, Box, Typography } from "@mui/material";

const ItemCount = ({ quantity, HandleAdd, HandleSubstract, HandleAddToCart }) => {
  return (
    <>
      <Box sx={{ display: "flex", flexDirection: {xs: 'column', md: 'row'}, alignItems: {xs: 'center'} , gap: {xs: 4, md: 7}, mt: 3 }}>
        <Box sx={{ display: "flex" }}>
          <Button
            variant="contained"
            sx={{
              fontSize: 20,
              backgroundColor: "#66bb6a",
              width: 30,
              "&:hover": { backgroundColor: "#3c733f" },
            }}
            onClick={HandleSubstract}
          >
            -
          </Button>
          <Typography
            variant="p"
            sx={{
              fontSize: 20,
              fontWeight: "bold",
              color: "#272727",
              width: 100,
              display: "flex",
              justifyContent: "center",
              alignItems: "center",
            }}
          >
            {quantity}
          </Typography>
          <Button
            variant="contained"
            sx={{
              fontSize: 20,
              backgroundColor: "#66bb6a",
              "&:hover": { backgroundColor: "#3c733f" },
            }}
            onClick={HandleAdd}
          >
            +
          </Button>
        </Box>
        <Box>
          <Button
            variant="contained"
            sx={{
              fontSize: 20,
              fontWeight: "bold",
              backgroundColor: "#3c733f",
              width: {xs: '228px', md: 'auto'},
              mb: {xs: 2, md: 0},
              "&:hover": { backgroundColor: "#224024" },
            }}
            onClick={HandleAddToCart}
          >
            Add to cart
          </Button>
        </Box>
      </Box>
    </>
  );
};

export default ItemCount;
