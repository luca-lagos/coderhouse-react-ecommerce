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
import Visibility from "@mui/icons-material/Visibility";
import VisibilityOff from "@mui/icons-material/VisibilityOff";
import LoadingButton from "@mui/lab/LoadingButton";
import MaterialLink from "@mui/material/Link";
import { useEffect, useState } from "react";
import { useAuth } from "../../hooks/CustomHooks";

import { Link, Navigate } from "react-router-dom";

const RegisterView = () => {
  const [loading, setLoading] = useState(true);
  const [showPassword, setShowPassword] = useState(false);
  const [showRepeatPassword, setShowRepeatPassword] = useState(false);
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
    phone: "",
    password: "",
    repeatPassword: "",
  });

  const HandleClickShowPassword = () => setShowPassword((show) => !show);

  const HandleMouseDownPassword = (e) => {
    e.preventDefault();
  };

  const HandleClickShowRepeatPassword = () =>
    setShowRepeatPassword((show) => !show);

  const HandleMouseDownRepeatPassword = (e) => {
    e.preventDefault();
  };

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
                  label="Phone"
                  name="phone"
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
                <FormControl sx={{ width: "100%" }} variant="filled">
                  <InputLabel color="success">Repeat password</InputLabel>
                  <FilledInput
                    name="repeatPassword"
                    color="success"
                    type={showRepeatPassword ? "text" : "password"}
                    onChange={HandleUserChange}
                    endAdornment={
                      <InputAdornment position="end">
                        <IconButton
                          onClick={HandleClickShowRepeatPassword}
                          onMouseDown={HandleMouseDownRepeatPassword}
                          edge="end"
                        >
                          {showRepeatPassword ? (
                            <VisibilityOff />
                          ) : (
                            <Visibility />
                          )}
                        </IconButton>
                      </InputAdornment>
                    }
                  />
                </FormControl>
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
