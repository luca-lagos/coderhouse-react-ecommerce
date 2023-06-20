import Box from "@mui/material/Box";
import List from "@mui/material/List";
import Divider from "@mui/material/Divider";
import ListItem from "@mui/material/ListItem";
import ListItemButton from "@mui/material/ListItemButton";
import ListItemText from "@mui/material/ListItemText";
import Typography from "@mui/material/Typography";
import Card from "@mui/material/Card";
import Button from "@mui/material/Button";
import {
  CardMedia,
  CardContent,
  Chip,
  Modal,
  Backdrop,
  Fade,
} from "@mui/material";
import { Link, Navigate } from "react-router-dom";
import { useState } from "react";
import ErrorOutlinedIcon from "@mui/icons-material/ErrorOutlined";
import TinyColor from "tinycolor2";
import { useAuth, useItem } from "../../hooks/CustomHooks";

const MenuWidget = ({ title, items, HandleClose }) => {
  const [modalOpen, setModalOpen] = useState(false);
  const [logout, setLogout] = useState(false);
  const { logOut, userLogged } = useAuth();
  const { categories } = useItem();

  const SetItemLink = (e) => {
    const result = categories.filter((c) => c.id === e.categoryId);
    return result[0]?.link + "/" + e.link;
  };

  const HandleOpenModal = () => {
    setModalOpen(true);
  };

  const HandleCloseModal = () => {
    setModalOpen(false);
  };

  const LogOut = () => {
    logOut();
    HandleCloseModal();
    setLogout(true);
    setTimeout(() => {
      setLogout(false);
    }, 2000);
  };

  return (
    <>
      {logout && <Navigate to={"/"} />}
      <Modal
        disableEnforceFocus
        open={modalOpen}
        onClose={HandleCloseModal}
        closeAfterTransition
        slots={{ backdrop: Backdrop }}
        slotProps={{
          backdrop: {
            timeout: 500,
          },
        }}
        sx={{ display: "flex", justifyContent: "center", alignItems: "center" }}
      >
        <Fade in={modalOpen}>
          <Box
            sx={{
              backgroundColor: "white",
              p: 4,
              borderRadius: 2,
              boxShadow: "0px 4px 2px #696969",
              display: "flex",
              flexDirection: "column",
              alignItems: "center",
              gap: 2,
            }}
          >
            <Typography variant="p">
              Are you sure you want to log out?
            </Typography>
            <Box
              sx={{
                width: "100%",
                display: "flex",
                justifyContent: "space-between",
              }}
            >
              <Button
                sx={{ color: "#272727", fontWeight: "bold" }}
                onClick={HandleCloseModal}
              >
                No, cancel
              </Button>
              <Button
                sx={{
                  backgroundColor: "#d32f2f",
                  color: "white",
                  fontWeight: "bold",
                  "&:hover": {
                    backgroundColor: "#9a2222",
                  },
                }}
                onClick={LogOut}
              >
                Yes, logout
              </Button>
            </Box>
          </Box>
        </Fade>
      </Modal>
      {title === "MY CART" ? (
        <Box
          role="presentation"
          sx={{ width: { xs: 250, md: 300 }, height: "100%" }}
        >
          <Typography sx={{ p: 3, height: "25px" }}>{title}</Typography>
          <Divider />
          {items != "" ? (
            <Box>
              <List
                sx={{
                  width: { xs: 250, md: 300 },
                  maxHeight: { xs: 700, md: 700 },
                  overflowX: "hidden",
                }}
              >
                {items?.map((value, index) => (
                  <Link key={index} to={SetItemLink(value)}>
                    <Card
                      sx={{
                        maxWidth: { xs: 225, md: 250 },
                        margin: "0 auto",
                        mt: 2,
                        mb: 4,
                      }}
                      onClick={HandleClose}
                    >
                      <CardMedia
                        component="img"
                        height="194"
                        image="/images/products/cloth.webp"
                        alt=""
                      />
                      <CardContent
                        sx={{ textAlign: "center", backgroundColor: "#a2a2a2" }}
                      >
                        <Typography
                          sx={{ color: "#111111", fontSize: "20px", mb: 1 }}
                        >
                          {value.name}
                        </Typography>
                        <Box
                          sx={{
                            display: "flex",
                            justifyContent: "center",
                            alignItems: "center",
                            gap: "15px",
                            mb: "5px",
                          }}
                        >
                          <Box
                            sx={{
                              display: "flex",
                              justifyContent: "center",
                              gap: 2,
                              mb: 2,
                            }}
                          >
                            <Chip
                              sx={{
                                fontWeight: 600,
                                backgroundColor: "#272727",
                              }}
                              label={"QUAN: " + value.quantity}
                            />
                            <Chip
                              sx={{
                                fontWeight: 600,
                                backgroundColor: value.color,
                                color: TinyColor(value.color).isDark()
                                  ? "white"
                                  : "#272727",
                              }}
                              label={value.color}
                            />
                            <Chip
                              sx={{
                                fontWeight: 600,
                                backgroundColor: "#272727",
                              }}
                              label={
                                value.size === "Small"
                                  ? "S"
                                  : value.size === "Medium"
                                  ? "M"
                                  : value.size === "Large"
                                  ? "L"
                                  : "XL"
                              }
                            />
                          </Box>
                        </Box>
                        <Typography
                          sx={{
                            color: "#111111",
                            fontSize: "25px",
                            fontWeight: "bold",
                            mb: "-10px",
                          }}
                        >
                          ${value.price}
                        </Typography>
                      </CardContent>
                    </Card>
                  </Link>
                ))}
              </List>
              <Divider />
              <Link to={"cart"}>
                <Box
                  sx={{
                    width: { xs: 225, md: 250 },
                    margin: "25px auto",
                  }}
                >
                  <Button
                    variant="contained"
                    sx={{
                      fontSize: 20,
                      fontWeight: "bold",
                      backgroundColor: "#4f8752",
                      color: "white",
                      width: "100%",
                      mb: 4,
                      "&:hover": { backgroundColor: "#3c733f" },
                    }}
                    onClick={HandleClose}
                  >
                    GO TO CART
                  </Button>
                </Box>
              </Link>
            </Box>
          ) : (
            <Box
              sx={{
                width: "100%",
                height: "75%",
                display: "flex",
                flexDirection: "column",
                alignItems: "center",
                justifyContent: "center",
                gap: 2,
              }}
            >
              <ErrorOutlinedIcon sx={{ fontSize: 60 }} />
              <Typography variant="h5">This is empty</Typography>
            </Box>
          )}
        </Box>
      ) : (
        <Box role="presentation" sx={{ width: { xs: 250, md: 300 } }}>
          <Typography sx={{ p: 3 }}>{title}</Typography>
          <Divider />
          <List>
            {items?.map((value, index) => (
              <Link key={index} to={value.key}>
                <ListItem disablePadding onClick={HandleClose}>
                  <ListItemButton>
                    <ListItemText
                      primary={value.name}
                      sx={{ color: "#969696" }}
                    />
                  </ListItemButton>
                </ListItem>
              </Link>
            ))}
            {userLogged != null ? (
              <ListItem disablePadding onClick={HandleOpenModal}>
                <ListItemButton>
                  <ListItemText primary="Logout" sx={{ color: "#969696" }} />
                </ListItemButton>
              </ListItem>
            ) : (
              ""
            )}
          </List>
        </Box>
      )}
    </>
  );
};

export default MenuWidget;
