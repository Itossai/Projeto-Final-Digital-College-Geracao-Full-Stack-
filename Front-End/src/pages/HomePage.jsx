import Gallery from "../components/Gallery";
import Layout from "../components/Layout";
import ProductListing from "../components/ProductListing";
import Section from "../components/Section";
import collection1 from "../assets/images/collection-1.png";
import collection2 from "../assets/images/collection-2.png";
import collection3 from "../assets/images/collection-3.png";
import homeSlide1 from "../assets/images/home-slide-1.jpeg";
import homeSlide2 from "../assets/images/home-slide-2.jpeg";
import homeSlide3 from "../assets/images/home-slide-3.jpeg";
import homeSlide4 from "../assets/images/home-slide-4.jpeg";
import homeSlide5 from "../assets/images/home-slide-5.jpeg";
import homeSlide6 from "../assets/images/home-slide-6.jpeg";
import homeSlide7 from "../assets/images/home-slide-7.jpeg";
import homeSlide8 from "../assets/images/home-slide-8.jpeg";
import specialOfferImage from "../assets/images/produc-image-1.jpeg";
import products from "../data/products";

const galleryImages = [
    { src: homeSlide1 },
    { src: homeSlide2 },
    { src: homeSlide3 },
    { src: homeSlide4 },
    { src: homeSlide5 },
    { src: homeSlide6 },
    { src: homeSlide7 },
    { src: homeSlide8 },
];

const categories = [
    { label: "Camisetas", icon: "shirt" },
    { label: "Calças", icon: "pi pi-tags" },
    { label: "Bonés", icon: "pi pi-tag" },
    { label: "Headphones", icon: "pi pi-headphones" },
    { label: "Tênis", icon: "pi pi-thumbs-up" },
];

