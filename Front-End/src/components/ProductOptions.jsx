import { useState } from "react";

const ProductOptions = ({ options = [], radius, shape, type }) => {
    const [selectedIndex, setSelectedIndex] = useState(null);

    return (
        <div
            className="flex flex-wrap align-items-center gap-3"
            data-shape={shape}
            data-type={type}
            data-radius={radius}
        >
            {options.map((option, index) => (
                <button
                    key={`${option}-${index}`}
                    type="button"
                    aria-label={type === "color" ? `Cor ${option}` : undefined}
                    aria-pressed={selectedIndex === index}
                    onClick={() => setSelectedIndex(index)}
                    className={
                        shape === "circle"
                            ? "border-circle flex align-items-center justify-content-center p-0"
                            : "flex align-items-center justify-content-center p-0"
                    }
                    style={{
                        width: shape === "circle" ? "31px" : "46px",
                        height: shape === "circle" ? "31px" : "46px",
                        border:
                            selectedIndex === index
                                ? "2px solid var(--primary)"
                                : "1px solid var(--light-gray-2)",
                        borderRadius:
                            shape === "circle"
                                ? "50%"
                                : radius ?? "4px",
                        backgroundColor:
                            type === "color" ? option : "var(--white)",
                        color:
                            type === "text"
                                ? "var(--dark-gray-2)"
                                : "transparent",
                        fontSize: type === "text" ? "24px" : "0",
                        cursor: "pointer",
                    }}
                >
                    {type === "text" ? option : ""}
                </button>
            ))}
        </div>
    );
};

export default ProductOptions;