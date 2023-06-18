import Badge from "@mui/material/Badge";
import ShoppingCartIcon from "@mui/icons-material/ShoppingCart";
import IconButton from "@mui/material/IconButton";
import { useCart } from "../../../hooks/CustomHooks";

const CartWidget = () => {
  const { QuantityCart } = useCart();

  return (
    <>
      <IconButton>
        <Badge badgeContent={QuantityCart()} color="success">
          <ShoppingCartIcon sx={{ fontSize: "30px" }} />
        </Badge>
      </IconButton>
    </>
  );
};

export default CartWidget;
