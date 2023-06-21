import { Box, Button, Divider, Typography } from "@mui/material";
import SentimentVeryDissatisfiedIcon from "@mui/icons-material/SentimentVeryDissatisfied";
import { Link } from "react-router-dom";

const NotFound = () => {
  return (
    <>
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
        <Divider />
        <Link to={"/"}>
          <Button
            variant="contained"
            sx={{
              width: 150,
              fontSize: 17,
              fontWeight: "400",
              backgroundColor: "#3c733f",
              "&:hover": { backgroundColor: "#224024" },
            }}
          >
            Go home
          </Button>
        </Link>
      </Box>
    </>
  );
};

export default NotFound;
