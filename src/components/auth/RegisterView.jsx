import {
  Box,
  CircularProgress,
  Card,
  TextField,
  Container,
  Typography,
  Divider,
  Snackbar,
  Alert,
} from "@mui/material";
import LoadingButton from "@mui/lab/LoadingButton";
import MaterialLink from "@mui/material/Link";
import { useEffect, useState } from "react";
import { useAuth } from "../../hooks/customHooks";

import { Link, Navigate } from "react-router-dom";

const RegisterView = () => {
  const [loading, setLoading] = useState(true);
  const {
    commonRegister,
    error,
    registerSuccess,
    message,
    buttonLoading,
    CloseAllSnackbar,
  } = useAuth();
  const [user, setUser] = useState({
    fullname: "",
    email: "",
    password: "",
    repeatPassword: "",
  });

  const HandleUserChange = ({ target: { name, value } }) => {
    setUser({ ...user, [name]: value });
  };

  const HandleCommonRegister = async (e) => {
    e.preventDefault();
    await commonRegister("/User", user);
  };

  useEffect(() => {
    setLoading(true);
    setTimeout(() => setLoading(false), 1500);
  }, []);
  return (
    <>
      {registerSuccess && (
        <>
          <Navigate to="/login" />
        </>
      )}

      <Snackbar open={error} onClose={CloseAllSnackbar} autoHideDuration={1500}>
        <Alert
          onClose={CloseAllSnackbar}
          severity="error"
          sx={{ width: "100%" }}
        >
          {message}
        </Alert>
      </Snackbar>
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
                  label="Fullname"
                  name="fullname"
                  variant="filled"
                  color="success"
                  onChange={HandleUserChange}
                />
                <TextField
                  sx={{ width: "100%" }}
                  label="Email"
                  name="email"
                  variant="filled"
                  color="success"
                  onChange={HandleUserChange}
                />
                <TextField
                  sx={{ width: "100%" }}
                  label="Password"
                  name="password"
                  variant="filled"
                  color="success"
                  onChange={HandleUserChange}
                />
                <TextField
                  sx={{ width: "100%" }}
                  label="Repeat Password"
                  name="repeatPassword"
                  variant="filled"
                  color="success"
                  onChange={HandleUserChange}
                />
                <LoadingButton
                  variant="contained"
                  sx={{
                    width: "100%",
                    fontSize: 17,
                    fontWeight: "400",
                    backgroundColor: "#3c733f",
                    mb: { xs: 2, md: 0 },
                    "&:hover": { backgroundColor: "#224024" },
                  }}
                  onClick={HandleCommonRegister}
                  loading={buttonLoading}
                  loadingPosition="end"
                >
                  <span>REGISTER</span>
                </LoadingButton>
              </Box>
              <Divider sx={{ mt: "-15px", mb: "-15px" }} />
              <Box
                sx={{
                  display: "flex",
                  justifyContent: "center",
                  alignItems: "center",
                }}
              >
                You have a account? Please
                <Link to={"/login"}>
                  <MaterialLink
                    underline="hover"
                    sx={{
                      color: "#66bb6a",
                      ml: "5px",
                    }}
                  >
                    login
                  </MaterialLink>
                  .
                </Link>
              </Box>
            </Card>
          </>
        )}
      </Container>
    </>
  );
};

export default RegisterView;
