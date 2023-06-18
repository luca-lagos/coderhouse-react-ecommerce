import { Container, Box, Tooltip, Divider } from "@mui/material";
import { useState, useEffect } from "react";
import {
  CircularProgress,
  Typography,
  Card,
  Button,
  Chip,
  IconButton,
  Snackbar,
  Alert,
} from "@mui/material";
import LoadingButton from "@mui/lab/LoadingButton";
import { useCart, useAuth } from "../../hooks/CustomHooks";
import DeleteForeverIcon from "@mui/icons-material/DeleteForever";
import { Link, Navigate } from "react-router-dom";
import SentimentVeryDissatisfiedIcon from "@mui/icons-material/SentimentVeryDissatisfied";
import TinyColor from "tinycolor2";

const CartContainer = () => {
  const [loading, setLoading] = useState(true);
  const {
    cart,
    orderLoading,
    GetTotalPrice,
    DeleteItemCart,
    snackDeleteItemCart,
    CreateOrder,
    CloseAllSnackbar,
    orderError,
    orderSuccess,
    orderMessage,
  } = useCart();

  const { userLogged } = useAuth();

  const HandleCreateOrder = (e) => {
    e.preventDefault();
    const totalPrice = GetTotalPrice();
    CreateOrder(userLogged?.uid, totalPrice);
  };

  useEffect(() => {
    setLoading(true);
    setTimeout(() => setLoading(false), 1500);
  }, []);

  return (
    <>
      {orderSuccess && (
        <>
          <Navigate to="/order-finished" />
        </>
      )}
      <Snackbar
        open={snackDeleteItemCart}
        onClose={CloseAllSnackbar}
        autoHideDuration={1500}
      >
        <Alert
          onClose={CloseAllSnackbar}
          severity="success"
          sx={{ width: "100%" }}
        >
          Se ha eliminado el producto del carrito
        </Alert>
      </Snackbar>
      <Snackbar
        open={orderError}
        onClose={CloseAllSnackbar}
        autoHideDuration={1500}
      >
        <Alert
          onClose={CloseAllSnackbar}
          severity="error"
          sx={{ width: "100%" }}
        >
          {orderMessage}
        </Alert>
      </Snackbar>
      <Container
        maxWidth="xl"
        sx={{
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          mt: { xs: 15, md: 22 },
          p: 2,
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
                  mb: 4,
                  color: "#66bb6a",
                  textDecoration: "underline",
                  textTransform: "uppercase",
                }}
              >
                MY CART
              </Typography>
            </Box>
            {cart != "" ? (
              <Card
                sx={{
                  width: "95%",
                  p: 2,
                  display: "flex",
                  gap: 5,
                  flexDirection: "column",
                }}
              >
                <Box
                  sx={{
                    width: "auto",
                    maxHeight: 500,
                    overflowX: "hidden",
                    pr: 2,
                  }}
                >
                  {cart.map((value, index) => (
                    <>
                      <Box
                        key={index}
                        display={{
                          display: "flex",
                          justifyContent: "space-between",
                          alignItems: "center",
                        }}
                      >
                        <Link to={"/" + value.actualLink}>
                          <Box sx={{ display: "flex", gap: 3 }}>
                            <img
                              src="/images/products/cloth.webp"
                              style={{
                                width: 100,
                                height: 100,
                                objectFit: "cover",
                                borderRadius: 5,
                              }}
                            />
                            <Box
                              sx={{
                                display: "flex",
                                flexDirection: "column",
                                justifyContent: "center",
                                gap: 2,
                                color: "#272727",
                              }}
                            >
                              <Typography variant="h3" sx={{ fontSize: 22 }}>
                                {value.name}
                              </Typography>
                              <Box sx={{ display: "flex", gap: 2 }}>
                                <Chip
                                  sx={{
                                    fontWeight: 600,
                                    backgroundColor: value.color,
                                    color: TinyColor(value.color).isDark()
                                      ? "white"
                                      : "#272727",
                                  }}
                                  label={value.color}
                                />
                                <Chip
                                  sx={{ fontWeight: 600 }}
                                  label={
                                    "SIZE: " + value.size === "Small"
                                      ? "S"
                                      : value.size === "Medium"
                                      ? "M"
                                      : value.size === "Large"
                                      ? "L"
                                      : "XL"
                                  }
                                />
                              </Box>
                            </Box>
                          </Box>
                        </Link>
                        <Typography variant="h3" sx={{ fontSize: 20 }}>
                          CANT: {value.quantity}
                        </Typography>
                        <Typography
                          variant="h3"
                          sx={{ fontSize: 20, color: "#66bb6a" }}
                        >
                          ${Math.round(value.price * value.quantity)}
                        </Typography>
                        <Tooltip title="Delete from cart">
                          <IconButton
                            aria-label="delete-product-cart"
                            color="error"
                            onClick={() => {
                              DeleteItemCart(value);
                            }}
                          >
                            <DeleteForeverIcon
                              sx={{ width: 35, height: "auto" }}
                            />
                          </IconButton>
                        </Tooltip>
                      </Box>
                      <br />
                      <Divider sx={{ mb: 2 }} />
                    </>
                  ))}
                </Box>
                <Box
                  sx={{
                    display: "flex",
                    gap: 4,
                    pl: { xs: 0, md: 3 },
                    pr: { xs: 0, md: 3 },
                    mb: 2,
                    alignItems: "center",
                  }}
                >
                  {userLogged != null ? (
                    <>
                      <Typography
                        variant="h4"
                        sx={{ width: "35%", fontSize: 25 }}
                      >
                        TOTAL: ${GetTotalPrice()}
                      </Typography>

                      <Typography
                        variant="h3"
                        sx={{
                          width: "50%",
                          fontSize: 18,
                          fontStyle: "italic",
                          display: "flex",
                          alignItems: "center",
                          gap: 1,
                        }}
                      >
                        Buy as{" "}
                        <p style={{ color: "#66bb6a" }}>{userLogged.email}</p>
                      </Typography>
                      <LoadingButton
                        variant="contained"
                        sx={{
                          width: "15%",
                          fontSize: 20,
                          fontWeight: "bold",
                          backgroundColor: "#3c733f",
                          mb: { xs: 2, md: 0 },
                          "&:hover": { backgroundColor: "#224024" },
                        }}
                        onClick={HandleCreateOrder}
                        loading={orderLoading}
                        loadingPosition="end"
                      >
                        BUY
                      </LoadingButton>
                    </>
                  ) : (
                    <>
                      <Typography
                        variant="h4"
                        sx={{ width: "85%", fontSize: 25 }}
                      >
                        TOTAL: ${GetTotalPrice()}
                      </Typography>
                      <Link to={"/login"} style={{ width: "15%" }}>
                        <Button
                          variant="contained"
                          sx={{
                            width: "100%",
                            fontSize: 20,
                            fontWeight: "bold",
                            backgroundColor: "#3c733f",
                            mb: { xs: 2, md: 0 },
                            "&:hover": { backgroundColor: "#224024" },
                          }}
                        >
                          LOGIN
                        </Button>
                      </Link>
                    </>
                  )}
                </Box>
              </Card>
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
                  The cart is empty.
                </Typography>
              </Box>
            )}
          </>
        )}
      </Container>
    </>
  );
};

export default CartContainer;
