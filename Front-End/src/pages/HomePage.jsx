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
import productThumb1 from "../assets/images/product-thumb-1.jpeg";
import productThumb2 from "../assets/images/product-thumb-2.jpeg";
import productThumb3 from "../assets/images/product-thumb-3.jpeg";
import productThumb4 from "../assets/images/product-thumb-4.jpeg";
import productThumb5 from "../assets/images/product-thumb-5.jpeg";
import productImage1 from "../assets/images/produc-image-1.jpeg";
import productImage2 from "../assets/images/produc-image-2.jpeg";
import productImage3 from "../assets/images/produc-image-3.jpeg";

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

const products = [
    { name: "Produto 1", image: productThumb1, price: 200, priceDiscount: 149.9 },
    { name: "Produto 2", image: productThumb2, price: 49.9 },
    { name: "Produto 3", image: productThumb3, price: 200, priceDiscount: 149.9 },
    { name: "Produto 4", image: productThumb4, price: 89.9 },
    { name: "Produto 5", image: productThumb5, price: 300, priceDiscount: 219.9 },
    { name: "Produto 6", image: productImage1, price: 150 },
    { name: "Produto 7", image: productImage2, price: 250, priceDiscount: 199.9 },
    { name: "Produto 8", image: productImage3, price: 100 },
];

const HomePage = () => {
    return (
        <Layout>
            <main>
                <Gallery images={galleryImages} width="1440" height="681" />

                <Section title="Coleções em destaque" titleAlign="center">
                    <img src={collection1} alt="Coleção em destaque 1" />
                    <img src={collection2} alt="Coleção em destaque 2" />
                    <img src={collection3} alt="Coleção em destaque 3" />
                </Section>

                <Section title="Produtos em alta" titleAlign="left">
                    <ProductListing products={products} />
                </Section>
            </main>
        </Layout>
    );
};

export default HomePage;
