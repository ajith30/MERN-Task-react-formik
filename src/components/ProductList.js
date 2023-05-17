import { useContext } from "react"
import ProductContext from "../context/ProductContext"
import Product from "./Product";


function ProductList() {
    const {products} = useContext(ProductContext);
    
    return (
        <div className="product__container">
            {products.map((product) => {
                return <Product key={product.id} product={product} />
            })}
        </div>
    )
}

export default ProductList;
