import { createContext, useEffect, useState } from "react";
import api from "../api/ProductManagement";



//Initializing context
const ProductContext = createContext();

//Creating Context Provider

export const ProductProvider = ({children}) => {
    const [products, setProducts] = useState([]);

    //useEffect() - Fetch the products once
    useEffect(() => {
        fetchProducts();
    }, []);

    //Fetching products from mockapi sever using axios
    const fetchProducts = async () => {
        try {
            const response = await api.get("/products");
            setProducts(response.data);
        } catch (error) {
            console.log(`Error: ${error}`);
        }

    }

    //Add Product
    const addProduct = async (newProduct) => {
        try {
            const response = await api.post("/products", newProduct);
            console.log(response.data);
            setProducts([...products, response.data]);
        } catch (error) {
            console.log(`Error: ${error}`);
        }
    }

    //Update Product
    const updateProduct = async (id, updateProduct) => {
        try {
            const response = await api.put(`/products/${id}`, updateProduct);
            setProducts(products.map((product) => {
                return (product.id === id) ? {...product, ...response.data} : product;
            }));
        } catch (error) {
            console.log(error);
        }
    }

    //Delete Product
    const deleteProduct = async (id) => {
        try {
            if(window.confirm("Are you sure you want to delete this Product ?")) {
                await api.delete(`/products/${id}`);
                setProducts(products.filter((product) => {
                    return product.id !== id;
                }));
            }
        } catch (error) {
            console.log(`Error: ${error}`);
        }
    }

    return(
        <ProductContext.Provider value={{
            products,
            addProduct,
            updateProduct,
            deleteProduct
        }}>
            {children}
        </ProductContext.Provider>
    );
}

export default ProductContext;