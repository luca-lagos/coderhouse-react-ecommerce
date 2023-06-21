import { useState } from "react";
import { useAuth } from "../../hooks/CustomHooks";
import { useEffect } from "react";
import { Navigate } from "react-router-dom";
import {
  Snackbar,
  Container,
  Box,
  Alert,
  CircularProgress,
  Typography,
  TextField,
  Card,
} from "@mui/material";
import { LoadingButton } from "@mui/lab";

const ResetPasswordView = () => {
  const [loading, setLoading] = useState(true);
  const [email, setEmail] = useState("");
  const {
    userLogged,
    buttonLoading,
    commonResetPassword,
    CloseAllSnackbar,
    forgotSuccess,
    error,
    message,
  } = useAuth();

  const HandleEmailChange = ({ target: { value } }) => {
    setEmail(value);
  };

  const HandleResetPassword = async (e) => {
    e.preventDefault();
    await commonResetPassword(email);
  };

  useEffect(() => {
    setLoading(true);
    setTimeout(() => {
      setLoading(false);
    }, 2500);
  }, []);

  return (
    <>
      {userLogged != null && <Navigate to={"/"} />}
      {forgotSuccess && <Navigate to={"/login"} />}
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
                RESET PASSWORD
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
              <Typography
                variant="p"
                sx={{
                  fontSize: 15,
                  fontStyle: "italic",
                  color: "#272727",
                  width: {xs: "100%", md: 400},
                  textAlign: "center",
                  margin: "0 auto",
                }}
              >
                For reset your account password, please send your email to
                verify if exists an account with this.
              </Typography>
              <Box
                sx={{
                  width: {xs: "100%", md: 400},
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
                  onChange={HandleEmailChange}
                />
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
                      width: "100%",
                      fontSize: 17,
                      fontWeight: "400",
                      backgroundColor: "#3c733f",
                      mb: { xs: 2, md: 0 },
                      "&:hover": { backgroundColor: "#224024" },
                    }}
                    onClick={HandleResetPassword}
                    loading={buttonLoading}
                    loadingPosition="end"
                  >
                    <span>CHECK EMAIL</span>
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

export default ResetPasswordView;
