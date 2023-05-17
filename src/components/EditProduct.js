import { Box, Button, TextField } from "@mui/material";
import {useFormik} from "formik";
import {useContext, useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import * as Yup from "yup";
import api from "../api/ProductManagement";
import ProductContext from "../context/ProductContext";

const productValidationSchema = Yup.object({
  title: Yup.string()
    .required("Why not fill this product name? 😊"),
  description: Yup.string()
    .required("Why not fill this description? 😊")
    .min(20, "Need a bigger description 🙂"),
  price: Yup.number()
    .required("Why not fill this product price? 😊")
    .min(1, "Price must be greater than or equal to 1"),
  rating: Yup.number()
    .required("Why not fill this product rating? 😊")
    .min(0, "Rating must be greater than or equal to 0")
    .max(5, "Rating must be less than or equal to 5"),
  category: Yup.string()
    .required("Why not fill this product category? 😊")
    .min(4, "Category must be at least 4 characters"),
  thumbnail: Yup.string()
    .required("Why not fill this thumbnail? 😊")
    .min(4, "Need a bigger thumbnail 🙂")
});

function EditProduct() {
  const {id} = useParams();
  const [product, setProduct] = useState({});
  const {updateProduct} = useContext(ProductContext);
  const navigate = useNavigate();

  //Geting the perticular product for Edit
  useEffect(() => {
    editProduct(id);
  },[id]);

  //Edit Product
  const editProduct = async (id) => {
      const response = await api.get(`/products/${id}`);
      setProduct(response.data);
  }

  const formik = useFormik({
    enableReinitialize: true,
    initialValues: {
      title: product.title || "",
      description: product.description || "",
      price: product.price || "",
      rating: product.rating || "",
      category: product.category || "",
      thumbnail: product.thumbnail || "",
    },
    validationSchema: productValidationSchema,
    onSubmit: (values) => {
      console.log(values)
      updateProduct(id, values);
      navigate("/products");
    }
  });


  return (
    <Box sx={{display: "flex", justifyContent: "center", py:5}}>
      <form onSubmit={formik.handleSubmit}>
        <TextField
          sx={{ width: 500, mb: 2 }}
          name="title"
          label="Product Name"
          variant="filled"
          value={formik.values.title}
          onChange={formik.handleChange}
          onBlur={formik.handleBlur}
          error={(formik.touched.title && formik.errors.title) ? true : false}
          helperText={(formik.touched.title && formik.errors.title) ? formik.errors.title : null}
        />
        <br />

        <TextField
          sx={{ width: 500, mb: 2 }}
          name="rating"
          label="Rating"
          variant="filled"
          value={formik.values.rating}
          onChange={formik.handleChange}
                  onBlur={formik.handleBlur}
          error={(formik.touched.rating && formik.errors.rating) ? true : false}
          helperText={(formik.touched.rating && formik.errors.rating) ? formik.errors.rating : null}
        />
        <br />

        <TextField
          sx={{ width: 500, mb: 2 }}
          name="price"
          label="Price"
          variant="filled"
          value={formik.values.price}
          onChange={formik.handleChange}
          onBlur={formik.handleBlur}
          error={(formik.touched.price && formik.errors.price) ? true : false}
          helperText={(formik.touched.price && formik.errors.price) ? formik.errors.price : null}
        />
        <br />

        <TextField
          sx={{ width: 500, mb: 2 }}
          name="category"
          label="Category"
          variant="filled"
          value={formik.values.category}
          onChange={formik.handleChange}
          onBlur={formik.handleBlur}
          error={(formik.touched.category && formik.errors.category) ? true : false}
          helperText={(formik.touched.category && formik.errors.category) ? formik.errors.category : null}
        />
        <br />

        <TextField
          sx={{ width: 500, mb: 2 }}
          name="description"
          label="Description"
          variant="filled"
          value={formik.values.description}
          onChange={formik.handleChange}
          onBlur={formik.handleBlur}
          error={(formik.touched.description && formik.errors.description) ? true : false}
          helperText={(formik.touched.description && formik.errors.description) ? formik.errors.description : null}
        />
        <br />

        <TextField
          sx={{ width: 500, mb: 2 }}
          name="thumbnail"
          label="Product Image"
          variant="filled"
          value={formik.values.thumbnail}
          onChange={formik.handleChange}
          onBlur={formik.handleBlur}
          error={(formik.touched.thumbnail && formik.errors.thumbnail) ? true : false}
          helperText={(formik.touched.thumbnail && formik.errors.thumbnail) ? formik.errors.thumbnail : null}
        />
        <br />

        <Box sx={{ display: "flex", justifyContent: "center" }}>
          <Button type="submit" variant="outlined" sx={{ mb: 3 }}>
            EDIT Product
          </Button>
        </Box>
      </form>
    </Box>
  );
}

export default EditProduct;
