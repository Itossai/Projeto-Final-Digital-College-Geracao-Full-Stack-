import ProductCard from "./ProductCard";

const ProductListing = ({ products }) => {
    return (
        <div>
            {products.map((product) => (
                <ProductCard
                    key={`${product.image}-${product.name}`}
                    {...product}
                />
            ))}
        </div>
    );
};

export default ProductListing;