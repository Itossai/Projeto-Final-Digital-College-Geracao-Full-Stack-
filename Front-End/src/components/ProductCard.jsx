const ProductCard = ({ image, imagem, link, name, price, priceDiscount }) => {
    const imageSrc = image ?? imagem ?? link;
    const hasDiscount = priceDiscount != null;

    return (
        <div className="flex flex-column">
            <img
                className="block"
                src={imageSrc}
                alt={name}
                width={292}
                height={321}
            />
            <h3 className="mt-2 mb-1">{name}</h3>
            {hasDiscount ? (
                <div className="flex align-items-center gap-2">
                    <del style={{ color: "var(--light-gray)" }}>{price}</del>
                    <h2
                        className="m-0"
                        style={{
                            color: "var(--dark-gray)",
                            fontSize: "24px",
                        }}
                    >
                        {priceDiscount}
                    </h2>
                </div>
            ) : (
                <h2
                    className="m-0"
                    style={{
                        color: "var(--dark-gray)",
                        fontSize: "24px",
                    }}
                >
                    {price}
                </h2>
            )}
        </div>
    );
};

export default ProductCard;
