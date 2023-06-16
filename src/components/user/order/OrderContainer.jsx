import { useState, useEffect } from "react";
import {
  Container,
  Box,
  Typography,
  CircularProgress,
  Card,
} from "@mui/material";

const OrderContainer = () => {
  const [loading, setLoading] = useState(false);
  useEffect(() => {
    setLoading(true);
    setTimeout(() => setLoading(false), 2500);
  }, []);
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
                    overflowX: "hidden",
                    pr: 2,
                  }}
                >
                  
                </Box>
            </Card>
          </>
        )}
      </Container>
    </>
  );
};

export default OrderContainer;
