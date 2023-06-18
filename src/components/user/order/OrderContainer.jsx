import { useState, useEffect } from "react";
import {
  Container,
  Box,
  Typography,
  CircularProgress,
  Card,
  Button,
} from "@mui/material";
import { useAuth, useOrder } from "../../../hooks/CustomHooks";
import { Link } from "react-router-dom";

const OrderContainer = () => {
  const [loading, setLoading] = useState(false);
  const [orders, setOrders] = useState([]);
  const { userLogged } = useAuth();
  const { getOrdersByUserId } = useOrder();

  const uid = userLogged?.uid;

  const FormatDate = (date) => {
    return date?.toDate().toLocaleString();
  };

  useEffect(() => {
    setLoading(true);
    getOrdersByUserId(uid).then((res) => {
      const result = res.docs.map((doc) => {
        const data = doc.data();
        data.id = doc.id;
        return data;
      });
      setOrders(result);
    });
    setTimeout(() => setLoading(false), 2500);
  }, [getOrdersByUserId, uid]);
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
                MY ORDERS
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
                  display: "flex",
                  flexDirection: "column",
                  gap: 2,
                  overflowX: "hidden",
                }}
              >
                {orders.map((value) => (
                  <Box
                    key={value?.id}
                    sx={{
                      display: "flex",
                      justifyContent: "space-between",
                      alignItems: "center",
                      height: 40,
                      p: 2,
                      borderRadius: 1,
                      backgroundColor: "#e9e9e9",
                    }}
                  >
                    <Typography variant="p">
                      ORDER:{" "}
                      <Typography variant="p" sx={{ fontWeight: "bold" }}>
                        {value?.id}
                      </Typography>
                    </Typography>
                    <Typography variant="p">
                      TOTAL:{" "}
                      <Typography variant="p" sx={{ fontWeight: "bold" }}>
                        ${value?.totalPrice}
                      </Typography>
                    </Typography>
                    <Typography variant="p">
                      DATE:{" "}
                      <Typography variant="p" sx={{ fontWeight: "bold" }}>
                        {FormatDate(value?.date)}
                      </Typography>
                    </Typography>
                    <Link to={"/my-orders/" + value?.id}>
                      <Button
                        sx={{
                          width: 150,
                          fontSize: 17,
                          fontWeight: "700",
                          backgroundColor: "#3c733f",
                          color: "white",
                          "&:hover": { backgroundColor: "#224024" },
                        }}
                      >
                        SEE ORDER
                      </Button>
                    </Link>
                  </Box>
                ))}
              </Box>
            </Card>
          </>
        )}
      </Container>
    </>
  );
};

export default OrderContainer;
