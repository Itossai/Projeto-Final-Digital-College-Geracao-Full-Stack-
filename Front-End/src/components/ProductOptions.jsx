import { useState } from "react";

const ProductOptions = ({ options = [], radius, shape, type }) => {
    const [selectedIndex, setSelectedIndex] = useState(null);

    return (
        <div data-shape={shape} data-type={type} data-radius={radius}>
            {options.map((option, index) => (
                <button
                    key={`${option}-${index}`}
                    type="button"
                    aria-label={type === "color" ? `Cor ${option}` : undefined}
                    aria-pressed={selectedIndex === index}
                    onClick={() => setSelectedIndex(index)}
                >
                    {option}
                </button>
            ))}
        </div>
    );
};

export default ProductOptions;