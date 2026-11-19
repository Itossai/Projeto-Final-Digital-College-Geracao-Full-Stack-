import { useState } from "react";
import arrowLeft from "../assets/icons/arrow-left.svg";
import arrowRight from "../assets/icons/arrow-right.svg";

const Gallery = ({ className, images = [], showThumbs = false }) => {
    const [activeIndex, setActiveIndex] = useState(0);
    const currentIndex = Math.min(activeIndex, Math.max(images.length - 1, 0));
    const hasImages = images.length > 0;

    return (
        <div className={className}>
            <button
                type="button"
                aria-label="Imagem anterior"
                disabled={!hasImages || currentIndex === 0}
                onClick={() => setActiveIndex(currentIndex - 1)}
            >
                <img src={arrowLeft} alt="" />
            </button>

            {hasImages && (
                <img
                    src={images[currentIndex].src}
                    alt={`Imagem ${currentIndex + 1} de ${images.length}`}
                />
            )}

            <button
                type="button"
                aria-label="Próxima imagem"
                disabled={!hasImages || currentIndex === images.length - 1}
                onClick={() => setActiveIndex(currentIndex + 1)}
            >
                <img src={arrowRight} alt="" />
            </button>

            {showThumbs && hasImages && (
                <div>
                    {images.map((image, index) => (
                        <button
                            key={`${image.src}-${index}`}
                            type="button"
                            aria-label={`Exibir imagem ${index + 1}`}
                            aria-pressed={index === currentIndex}
                            onClick={() => setActiveIndex(index)}
                        >
                            <img src={image.src} alt="" />
                        </button>
                    ))}
                </div>
            )}
        </div>
    );
};

export default Gallery;
