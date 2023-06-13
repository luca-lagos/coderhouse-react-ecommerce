import {
  Box,
  CircularProgress,
  Card,
  TextField,
  Container,
  Typography,
  Button,
  Divider,
  Snackbar,
  Alert,
} from "@mui/material";
import MaterialLink from "@mui/material/Link";
import GoogleIcon from "@mui/icons-material/Google";
import { useEffect, useState } from "react";
import { useAuth } from "../../hooks/customHooks";

import { Link, Navigate } from "react-router-dom";

const LoginView = () => {
  const [loading, setLoading] = useState(true);
  const [snackbar, setSnackbar] = useState(true);
  const {
    commonLogin,
    googleLogin,
    error,
    registerSuccess,
    loginSuccess,
    message,
    buttonLoading,
    CloseAllSnackbar,
  } = useAuth();
  const [user, setUser] = useState({
    email: "",
    password: "",
  });

  const HandleUserChange = ({ target: { name, value } }) => {
    setUser({ ...user, [name]: value });
  };

  const HandleCloseSnackbar = () => {
    setSnackbar(false);
  };

  useEffect(() => {
    setLoading(true);
    setTimeout(() => setLoading(false), 1500);
  }, []);
  return (
    <>
      {loginSuccess && (
        <>
          <Navigate to="/" />
        </>
      )}
      {registerSuccess && (
        <Snackbar
          open={snackbar}
          onClose={HandleCloseSnackbar}
          autoHideDuration={1500}
        >
          <Alert
            onClose={HandleCloseSnackbar}
            severity="success"
            sx={{ width: "100%" }}
          >
            {message}
          </Alert>
        </Snackbar>
      )}
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
          <>
            <Box>
              <Typography
                component="h2"
                sx={{
                  fontSize: "28px",
                  fontWeight: "bold",
                  mb: 3,
                  color: "#66bb6a",
                  textDecoration: "underline",
                  textTransform: "uppercase",
                }}
              >
                LOGIN
              </Typography>
            </Box>
            <Card
              sx={{
                p: 4,
                display: "flex",
                gap: 5,
                maxWidth: { xs: 350, md: 1200 },
                flexDirection: "column",
              }}
            >
              <Box
                sx={{
                  width: 400,
                  display: "flex",
                  flexDirection: "column",
                  gap: 3,
                }}
              >
                <TextField
                  sx={{ width: "100%" }}
                  error={false}
                  label="Email"
                  name="email"
                  helperText=""
                  variant="filled"
                  color="success"
                  onChange={HandleUserChange}
                />
                <TextField
                  sx={{ width: "100%" }}
                  error={false}
                  label="Password"
                  name="password"
                  helperText=""
                  variant="filled"
                  color="success"
                  onChange={HandleUserChange}
                />
                <Box
                  sx={{
                    display: "flex",
                    flexDirection: { xs: "column", md: "row" },
                    justifyContent: { xs: "center", md: "space-between" },
                    alignItems: "center",
                  }}
                >
                  <Button
                    variant="contained"
                    sx={{
                      width: { xs: "100%", md: "40%" },
                      fontSize: 17,
                      fontWeight: "400",
                      backgroundColor: "#3c733f",
                      mb: { xs: 2, md: 0 },
                      "&:hover": { backgroundColor: "#224024" },
                    }}
                  >
                    LOGIN
                  </Button>
                  <Box
                    sx={{
                      display: "flex",
                      flexDirection: "column",
                      alignItems: { xs: "center", md: "flex-end" },
                    }}
                  >
                    <Link to={"/forgot-password"}>
                      <MaterialLink
                        underline="hover"
                        sx={{
                          width: { xs: "100%", md: "60%" },
                          color: "#66bb6a",
                        }}
                      >
                        Forgot password?
                      </MaterialLink>
                    </Link>
                    <Link to={"/register"}>
                      <MaterialLink
                        underline="hover"
                        sx={{
                          width: { xs: "100%", md: "60%" },
                          color: "#66bb6a",
                        }}
                      >
                        Register
                      </MaterialLink>
                    </Link>
                  </Box>
                </Box>
              </Box>
              <Divider sx={{ mt: "-15px", mb: "-15px" }} />
              <Button
                variant="contained"
                sx={{
                  width: "100%",
                  fontSize: 17,
                  fontWeight: "400",
                  backgroundColor: "#db4437",
                  mb: { xs: 2, md: 0 },
                  display: "flex",
                  alignItems: "center",
                  gap: 1,
                  "&:hover": { backgroundColor: "#a63329" },
                }}
              >
                <Typography variant="p">Login with</Typography>{" "}
                <GoogleIcon sx={{ width: "20px" }} />
              </Button>
            </Card>
          </>
        )}
      </Container>
    </>
  );
};

export default LoginView;
