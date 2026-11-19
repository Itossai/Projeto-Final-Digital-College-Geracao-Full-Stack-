import BuyBox from "../components/BuyBox";
import Gallery from "../components/Gallery";
import Layout from "../components/Layout";
import ProductListing from "../components/ProductListing";
import ProductOptions from "../components/ProductOptions";
import Section from "../components/Section";
import productImage1 from "../assets/images/produc-image-1.jpeg";
import productImage2 from "../assets/images/produc-image-2.jpeg";
import productImage3 from "../assets/images/produc-image-3.jpeg";
import productImage4 from "../assets/images/produc-image-4.jpeg";
import productImage5 from "../assets/images/produc-image-5.jpeg";
import products from "../data/products";

const productImages = [
    { src: productImage1 },
    { src: productImage2 },
    { src: productImage3 },
    { src: productImage4 },
    { src: productImage5 },
];

const recommendedProducts = products.slice(0, 2);

const ProductViewPage = () => {
    return (
        <Layout>
            <main>
                <section>
                    <Gallery
                        images={productImages}
                        showThumbs
                        width="700px"
                        height="570px"
                        radius="4px"
                    />

                    <BuyBox
                        name={products[0].name}
                        reference="123456789"
                        stars="4.7"
                        rating="90 avaliações"
                        price={products[0].price}
                        priceDiscount={products[0].priceDiscount}
                        description="Descrição detalhada do produto."
                    >
                        <section>
                            <h2>Tamanho</h2>
                            <ProductOptions
                                options={["39", "40", "41", "42"]}
                                radius="4px"
                                shape="square"
                                type="text"
                            />
                        </section>
                        <section>
                            <h2>Cor</h2>
                            <ProductOptions
                                options={["#000", "#111", "#222"]}
                                shape="circle"
                                type="color"
                            />
                        </section>
                    </BuyBox>
                </section>

                <Section
                    title="Produtos recomendados"
                    titleAlign="left"
                    link={{ text: "Ver todos", href: "/products" }}
                >
                    <ProductListing products={recommendedProducts} />
                </Section>
            </main>
        </Layout>
    );
};

export default ProductViewPage;