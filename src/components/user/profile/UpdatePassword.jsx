import {
  Box,
  CircularProgress,
  Card,
  Container,
  Typography,
  Snackbar,
  Alert,
  FormControl,
  InputLabel,
  FilledInput,
  InputAdornment,
  IconButton,
  Button,
} from "@mui/material";
import Visibility from "@mui/icons-material/Visibility";
import VisibilityOff from "@mui/icons-material/VisibilityOff";
import LoadingButton from "@mui/lab/LoadingButton";
import { useEffect, useState } from "react";
import { useAuth } from "../../../hooks/CustomHooks";

import { Link, Navigate } from "react-router-dom";

const UpdatePassword = () => {
  const [loading, setLoading] = useState(true);
  const [showCurrentPassword, setShowCurrentPassword] = useState(false);
  const [showNewPassword, setShowNewPassword] = useState(false);
  const [showRepeatNewPassword, setShowRepeatNewPassword] = useState(false);
  const {
    userLogged,
    updateUserPassword,
    error,
    updateSuccess,
    message,
    buttonLoading,
    CloseAllSnackbar,
  } = useAuth();
  const [user, setUser] = useState({
    currentPassword: "",
    newPassword: "",
    repeatNewPassword: "",
  });

  const HandleClickShowCurrentPassword = () =>
    setShowCurrentPassword((show) => !show);

  const HandleMouseDownCurrentPassword = (e) => {
    e.preventDefault();
  };

  const HandleClickShowNewPassword = () => setShowNewPassword((show) => !show);

  const HandleMouseDownNewPassword = (e) => {
    e.preventDefault();
  };

  const HandleClickShowRepeatNewPassword = () =>
    setShowRepeatNewPassword((show) => !show);

  const HandleMouseDownRepeatNewPassword = (e) => {
    e.preventDefault();
  };

  const HandleUserChange = ({ target: { name, value } }) => {
    setUser({ ...user, [name]: value });
  };

  const HandleUpdateUserPassword = (e) => {
    e.preventDefault();
    updateUserPassword(user);
  };

  useEffect(() => {
    setLoading(true);
    setTimeout(() => setLoading(false), 2500);
  }, []);
  return (
    <>
      {userLogged == null && <Navigate to={"/"} />}
      {updateSuccess && (
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
                UPDATE PASSWORD
              </Typography>
            </Box>
            <Card
              sx={{
                p: 4,
                display: "flex",
                gap: 5,
                maxWidth: {xs: "auto", md: 1200},
                width: { xs: "85%", md: "auto" },
                flexDirection: "column",
              }}
            >
              <Box
                sx={{
                  width: {xs: "100%", md: 400},
                  display: "flex",
                  flexDirection: "column",
                  gap: 3,
                }}
              >
                <FormControl sx={{ width: "100%" }} variant="filled">
                  <InputLabel color="success">Old password</InputLabel>
                  <FilledInput
                    name="currentPassword"
                    color="success"
                    type={showCurrentPassword ? "text" : "password"}
                    onChange={HandleUserChange}
                    suppressContentEditableWarning={true}
                    endAdornment={
                      <InputAdornment position="end">
                        <IconButton
                          onClick={HandleClickShowCurrentPassword}
                          onMouseDown={HandleMouseDownCurrentPassword}
                          edge="end"
                        >
                          {showCurrentPassword ? (
                            <VisibilityOff />
                          ) : (
                            <Visibility />
                          )}
                        </IconButton>
                      </InputAdornment>
                    }
                  />
                </FormControl>
                <FormControl sx={{ width: "100%" }} variant="filled">
                  <InputLabel color="success">New password</InputLabel>
                  <FilledInput
                    name="newPassword"
                    color="success"
                    type={showNewPassword ? "text" : "password"}
                    onChange={HandleUserChange}
                    suppressContentEditableWarning={true}
                    endAdornment={
                      <InputAdornment position="end">
                        <IconButton
                          onClick={HandleClickShowNewPassword}
                          onMouseDown={HandleMouseDownNewPassword}
                          edge="end"
                        >
                          {showNewPassword ? <VisibilityOff /> : <Visibility />}
                        </IconButton>
                      </InputAdornment>
                    }
                  />
                </FormControl>
                <FormControl sx={{ width: "100%" }} variant="filled">
                  <InputLabel color="success">Repeat new password</InputLabel>
                  <FilledInput
                    name="repeatNewPassword"
                    color="success"
                    type={showRepeatNewPassword ? "text" : "password"}
                    onChange={HandleUserChange}
                    suppressContentEditableWarning={true}
                    endAdornment={
                      <InputAdornment position="end">
                        <IconButton
                          onClick={HandleClickShowRepeatNewPassword}
                          onMouseDown={HandleMouseDownRepeatNewPassword}
                          edge="end"
                        >
                          {showRepeatNewPassword ? (
                            <VisibilityOff />
                          ) : (
                            <Visibility />
                          )}
                        </IconButton>
                      </InputAdornment>
                    }
                  />
                </FormControl>
                <Box sx={{ display: "flex", justifyContent: "space-between" }}>
                  <Link to={"/my-profile"}>
                    <Button
                      variant="contained"
                      sx={{
                        width: {xs: "auto", md: 150},
                        fontSize: 17,
                        fontWeight: "400",
                        backgroundColor: "#d32f2f",
                        mb: { xs: 2, md: 0 },
                        "&:hover": { backgroundColor: "#8c2222" },
                      }}
                    >
                      CANCEL
                    </Button>
                  </Link>
                  <LoadingButton
                    variant="contained"
                    sx={{
                      width: {xs: "auto", md: 150},
                      fontSize: 17,
                      fontWeight: "400",
                      backgroundColor: "#3c733f",
                      mb: { xs: 2, md: 0 },
                      "&:hover": { backgroundColor: "#224024" },
                    }}
                    onClick={HandleUpdateUserPassword}
                    loading={buttonLoading}
                    loadingPosition="end"
                  >
                    <span>UPDATE</span>
                  </LoadingButton>
                </Box>
              </Box>
            </Card>
          </>
        )}
      </Container>
    </>
  );
};

export default UpdatePassword;
