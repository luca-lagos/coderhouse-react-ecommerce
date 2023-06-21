import {
  Box,
  CircularProgress,
  Card,
  TextField,
  Container,
  Typography,
  Snackbar,
  Alert,
  Button,
} from "@mui/material";
import LoadingButton from "@mui/lab/LoadingButton";
import { useEffect, useState } from "react";
import { useAuth } from "../../../hooks/CustomHooks";

import { Link, Navigate } from "react-router-dom";

const UpdateProfile = () => {
  const [loading, setLoading] = useState(true);
  const {
    userLogged,
    updateUserProfile,
    getUserById,
    error,
    updateSuccess,
    message,
    buttonLoading,
    CloseAllSnackbar,
  } = useAuth();
  const [user, setUser] = useState({
    fullname: "",
    phone: "",
  });

  const uid = userLogged?.uid;

  const HandleUserChange = ({ target: { name, value } }) => {
    setUser({ ...user, [name]: value });
  };

  const HandleUpdateUser = async (e) => {
    e.preventDefault();
    await updateUserProfile(uid, user);
  };

  useEffect(() => {
    setLoading(true);
    getUserById(uid).then((res) => {
      const result = {
        id: res.id,
        data: res.data(),
      };
      setUser({
        fullname: result.data?.fullname,
        phone: result.data?.phone,
      });
    });
    setTimeout(() => setLoading(false), 2500);
  }, [getUserById, uid]);
  return (
    <>
      {userLogged == null && <Navigate to={"/"} />}
      {updateSuccess && (
        <>
          <Navigate to="/my-profile" />
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
                UPDATE PROFILE
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
                  value={(user && user?.fullname) || ""}
                  onChange={HandleUserChange}
                  suppressContentEditableWarning={true}
                />
                <TextField
                  sx={{ width: "100%" }}
                  label="Phone"
                  name="phone"
                  variant="filled"
                  color="success"
                  value={(user && user?.phone) || ""}
                  onChange={HandleUserChange}
                  suppressContentEditableWarning={true}
                />
                <Box sx={{ display: "flex", justifyContent: "space-between" }}>
                  <Link to={"/my-profile"}>
                    <Button
                      variant="contained"
                      sx={{
                        width: 150,
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
                      width: 150,
                      fontSize: 17,
                      fontWeight: "400",
                      backgroundColor: "#3c733f",
                      mb: { xs: 2, md: 0 },
                      "&:hover": { backgroundColor: "#224024" },
                    }}
                    onClick={HandleUpdateUser}
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

export default UpdateProfile;
