import { useState } from "react";
import arrowLeft from "../assets/icons/arrow-left.svg";
import arrowRight from "../assets/icons/arrow-right.svg";

const toCssSize = (value) => {
    if (value == null) {
        return undefined;
    }

    return /^\d+(\.\d+)?$/.test(String(value)) ? `${value}px` : value;
};

const Gallery = ({
    className,
    width,
    height,
    radius,
    images = [],
    showThumbs = false,
}) => {
    const [activeIndex, setActiveIndex] = useState(0);
    const currentIndex = Math.min(activeIndex, Math.max(images.length - 1, 0));
    const hasImages = images.length > 0;
    const rootClassName = ["flex flex-column gap-3", className]
        .filter(Boolean)
        .join(" ");

    return (
        <div
            className={rootClassName}
            style={{ width: toCssSize(width), maxWidth: "100%" }}
        >
            <div
                className="relative w-full overflow-hidden"
                style={{ height: toCssSize(height), borderRadius: radius }}
            >
                {hasImages && (
                    <div
                        className="flex h-full"
                        style={{
                            width: `${images.length * 100}%`,
                            transform: `translateX(-${(currentIndex * 100) / images.length}%)`,
                            transition: "transform 400ms ease-in-out",
                        }}
                    >
                        {images.map((image, index) => (
                            <div
                                key={`${image.src}-${index}`}
                                className="flex-shrink-0 w-full h-full"
                                aria-hidden={index !== currentIndex}
                                style={{
                                    flex: `0 0 ${100 / images.length}%`,
                                }}
                            >
                                <img
                                    className="block w-full h-full"
                                    src={image.src}
                                    alt={`Imagem ${index + 1} de ${images.length}`}
                                    style={{
                                        objectFit: "cover",
                                        borderRadius: radius,
                                    }}
                                />
                            </div>
                        ))}
                    </div>
                )}

                <button
                    type="button"
                    aria-label="Imagem anterior"
                    disabled={!hasImages || currentIndex === 0}
                    onClick={() => setActiveIndex(currentIndex - 1)}
                    className="absolute border-none border-circle flex align-items-center justify-content-center"
                    style={{
                        top: "50%",
                        left: "1rem",
                        transform: "translateY(-50%)",
                        width: "40px",
                        height: "40px",
                        backgroundColor: "rgba(255, 255, 255, 0.85)",
                        opacity: !hasImages || currentIndex === 0 ? 0.5 : 1,
                        cursor:
                            !hasImages || currentIndex === 0
                                ? "not-allowed"
                                : "pointer",
                    }}
                >
                    <img src={arrowLeft} alt="" />
                </button>

                <button
                    type="button"
                    aria-label="Próxima imagem"
                    disabled={!hasImages || currentIndex === images.length - 1}
                    onClick={() => setActiveIndex(currentIndex + 1)}
                    className="absolute border-none border-circle flex align-items-center justify-content-center"
                    style={{
                        top: "50%",
                        right: "1rem",
                        transform: "translateY(-50%)",
                        width: "40px",
                        height: "40px",
                        backgroundColor: "rgba(255, 255, 255, 0.85)",
                        opacity:
                            !hasImages || currentIndex === images.length - 1
                                ? 0.5
                                : 1,
                        cursor:
                            !hasImages || currentIndex === images.length - 1
                                ? "not-allowed"
                                : "pointer",
                    }}
                >
                    <img src={arrowRight} alt="" />
                </button>
            </div>

            {showThumbs && hasImages && (
                <div className="flex flex-wrap justify-content-center gap-2">
                    {images.map((image, index) => (
                        <button
                            key={`${image.src}-${index}`}
                            type="button"
                            aria-label={`Exibir imagem ${index + 1}`}
                            aria-pressed={index === currentIndex}
                            onClick={() => setActiveIndex(index)}
                            className="flex-shrink-0 p-0 overflow-hidden"
                            style={{
                                width: "117px",
                                height: "95px",
                                border: `2px solid ${index === currentIndex ? "var(--primary)" : "transparent"}`,
                                borderRadius: radius,
                                backgroundColor: "transparent",
                                cursor: "pointer",
                                boxSizing: "border-box",
                            }}
                        >
                            <img
                                className="block w-full h-full"
                                src={image.src}
                                alt=""
                                style={{
                                    objectFit: "cover",
                                    borderRadius: radius,
                                }}
                            />
                        </button>
                    ))}
                </div>
            )}
        </div>
    );
};

export default Gallery;
