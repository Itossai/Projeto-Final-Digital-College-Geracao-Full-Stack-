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
        <section className="flex flex-column" style={{ maxWidth: "440px" }}>
            <header className="mb-3">
                <h1
                    className="m-0 mb-2"
                    style={{
                        color: "var(--dark-gray)",
                        fontSize: "32px",
                    }}
                >
                    {name}
                </h1>
                <p
                    className="m-0"
                    style={{
                        color: "var(--dark-gray-3)",
                        fontSize: "12px",
                    }}
                >
                    Referência: {reference}
                </p>
            </header>

            <div className="flex align-items-center gap-2 mb-3">
                <div
                    className="flex align-items-center gap-1 px-2 py-1"
                    style={{
                        borderRadius: "4px",
                        backgroundColor: "var(--warning)",
                        color: "var(--white)",
                        fontSize: "14px",
                    }}
                >
                    <span>{stars}</span>
                    <img
                        src={starIcon}
                        alt=""
                        style={{ width: "12px", height: "12px" }}
                    />
                </div>
                <span
                    style={{
                        color: "var(--light-gray)",
                        fontSize: "14px",
                    }}
                >
                    {rating}
                </span>
            </div>

            <div className="flex align-items-center gap-3 mb-3">
                {hasDiscount ? (
                    <>
                        <del
                            style={{
                                color: "var(--light-gray-2)",
                                fontSize: "16px",
                            }}
                        >
                            {price}
                        </del>
                        <span
                            style={{
                                color: "var(--dark-gray-2)",
                                fontSize: "32px",
                            }}
                        >
                            {priceDiscount}
                        </span>
                    </>
                ) : (
                    <span
                        style={{
                            color: "var(--dark-gray-2)",
                            fontSize: "32px",
                        }}
                    >
                        {price}
                    </span>
                )}
            </div>

            <p
                className="mb-4"
                style={{
                    color: "var(--dark-gray-2)",
                    fontSize: "14px",
                    lineHeight: "1.5",
                }}
            >
                {description}
            </p>

            {children}

            <button
                type="button"
                className="mt-4 border-none cursor-pointer"
                style={{
                    width: "200px",
                    height: "48px",
                    borderRadius: "4px",
                    backgroundColor: "var(--warning)",
                    color: "var(--white)",
                    fontSize: "16px",
                }}
            >
                Comprar
            </button>
        </section>
    );
};

export default BuyBox;
