import { useCart } from "../../../hooks/customHooks";
import { useState, useEffect } from "react";
import {
  Container,
  Box,
  CircularProgress,
  Typography,
  Button,
  Divider,
} from "@mui/material";
import MaterialLink from "@mui/material/Link";
import { Link } from "react-router-dom";
import CheckCircleOutlineIcon from "@mui/icons-material/CheckCircleOutline";
const OrderFinished = () => {
  const [loading, setLoading] = useState(false);
  const { orderId } = useCart();

  useEffect(() => {
    setLoading(true);
    setTimeout(() => {
      setLoading(false);
    }, 2500);
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
          <Box
            sx={{
              display: "flex",
              flexDirection: "column",
              alignItems: "center",
              justifyContent: "center",
              gap: 5,
              margin: 5,
              width: 250
            }}
          >
            <CheckCircleOutlineIcon sx={{ width: 200, height: "auto", mb: "-15px", color: "#66bb6a" }} />
            <Typography variant="p" sx={{fontSize: 17, textAlign: 'center'}}>
              The order has finished successfully. You can access this order
              through this{" "}
              <Link to={"/my-orders/" + orderId}>
                <MaterialLink
                  underline="hover"
                  sx={{
                    width: "100%",
                    color: "#66bb6a",
                  }}
                >
                  link.
                </MaterialLink>
              </Link>
            </Typography>
            <Divider sx={{ mt: "-15px", mb: "-15px", width: 100 }} />
            <Link to={"/my-orders"}>
              <Button
                variant="contained"
                sx={{
                  width: 200,
                  fontSize: 17,
                  fontWeight: "400",
                  backgroundColor: "#3c733f",
                  "&:hover": { backgroundColor: "#224024" },
                }}
              >
                GO TO ORDERS
              </Button>
            </Link>
          </Box>
      )}
      </Container>
    </>
  );
};

export default OrderFinished;
