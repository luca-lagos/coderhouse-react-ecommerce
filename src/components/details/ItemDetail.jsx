import {
  Box,
  Chip,
  Card,
  Typography,
  Snackbar,
  Alert,
  CircularProgress,
} from "@mui/material";
import { useState } from "react";
import ItemCount from "./ItemCount";
import { useEffect } from "react";
import { useCart } from "../../hooks/CustomHooks";
import TinyColor from "tinycolor2";
import { Navigate } from "react-router-dom";

const ItemDetail = ({ item, actualLink }) => {
  const [loading, setLoading] = useState(true);
  const [quantity, setQuantity] = useState(1);

  const { cart, AddToCart, CloseAllSnackbar, snackSuccess, snackError } =
    useCart();

  useEffect(() => {
    setLoading(true);
    setTimeout(() => setLoading(false), 2500);
  }, []);

  const HandleSubstract = () => {
    quantity > 1 && setQuantity(quantity - 1);
  };

  const HandleAdd = () => {
    quantity < item[0].stock && setQuantity(quantity + 1);
  };

  const HandleAddToCart = () => {
    const { stock, ...newItem } = item[0];
    AddToCart(newItem, quantity, actualLink);
  };

  return (
    <>
      <Snackbar
        open={snackError}
        onClose={CloseAllSnackbar}
        autoHideDuration={1500}
      >
        <Alert
          onClose={CloseAllSnackbar}
          severity="warning"
          sx={{ width: "100%" }}
        >
          The quantity chosen is greater than the stock
        </Alert>
      </Snackbar>
      <Snackbar
        open={snackSuccess}
        onClose={CloseAllSnackbar}
        autoHideDuration={1500}
      >
        <Alert
          onClose={CloseAllSnackbar}
          severity="success"
          sx={{ width: "100%" }}
        >
          The garment has been saved to the cart successfully
        </Alert>
      </Snackbar>
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
          {item[0]?.stock > 0 ? (
            <Card
              sx={{
                p: 2,
                display: "flex",
                gap: 5,
                maxWidth: { xs: 350, md: 1200 },
                flexDirection: { xs: "column", md: "row" },
                alignItems: "center",
                justifyContent: "center",
              }}
            >
              <Box
                sx={{
                  display: { xs: "flex", md: "none" },
                  width: { xs: 350, md: "auto" },
                  mb: { xs: "-25px" },
                  justifyContent: { xs: "center", md: "flex-start" },
                }}
              >
                <Typography
                  component={"h1"}
                  sx={{ fontSize: { xs: 30, md: 45 }, fontWeight: "bold" }}
                >
                  {item[0]?.name}
                </Typography>
              </Box>
              <Box
                sx={{
                  display: "flex",
                  justifyContent: "center",
                }}
              >
                <img
                  src={item[0]?.image}
                  alt=""
                  style={{ width: 300, height: "auto", objectFit: "cover" }}
                />
              </Box>
              <Box
                sx={{
                  mt: { xs: "-13px", md: 3 },
                  display: "flex",
                  flexDirection: "column",
                  alignItems: { xs: "center", md: "flex-start" },
                  gap: 2,
                  width: { xs: 350, md: "auto" },
                }}
              >
                <Typography
                  component={"h1"}
                  sx={{
                    display: { xs: "none", md: "flex" },
                    fontSize: 45,
                    fontWeight: "bold",
                  }}
                >
                  {item[0]?.name}
                </Typography>
                <Box
                  sx={{
                    display: "flex",
                    justifyContent: "center",
                    gap: 2,
                    mb: 2,
                  }}
                >
                  <Chip
                    sx={{ fontWeight: 600 }}
                    label={"STOCK: " + item[0]?.stock}
                  />
                  <Chip
                    sx={{
                      fontWeight: 600,
                      backgroundColor: item[0]?.color,
                      color: TinyColor(item[0]?.color).isDark()
                        ? "white"
                        : "#272727",
                    }}
                    label={item[0].color}
                  />
                  <Chip
                    sx={{ fontWeight: 600 }}
                    label={
                      "SIZE:" + item[0]?.size === "Small"
                        ? "S"
                        : item[0]?.size === "Medium"
                        ? "M"
                        : item[0]?.size === "Large"
                        ? "L"
                        : "XL"
                    }
                  />
                </Box>
                <Typography
                  component={"p"}
                  sx={{
                    maxWidth: { xs: 300, md: 750 },
                    mt: { xs: "auto", md: 1 },
                    textAlign: { xs: "center", md: "left" },
                  }}
                >
                  {item[0]?.description}
                </Typography>
                <Typography
                  component={"h2"}
                  sx={{ fontSize: { xs: 50, md: 40 }, color: "#66bb6a" }}
                >
                  ${item[0]?.price}
                </Typography>
                <ItemCount
                  quantity={quantity}
                  HandleAdd={HandleAdd}
                  HandleSubstract={HandleSubstract}
                  HandleAddToCart={HandleAddToCart}
                />
              </Box>
            </Card>
          ) : (
            <>
              <Navigate to={"/"} />
            </>
          )}
        </>
      )}
    </>
  );
};

export default ItemDetail;
