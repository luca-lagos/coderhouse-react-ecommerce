import { Link, useParams } from "react-router-dom";
import Card from "@mui/material/Card";
import Typography from "@mui/material/Typography";
import Box from "@mui/material/Box";
import { Chip } from "@mui/material";
import VisibilityIcon from "@mui/icons-material/Visibility";
import { CardMedia, CardContent } from "@mui/material";
import { useState } from "react";
import TinyColor from "tinycolor2";
import { useItem } from "../../../hooks/CustomHooks";

const Item = ({ product }) => {
  const [overlay, setOverlay] = useState(false);
  const category = useParams().category;
  const { categories } = useItem();
  let link = "";

  const result = categories.filter((c) => c.id === product.categoryId);
  if (category === undefined) {
    link = result[0]?.key + "/" + product.key;
  } else {
    link = product.key;
  }

  return (
    <>
      <Link to={link}>
        <Card
          sx={{
            display: { xs: "block", md: "none" },
            position: "relative",
            maxWidth: 350,
            margin: "0 auto",
          }}
        >
          <CardMedia
            component="img"
            height="194"
            image={product.image}
            alt=""
          />
          <CardContent sx={{ textAlign: "center" }}>
            <Typography sx={{ color: "#111111", fontSize: "20px", mb: 1 }}>
              {product.name}
            </Typography>
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
                  backgroundColor: product.color,
                  pl: 1,
                  pr: 1,
                  color: TinyColor(product.color).isDark()
                    ? "white"
                    : "#272727",
                }}
                label={product.color}
              />
              <Chip
                sx={{ fontWeight: 600, pl: 1, pr: 1 }}
                label={
                  product.size === "Small"
                    ? "S"
                    : product.size === "Medium"
                    ? "M"
                    : product.size === "Large"
                    ? "L"
                    : "XL"
                }
              />
            </Box>
            <Typography
              sx={{ color: "#111111", fontSize: "25px", fontWeight: "bold" }}
            >
              ${product.price}
            </Typography>
          </CardContent>
        </Card>
      </Link>
      <Card
        sx={{
          display: { xs: "none", md: "block" },
          position: "relative",
          maxWidth: 350,
          margin: "0 auto",
        }}
        onMouseOver={() => setOverlay(true)}
        onMouseOut={() => setOverlay(false)}
      >
        <Link to={link}>
          <Box
            display={overlay ? "flex" : "none"}
            sx={{
              position: "absolute",
              width: "100%",
              height: "100%",
              backgroundColor: "rgba(102,187,106,0.7)",
              flexDirection: "column",
              justifyContent: "center",
              alignItems: "center",
              gap: "5px",
            }}
          >
            <VisibilityIcon
              sx={{ width: "50px", height: "auto", color: "white" }}
            />
          </Box>
        </Link>
        <CardMedia component="img" height="194" image={product.image} alt="" />
        <CardContent sx={{ textAlign: "center" }}>
          <Typography sx={{ color: "#111111", fontSize: "20px", mb: 1 }}>
            {product.name}
          </Typography>
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
                backgroundColor: product.color,
                pl: 1,
                pr: 1,
                color: TinyColor(product.color).isDark() ? "white" : "#272727",
              }}
              label={product.color}
            />
            <Chip
              sx={{ fontWeight: 600, pl: 1, pr: 1 }}
              label={
                product.size === "Small"
                  ? "S"
                  : product.size === "Medium"
                  ? "M"
                  : product.size === "Large"
                  ? "L"
                  : "XL"
              }
            />
          </Box>
          <Typography
            sx={{ color: "#111111", fontSize: "25px", fontWeight: "bold" }}
          >
            ${product.price}
          </Typography>
        </CardContent>
      </Card>
    </>
  );
};

export default Item;
