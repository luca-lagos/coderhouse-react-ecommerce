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
import { useAuth, useOrder } from "../../../hooks/CustomHooks";
import { useParams, Link, Navigate } from "react-router-dom";
import Tinycolor from "tinycolor2";
import ArrowBackIcon from "@mui/icons-material/ArrowBack";

const Order = () => {
  const [loading, setLoading] = useState(false);
  const [order, setOrder] = useState([]);
  const { getOrderById } = useOrder();
  const { userLogged } = useAuth();
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
      {userLogged == null && <Navigate to={"/"} />}
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
            <Box
              sx={{
                display: "flex",
                flexDirection: { xs: "column", md: "row" },
                alignItems: "center",
                gap: { xs: 0, md: 1 },
              }}
            >
              <Typography
                component="h2"
                sx={{
                  fontSize: { xs: 20, md: 28 },
                  fontWeight: "bold",
                  mb: { xs: 1, md: 4 },
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
                  fontSize: { xs: 20, md: 28 },
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
                width: { xs: "75%", md: "95%" },
                p: 2,
                pl: { xs: 2, md: "auto" },
                pr: { xs: 2, md: "auto" },
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
                  pr: { xs: "auto", md: 2 },
                }}
              >
                {order.data?.items.map((value, index) => (
                  <>
                    <Box
                      key={index}
                      sx={{
                        display: "flex",
                        justifyContent: {xs: "center", md: "space-between"},
                        alignItems: "center",
                        
                      }}
                    >
                      <Link to={"/" + value.actualLink}>
                        <Box
                          sx={{
                            display: "flex",
                            flexDirection: { xs: "column", md: "row" },
                            gap: { xs: 1, md: 3 },
                            alignItems: "center",
                          }}
                        >
                          <img
                            src={value.image}
                            style={{
                              width: 130,
                              height: 130,
                              objectFit: "cover",
                              borderRadius: 5,
                            }}
                          />
                          <Box
                            sx={{
                              display: "flex",
                              flexDirection: "column",
                              justifyContent: "center",
                              gap: { xs: 1, md: 2 },
                              color: "#272727",
                            }}
                          >
                            <Typography
                              variant="h3"
                              sx={{ fontSize: { xs: 17, md: 22 } }}
                            >
                              {value.name}
                            </Typography>
                            <Box
                              sx={{
                                display: "flex",
                                gap: { xs: 1, md: 2 },
                                justifyContent: {
                                  xs: "center",
                                  md: "flex-start",
                                },
                              }}
                            >
                              <Chip
                                sx={{
                                  fontWeight: 600,
                                  fontSize: { xs: 10, md: 12 },
                                  backgroundColor: value.color,
                                  color: Tinycolor(value.color).isDark()
                                    ? "white"
                                    : "#272727",
                                }}
                                label={value.color}
                              />
                              <Chip
                                sx={{
                                  fontWeight: 600,
                                  fontSize: { xs: 10, md: 12 },
                                }}
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
                            <Box
                              sx={{
                                display: { xs: "flex", md: "none" },
                                gap: { xs: 1, md: 2 },
                                justifyContent: {
                                  xs: "center",
                                  md: "flex-start",
                                },
                              }}
                            >
                              <Chip
                                sx={{
                                  fontWeight: 600,
                                  fontSize: { xs: 10, md: 12 },
                                  backgroundColor: "#224024",
                                  color: "white",
                                }}
                                label={"QUAN: " + value.quantity}
                              />
                              <Chip
                                sx={{
                                  fontWeight: 600,
                                  fontSize: { xs: 10, md: 12 },
                                  backgroundColor: "#66bb6a",
                                  color: Tinycolor(value.price).isDark()
                                    ? "white"
                                    : "#272727",
                                }}
                                label={"$" + value.price}
                              />
                            </Box>
                          </Box>
                        </Box>
                      </Link>
                      <Typography
                        variant="h3"
                        sx={{
                          display: { xs: "none", md: "flex" },
                          fontSize: 20,
                        }}
                      >
                        QUAN: {value.quantity}
                      </Typography>
                      <Typography
                        variant="h3"
                        sx={{
                          display: { xs: "none", md: "flex" },
                          fontSize: 20,
                          color: "#66bb6a",
                        }}
                      >
                        ${Math.round(value.price * value.quantity)}
                      </Typography>
                    </Box>
                    <br />
                    <Divider
                      sx={{
                        width: { xs: "95%", md: "100%" },
                        margin: {
                          xs: "0 auto 20px auto",
                          md: "auto auto 20px auto",
                        },
                      }}
                    />
                  </>
                ))}
              </Box>
              <Box
                sx={{
                  display: "flex",
                  flexDirection: {xs: "column", md: "row"},
                  justifyContent: {xs: "center", md: "space-between"},
                  alignItems: "center",
                  gap: {xs: 2, md: 4},
                  pl: { xs: 0, md: 3 },
                  pr: { xs: 0, md: 3 },
                  mb: 2,
                }}
              >
                  <Typography
                    variant="h4"
                    sx={{
                      fontSize: { xs: 20, md: 25 },
                    }}
                  >
                    TOTAL: ${order.data?.totalPrice}
                  </Typography>
                  <Typography
                    variant="h4"
                    sx={{
                      fontSize: { xs: 20, md: 25 },
                    }}
                  >
                    DATE: {FormatDate(order.data?.date)}
                  </Typography>
                  <Tooltip title="Go back">
                    <Link to={"/my-orders"}>
                      <Button
                        variant="contained"
                        sx={{
                          width: { xs: 150, md: 50 },
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
