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
