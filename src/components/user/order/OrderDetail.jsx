import { useState, useEffect } from "react";
import {
  Container,
  Box,
  Divider,
  CircularProgress,
  Typography,
  Card,
  Button,
  Chip,
  Tooltip,
} from "@mui/material";
import { useOrder } from "../../../hooks/customHooks";
import { useParams, Link } from "react-router-dom";
import Tinycolor from "tinycolor2";
import ArrowBackIcon from "@mui/icons-material/ArrowBack";

const Order = () => {
  const [loading, setLoading] = useState(false);
  const [order, setOrder] = useState([]);
  const { getOrderById } = useOrder();
  const id = useParams().id;

  const FormatDate = (date) => {
    return date?.toDate().toLocaleString();
  };

  useEffect(() => {
    setLoading(true);
    getOrderById(id).then((res) => {
      const result = {
        id: res.id,
        data: res.data(),
      };
      setOrder(result);
    });
    setTimeout(() => setLoading(false), 2500);
  }, [getOrderById, id]);
  return (
    <>
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
            <Box sx={{ display: "flex", gap: 1 }}>
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
                ORDER:
              </Typography>
              <Typography
                component="h2"
                sx={{
                  fontSize: "28px",
                  fontWeight: "bold",
                  mb: 4,
                  color: "#272727",
                  fontStyle: "italic",
                  textTransform: "uppercase",
                }}
              >
                {order.id}
              </Typography>
            </Box>
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
                {order.data?.items.map((value, index) => (
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
                                  color: Tinycolor(value.color).isDark()
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
                    </Box>
                    <br />
                    <Divider sx={{ mb: 2 }} />
                  </>
                ))}
              </Box>
              <Box
                sx={{
                  display: "flex",
                  justifyContent: "space-between",
                  alignItems: "center",
                  pl: { xs: 0, md: 3 },
                  pr: { xs: 0, md: 3 },
                  mb: 2,
                }}
              >
                <Typography variant="h5" sx={{ fontSize: 25 }}>
                  TOTAL: ${order.data?.totalPrice}
                </Typography>
                <Typography variant="h5" sx={{ fontSize: 25 }}>
                  DATE: {FormatDate(order.data?.date)}
                </Typography>
                <Tooltip title="Go back">
                  <Link to={"/my-orders"}>
                    <Button
                      variant="contained"
                      sx={{
                        width: 50,
                        height: "auto",
                        backgroundColor: "#d32f2f",
                        color: "white",
                        borderRadius: 5,
                        fontSize: 20,
                        fontWeight: "bold",
                        mb: { xs: 2, md: 0 },
                        "&:hover": { backgroundColor: "#8c2222" },
                      }}
                    >
                      <ArrowBackIcon />
                    </Button>
                  </Link>
                </Tooltip>
              </Box>
            </Card>
          </>
        )}
      </Container>
    </>
  );
};

export default Order;
