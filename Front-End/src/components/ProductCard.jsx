const ProductCard = ({ image, imagem, link, name, price, priceDiscount }) => {
    const imageSrc = image ?? imagem ?? link;
    const hasDiscount = priceDiscount != null;

    return (
        <div>
            <img src={imageSrc} alt={name} width={292} height={321} />
            <h3>{name}</h3>
            {hasDiscount ? (
                <>
                    <del>{price}</del>
                    <h2>{priceDiscount}</h2>
                </>
            ) : (
                <h2>{price}</h2>
            )}
        </div>
    );
};

export default ProductCard;
