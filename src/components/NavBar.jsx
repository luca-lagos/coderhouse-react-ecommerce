import { useState } from "react";
import CartWidget from "./widgets/cart/CartWidget";
import MenuWidget from "./widgets/MenuWidget";
import { ThemeProvider, createTheme } from "@mui/material/styles";
import AppBar from "@mui/material/AppBar";
import Box from "@mui/material/Box";
import Toolbar from "@mui/material/Toolbar";
import IconButton from "@mui/material/IconButton";
import MenuIcon from "@mui/icons-material/Menu";
import Container from "@mui/material/Container";
import Avatar from "@mui/material/Avatar";
import Button from "@mui/material/Button";
import { Link } from "react-router-dom";
import Typography from "@mui/material/Typography";
import Drawer from "@mui/material/SwipeableDrawer";
import { Tooltip } from "@mui/material";
import { useCart, useAuth, useItem } from "../hooks/customHooks";
import LoginIcon from "@mui/icons-material/Login";

const loginSettings = [
  { name: "My profile", link: "my-profile" },
  { name: "My buying list", link: "buying-list" },
  { name: "My favourites", link: "favourites" },
];

const NavBar = () => {
  const [menuOpen, setMenuOpen] = useState(false);
  const [userOpen, setUserOpen] = useState(false);
  const [cartOpen, setCartOpen] = useState(false);

  const { categories } = useItem();

  const { userLogged } = useAuth();

  const { cart } = useCart();

  const HandleMenuClose = () => {
    setMenuOpen(false);
  };

  const HandleUserClose = () => {
    setUserOpen(false);
  };

  const HandleCartClose = () => {
    setCartOpen(false);
  };

  const darkTheme = createTheme({
    palette: {
      mode: "dark",
    },
  });

  return (
    <ThemeProvider theme={darkTheme}>
      <AppBar component="nav" position="fixed">
        <Container
          maxWidth="xl"
          sx={{ height: "80px", pt: { xs: "12px", md: "8px" } }}
        >
          <Toolbar disableGutters>
            <Typography
              sx={{ display: { xs: "none", md: "flex" }, flexGrow: 1, mt: 1 }}
            >
              <Link to="/">
                <img style={{ width: "50px" }} src="/images/react-icon.png" />
              </Link>
            </Typography>
            <Box sx={{ flexGrow: 1, display: { xs: "flex", md: "none" } }}>
              <IconButton
                size="large"
                aria-controls="menu-appbar"
                aria-haspopup="true"
                onClick={() => setMenuOpen(true)}
                color="inherit"
              >
                <MenuIcon />
              </IconButton>
              <Drawer
                open={menuOpen}
                anchor="left"
                onClose={() => setMenuOpen(false)}
              >
                <MenuWidget
                  title="CATEGORIES"
                  items={categories}
                  HandleClose={HandleMenuClose}
                />
              </Drawer>
            </Box>
            <Typography
              sx={{
                display: { xs: "flex", md: "none" },
                flexGrow: 6,
                mt: "7px",
              }}
            >
              <Link to="/">
                <img style={{ width: "50px" }} src="/images/react-icon.png" />
              </Link>
            </Typography>
            <Box sx={{ flexGrow: 0, mr: 2 }}>
              {userLogged != null ? (
                <>
                  <IconButton onClick={() => setUserOpen(true)}>
                    <Avatar
                      alt="Remy Sharp"
                      sx={{ backgroundColor: "#66bb6a", color: "#272727" }}
                      src=""
                    />
                  </IconButton>

                  <Drawer
                    open={userOpen}
                    anchor="right"
                    onClose={() => {
                      setUserOpen(false);
                    }}
                  >
                    <MenuWidget
                      title="MY ACCOUNT"
                      items={loginSettings}
                      HandleClose={HandleUserClose}
                    />
                  </Drawer>
                </>
              ) : (
                <Link to={"/login"}>
                  <Tooltip title={"Login"}>
                    <IconButton>
                      <Avatar
                        alt="Remy Sharp"
                        sx={{ backgroundColor: "#66bb6a", color: "#272727" }}
                      >
                        <LoginIcon />
                      </Avatar>
                    </IconButton>
                  </Tooltip>
                </Link>
              )}
            </Box>

            <Box sx={{ flexGrow: 0 }}>
              <div onClick={() => setCartOpen(true)}>
                <CartWidget amount={4} />
              </div>
              <Drawer
                open={cartOpen}
                anchor="right"
                onClose={() => {
                  setCartOpen(false);
                }}
              >
                <MenuWidget
                  title="MY CART"
                  items={cart}
                  HandleClose={HandleCartClose}
                />
              </Drawer>
            </Box>
          </Toolbar>
        </Container>
        <Container
          maxWidth="xxl"
          sx={{
            display: { xs: "none", md: "flex" },
            justifyContent: "center",
            alignItems: "center",
            backgroundColor: "#3c733f",
            height: "60px",
          }}
        >
          <Box sx={{ display: "flex" }}>
            {categories.map((value, index) => (
              <Link to={value.key} key={index}>
                <Button
                  sx={{
                    my: 2,
                    mr: 1,
                    ml: 1,
                    color: "#c9c9c9",
                    display: "block",
                    fontWeight: "bold",
                  }}
                >
                  {value.name}
                </Button>
              </Link>
            ))}
          </Box>
        </Container>
      </AppBar>
    </ThemeProvider>
  );
};
export default NavBar;
