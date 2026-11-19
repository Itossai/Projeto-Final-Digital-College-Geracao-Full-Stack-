import { Link } from "react-router-dom";
import ProductCard from "./ProductCard";

const ProductListing = ({ products }) => {
    return (
        <div>
            {products.map((product) => (
                <Link
                    key={`${product.image}-${product.name}`}
                    to={`/product/${product.id}`}
                >
                    <ProductCard {...product} />
                </Link>
            ))}
        </div>
    );
};

export default ProductListing;