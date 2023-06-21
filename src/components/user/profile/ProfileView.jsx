import { useEffect, useState } from "react";
import { useAuth } from "../../../hooks/CustomHooks";
import {
  Container,
  Box,
  Typography,
  Snackbar,
  Alert,
  CircularProgress,
  Button,
  Card,
  Grid,
  Divider,
} from "@mui/material";
import { Link, Navigate } from "react-router-dom";

const ProfileView = () => {
  const [loading, setLoading] = useState(false);
  const [snackbar, setSnackbar] = useState(false);
  const [user, setUser] = useState([]);
  const { getUserById, userLogged, updateSuccess, message } = useAuth();

  const uid = userLogged?.uid;

  const uProviderData = userLogged?.providerData[0];

  console.log(uProviderData);

  const HandleCloseSnackbar = () => {
    setSnackbar(false);
  };

  useEffect(() => {
    setLoading(true);
    getUserById(uid).then((res) => {
      const result = {
        id: res.id,
        data: res.data(),
      };
      setUser(result);
    });
    setTimeout(() => setLoading(false), 2500);
  }, [getUserById, uid]);

  return (
    <>
      {userLogged == null && <Navigate to={"/"} />}
      {updateSuccess && (
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
        maxWidth="md"
        sx={{
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          mt: { xs: 15, md: 22 },
          p: 2,
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
                  mb: 4,
                  color: "#66bb6a",
                  textDecoration: "underline",
                  textTransform: "uppercase",
                }}
              >
                MY PROFILE
              </Typography>
            </Box>
            <Card
              sx={{
                width: "95%",
                p: 2,
                display: "flex",
                gap: 2,
                flexDirection: "column",
              }}
            >
              <Grid container spacing={{ xs: 1, md: 2 }}>
                <Grid item xs={12} md={6}>
                  <Box
                    sx={{
                      display: "flex",
                      justifyContent: "space-between",
                      alignItems: "center",
                      height: 40,
                      p: 2,
                      borderRadius: 1,
                      backgroundColor: "#e9e9e9",
                    }}
                  >
                    <Typography variant="p">
                      FULLNAME:{" "}
                      <Typography variant="p" sx={{ fontWeight: "bold", fontSize: {xs: 15, md: "auto"} }}>
                        {uProviderData?.displayName == null
                          ? user.data?.fullname
                          : uProviderData?.displayName}
                      </Typography>
                    </Typography>
                  </Box>
                </Grid>
                <Grid
                  item
                  xs={12}
                  md={6}
                  display={
                    uProviderData?.phoneNumber || user.data?.phone != null
                      ? "block"
                      : "none"
                  }
                >
                  <Box
                    sx={{
                      display: "flex",
                      justifyContent: "space-between",
                      alignItems: "center",
                      height: 40,
                      p: 2,
                      borderRadius: 1,
                      backgroundColor: "#e9e9e9",
                    }}
                  >
                    <Typography variant="p">
                      PHONE:{" "}
                      <Typography variant="p" sx={{ fontWeight: "bold", fontSize: {xs: 15, md: "auto"} }}>
                        {uProviderData?.phoneNumber == null
                          ? user.data?.phone
                          : uProviderData?.phoneNumber}
                      </Typography>
                    </Typography>
                  </Box>
                </Grid>
                <Grid
                  item
                  xs={12}
                  md={
                    uProviderData?.phoneNumber || user.data?.phone == null
                      ? 6
                      : 12
                  }
                >
                  <Box
                    sx={{
                      display: "flex",
                      justifyContent: "space-between",
                      alignItems: "center",
                      height: 40,
                      p: 2,
                      borderRadius: 1,
                      backgroundColor: "#e9e9e9",
                    }}
                  >
                    <Typography variant="p">
                      EMAIL:{" "}
                      <Typography variant="p" sx={{ fontWeight: "bold", fontSize: {xs: 15, md: "auto"} }}>
                        {userLogged?.email}
                      </Typography>
                    </Typography>
                  </Box>
                </Grid>
              </Grid>

              {uProviderData?.displayName == null && (
                <>
                  <Divider sx={{ width: "40%", margin: "0 auto" }} />
                  <Box sx={{ display: "flex", justifyContent: {xs: 'center', md: "flex-end"}, gap: 1 }}>
                    <Link to={"/update-profile"}>
                      <Button
                        sx={{
                          width: 'auto',
                          fontSize: 17,
                          fontWeight: "700",
                          backgroundColor: "#3c733f",
                          color: "white",
                          "&:hover": { backgroundColor: "#224024" },
                        }}
                      >
                        UPDATE PROFILE
                      </Button>
                    </Link>
                    <Link to={"/update-password"}>
                      <Button
                        sx={{
                          width: 'auto',
                          fontSize: 17,
                          fontWeight: "700",
                          backgroundColor: "#3c733f",
                          color: "white",
                          "&:hover": { backgroundColor: "#224024" },
                        }}
                      >
                        UPDATE PASSWORD
                      </Button>
                    </Link>
                  </Box>
                </>
              )}
            </Card>
          </>
        )}
      </Container>
    </>
  );
};

export default ProfileView;