const HomePage = () => {
    return (
        <Layout>
            <main
                className="flex flex-column"
                style={{ backgroundColor: "var(--light-gray-3)" }}
            >
                <Gallery
                    className="home-gallery mx-auto"
                    images={galleryImages}
                    width="1440px"
                    height="681px"
                />

                <div
                    className="mx-auto px-3 md:px-5 lg:px-7 py-5"
                    style={{ width: "100%", maxWidth: "1440px" }}
                >
                    <Section title="Coleções em destaque" titleAlign="left">
                        <div className="flex flex-column md:flex-row gap-3 mt-3">
                            {[collection1, collection2, collection3].map(
                                (collection, index) => (
                                    <div
                                        key={collection}
                                        className="w-full md:w-4"
                                        style={{
                                            flex: "1 1 0",
                                            minWidth: 0,
                                        }}
                                    >
                                        <div
                                            className="relative overflow-hidden border-round-sm"
                                            style={{
                                                height: "220px",
                                                backgroundColor: "var(--white)",
                                            }}
                                        >
                                            <img
                                                className="block w-full h-full"
                                                src={collection}
                                                alt={`Coleção em destaque ${index + 1}`}
                                                style={{
                                                    position: "absolute",
                                                    inset: 0,
                                                    objectFit: "cover",
                                                    objectPosition: "center",
                                                    borderRadius: "4px",
                                                }}
                                            />
                                            <div
                                                className="absolute flex flex-column align-items-start"
                                                style={{
                                                    top: 0,
                                                    left: 0,
                                                    zIndex: 1,
                                                    width: "56%",
                                                    height: "100%",
                                                    padding: "10px",
                                                }}
                                            >
                                                <span
                                                    className="mb-2 px-2 py-1 border-round-xl"
                                                    style={{
                                                        backgroundColor: "#E7FF86",
                                                        color: "var(--dark-gray)",
                                                        fontSize: "12px",
                                                        lineHeight: 1,
                                                        position: "absolute",
                                                        top: "5px",
                                                        left: "20px",
                                                    }}
                                                >
                                                    30% OFF
                                                </span>

                                                

                                                <button
                                                    type="button"
                                                    className="border-none border-round-sm px-4 py-2"
                                                    style={{
                                                        backgroundColor: "var(--white)",
                                                        color: "var(--primary)",
                                                        fontWeight: "700",
                                                        position: "absolute",
                                                        left: "20px",
                                                        bottom: "20px",
                                                    }}
                                                >
                                                    Comprar
                                                </button>
                                            </div>
                                        </div>
                                    </div>
                                ),
                            )}
                        </div>
                    </Section>

                    <Section title="Coleções em destaque" titleAlign="center">
                        <div className="flex flex-wrap justify-content-center gap-5 mt-4">
                            {categories.map(({ label, icon }) => (
                                <div
                                    key={label}
                                    className="flex flex-column align-items-center gap-2"
                                    style={{ minWidth: "92px" }}
                                >
                                    <div
                                        className="flex align-items-center justify-content-center border-circle"
                                        style={{
                                            width: "92px",
                                            height: "92px",
                                            backgroundColor: "var(--white)",
                                            color: "#B5B6B8",
                                            boxShadow:
                                                "0 4px 18px rgba(31, 31, 31, 0.08)",
                                        }}
                                    >
                                        {icon === "shirt" ? (
                                            <svg
                                                width="38"
                                                height="38"
                                                viewBox="0 0 24 24"
                                                fill="none"
                                                stroke="currentColor"
                                                strokeWidth="1.5"
                                                strokeLinecap="round"
                                                strokeLinejoin="round"
                                                aria-hidden="true"
                                            >
                                                <path d="M8 3 4 5l-2 5 4 2 2-3v9h8v-9l2 3 4-2-2-5-4-2c-.7 1.2-1.9 2-4 2s-3.3-.8-4-2Z" />
                                            </svg>
                                        ) : (
                                            <i
                                                className={icon}
                                                style={{ fontSize: "32px" }}
                                                aria-hidden="true"
                                            />
                                        )}
                                    </div>
                                    <span
                                        style={{
                                            color: "var(--dark-gray-2)",
                                            fontSize: "14px",
                                        }}
                                    >
                                        {label}
                                    </span>
                                </div>
                            ))}
                        </div>
                    </Section>

                    <Section title="Produtos em alta" titleAlign="left">
                        <ProductListing products={products} />
                    </Section>

                    <Section title="" titleAlign="left">
                        <div
                            className="flex flex-column md:flex-row align-items-center gap-5 mt-6 p-5 border-round-sm"
                            style={{ backgroundColor: "var(--white)" }}
                        >
                            <div
                                className="flex align-items-center justify-content-center"
                                style={{ flex: "1 1 45%" }}
                            >
                                <img
                                    src={specialOfferImage}
                                    alt="Air Jordan edição de colecionador"
                                    className="block w-full"
                                    style={{
                                        maxHeight: "420px",
                                        objectFit: "contain",
                                    }}
                                />
                            </div>
                            <div style={{ flex: "1 1 55%" }}>
                                <span
                                    className="block mb-2"
                                    style={{
                                        color: "var(--primary)",
                                        fontSize: "14px",
                                        fontWeight: "700",
                                    }}
                                >
                                    Oferta especial
                                </span>
                                <h2
                                    className="m-0 mb-3"
                                    style={{
                                        maxWidth: "620px",
                                        color: "var(--dark-gray)",
                                        fontSize: "36px",
                                    }}
                                >
                                    Air Jordan edição de colecionador
                                </h2>
                                <p
                                    className="mb-4"
                                    style={{
                                        maxWidth: "620px",
                                        color: "var(--dark-gray-2)",
                                        lineHeight: "1.6",
                                    }}
                                >
                                    Lorem ipsum dolor sit amet, consectetur adipiscing
                                    elit, sed do eiusmod tempor incididunt ut labore
                                    et dolore magna aliqua.
                                </p>
                                <button
                                    type="button"
                                    className="border-none border-round-sm px-5 py-3"
                                    style={{
                                        backgroundColor: "var(--primary)",
                                        color: "var(--white)",
                                        fontWeight: "700",
                                    }}
                                >
                                    Ver oferta
                                </button>
                            </div>
                        </div>
                    </Section>
                </div>
            </main>
        </Layout>
    );
};

export default HomePage;
