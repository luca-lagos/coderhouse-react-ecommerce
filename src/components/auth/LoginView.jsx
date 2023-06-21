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
  FormControl,
  InputLabel,
  FilledInput,
  InputAdornment,
  IconButton,
} from "@mui/material";
import { LoadingButton } from "@mui/lab";
import MaterialLink from "@mui/material/Link";
import Visibility from "@mui/icons-material/Visibility";
import VisibilityOff from "@mui/icons-material/VisibilityOff";
import GoogleIcon from "@mui/icons-material/Google";
import { useEffect, useState } from "react";
import { useAuth } from "../../hooks/CustomHooks";

import { Link, Navigate } from "react-router-dom";

const LoginView = () => {
  const [loading, setLoading] = useState(true);
  const [snackbar, setSnackbar] = useState(true);
  const [showPassword, setShowPassword] = useState(false);
  const {
    userLogged,
    commonLogin,
    googleLogin,
    error,
    registerSuccess,
    loginSuccess,
    forgotSuccess,
    updateSuccess,
    message,
    buttonLoading,
    googleLoading,
    CloseAllSnackbar,
  } = useAuth();
  const [user, setUser] = useState({
    email: "",
    password: "",
  });

  const HandleClickShowPassword = () => setShowPassword((show) => !show);

  const HandleMouseDownPassword = (e) => {
    e.preventDefault();
  };

  const HandleUserChange = ({ target: { name, value } }) => {
    setUser({ ...user, [name]: value });
  };

  const HandleCloseSnackbar = () => {
    setSnackbar(false);
  };

  const HandleCommonLogin = async (e) => {
    e.preventDefault();
    await commonLogin(user);
  };

  const HandleGoogleLogin = async (e) => {
    e.preventDefault();
    await googleLogin();
  };

  useEffect(() => {
    setLoading(true);
    setTimeout(() => setLoading(false), 1500);
  }, []);

  return (
    <>
      {userLogged != null && <Navigate to={"/"} />}
      {loginSuccess && (
        <>
          <Navigate to="/" />
        </>
      )}
      {(registerSuccess || updateSuccess || forgotSuccess) && (
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
                  error={false}
                  label="Email"
                  name="email"
                  helperText=""
                  variant="filled"
                  color="success"
                  onChange={HandleUserChange}
                />
                <FormControl sx={{ width: "100%" }} variant="filled">
                  <InputLabel color="success">Password</InputLabel>
                  <FilledInput
                    name="password"
                    color="success"
                    type={showPassword ? "text" : "password"}
                    onChange={HandleUserChange}
                    endAdornment={
                      <InputAdornment position="end">
                        <IconButton
                          onClick={HandleClickShowPassword}
                          onMouseDown={HandleMouseDownPassword}
                          edge="end"
                        >
                          {showPassword ? <VisibilityOff /> : <Visibility />}
                        </IconButton>
                      </InputAdornment>
                    }
                  />
                </FormControl>
                <Box
                  sx={{
                    display: "flex",
                    flexDirection: { xs: "column", md: "row" },
                    justifyContent: { xs: "center", md: "space-between" },
                    alignItems: "center",
                  }}
                >
                  <LoadingButton
                    variant="contained"
                    sx={{
                      width: { xs: "100%", md: "40%" },
                      fontSize: 17,
                      fontWeight: "400",
                      backgroundColor: "#3c733f",
                      mb: { xs: 2, md: 0 },
                      "&:hover": { backgroundColor: "#224024" },
                    }}
                    onClick={HandleCommonLogin}
                    loading={buttonLoading}
                    loadingPosition="end"
                  >
                    <span>LOGIN</span>
                  </LoadingButton>
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
              <LoadingButton
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
                onClick={HandleGoogleLogin}
                loading={googleLoading}
                loadingPosition="end"
              >
                <Typography variant="p">Login with</Typography>{" "}
                <GoogleIcon sx={{ width: "20px" }} />
              </LoadingButton>
            </Card>
          </>
        )}
      </Container>
    </>
  );
};

export default LoginView;
