import { Delete, Edit } from "@mui/icons-material";
import {Box, Card, CardActions, CardContent, CardMedia, IconButton, Typography } from "@mui/material";
import { useContext } from "react";
import { useNavigate } from "react-router-dom";
import ProductContext from "../context/ProductContext";

const toSentenceCase = (str) => {
    return str.charAt(0).toUpperCase() + str.slice(1);
}

function Product({product}) {

    const {deleteProduct} = useContext(ProductContext);
    const navigate  = useNavigate();
    const styles = {
       color: (product.rating >= 3) ? "green" : "red" ,
    }
    return (
        <Card sx={{ maxWidth: 375 }}>
            <CardMedia 
                sx={{ height: 350, objectFit: "contain" }}
                image={product.thumbnail}
                title={product.title}
            />
            <CardContent sx={{p: 1}}>
                <Box sx={{display: "flex", justifyContent: "space-between", alignItems: "center"}}>
                    <Typography gutterBottom variant="h6" component="div">
                        {toSentenceCase(product.title)}
                    </Typography>
                    <Typography gutterBottom style={styles} >
                        ⭐ {product.rating}
                    </Typography>
                </Box>
                <Box sx={{display: "flex", justifyContent: "center"}}>
                <Typography gutterBottom variant="h5" component="div">
                    <span className="last-price">$150.00</span> {`$${product.price}.00`}
                </Typography>
               </Box>
               <h4>Category:</h4>
                <Typography mb={2} variant="body2" color="text.secondary">
                    {toSentenceCase(product.category)}
                </Typography>

                <h4>Description:</h4>
                <Typography variant="body2" color="text.secondary">
                    {product.description}
                </Typography>
            </CardContent>
            <CardActions sx={{display: "flex", justifyContent: "space-between", px: 2}}>
                <IconButton aria-label="edit"  color="secondary" onClick={() => {navigate(`/products/edit/${product.id}`)}}>
                    <Edit />
                </IconButton>
                <IconButton aria-label="delete"  color="error" onClick={() => {deleteProduct(product.id)}}>
                    <Delete />
                </IconButton>
            </CardActions>
    </Card>
    )
}

export default Product;
