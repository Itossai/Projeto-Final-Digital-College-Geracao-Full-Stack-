import { Link } from "react-router-dom";
import ProductCard from "./ProductCard";

const ProductListing = ({ products }) => {
    return (
        <div className="flex flex-wrap justify-content-center align-items-start gap-4">
            {products.map((product) => (
                <Link
                    key={`${product.image}-${product.name}`}
                    to={`/product/${product.id}`}
                    className="no-underline"
                    style={{ color: "inherit" }}
                >
                    <ProductCard {...product} />
                </Link>
            ))}
        </div>
    );
};

export default ProductListing;