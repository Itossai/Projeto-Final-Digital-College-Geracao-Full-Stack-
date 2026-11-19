import starIcon from "../assets/icons/star-icon.svg";

const BuyBox = ({
    name,
    reference,
    stars,
    rating,
    price,
    priceDiscount,
    description,
    children,
}) => {
    const hasDiscount = priceDiscount != null;

    return (
        <section>
            <header>
                <h1>{name}</h1>
                <p>Referência: {reference}</p>
            </header>

            <div>
                <div>
                    <span>{stars}</span>
                    <img src={starIcon} alt="estrela" />
                </div>
                <span>{rating}</span>
            </div>

            <div>
                {hasDiscount ? (
                    <>
                        <del>{price}</del>
                        <span>{priceDiscount}</span>
                    </>
                ) : (
                    <span>{price}</span>
                )}
            </div>

            <p>{description}</p>

            {children}

            <button type="button">Comprar</button>
        </section>
    );
};

export default BuyBox;
