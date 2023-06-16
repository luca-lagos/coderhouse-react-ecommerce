import { useCart } from "../../../hooks/customHooks";
import { useState, useEffect } from "react";
import { Box, CircularProgress } from "@mui/material";

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
        <div style={{ marginTop: "300px" }}>
          THE ORDER {orderId} WAS FINISHED
        </div>
      )}
    </>
  );
};

export default OrderFinished;
