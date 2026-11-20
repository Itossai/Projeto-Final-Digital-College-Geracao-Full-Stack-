import { Link } from "react-router-dom";
import facebookIcon from "../assets/icons/facebook.svg";
import instagramIcon from "../assets/icons/instagram.svg";
import twitterIcon from "../assets/icons/twitter.svg";
import FooterInformation from "./FooterInformation";
import Logo from "./Logo";

const footerInformation = [
    {
        title: "Informação",
        informations: [
            { text: "Sobre Drip Store", link: "/about" },
            { text: "Segurança", link: "/security" },
            { text: "Wishlist", link: "/wishlist" },
            { text: "Blog", link: "/blog" },
            { text: "Trabalhe Conosco", link: "/careers" },
            { text: "Meus Pedidos", link: "/orders" },
        ],
    },
    {
        title: "Categorias",
        informations: [
            { text: "Camisetas", link: "/categories/t-shirts" },
            { text: "Calças", link: "/categories/pants" },
            { text: "Bonés", link: "/categories/caps" },
            { text: "Headphones", link: "/categories/headphones" },
            { text: "Tênis", link: "/categories/shoes" },
        ],
    },
];

const socialLinks = [
    {
        label: "Facebook",
        href: "https://www.facebook.com/",
        icon: facebookIcon,
    },
    {
        label: "Instagram",
        href: "https://www.instagram.com/",
        icon: instagramIcon,
    },
    { label: "X", href: "https://x.com/", icon: twitterIcon },
];

const Footer = () => {
    return (
        <footer
            className="text-white px-3 pt-6 pb-4"
            style={{ backgroundColor: "var(--dark-gray)" }}
        >
            <div
                className="grid mx-auto"
                style={{ maxWidth: "1200px", marginBottom: "40px" }}
            >
                <section className="col-12 md:col-6 lg:col-4">
                    <Link
                        to="/"
                        className="inline-flex no-underline"
                        aria-label="Digital Store - início"
                    >
                        <Logo variant="footer" />
                    </Link>
                    <p
                        className="text-white text-sm line-height-3 mt-4 mb-4"
                        style={{ maxWidth: "360px" }}
                    >
                        Lorem ipsum dolor sit amet, consectetur adipiscing
                        elit. Suspendisse varius enim in eros elementum
                        tristique. Duis cursus, mi quis viverra ornare, eros
                        dolor interdum nulla.
                    </p>
                    <ul className="flex align-items-center gap-4 list-none p-0 m-0">
                        {socialLinks.map(({ label, href, icon }) => (
                            <li key={label}>
                                <a
                                    href={href}
                                    target="_blank"
                                    rel="noreferrer"
                                    aria-label={label}
                                    className="inline-flex align-items-center justify-content-center"
                                >
                                    <img
                                        src={icon}
                                        alt=""
                                        width="23"
                                        height="21"
                                    />
                                </a>
                            </li>
                        ))}
                    </ul>
                </section>

                {footerInformation.map(({ title, informations }) => (
                    <FooterInformation
                        key={title}
                        title={title}
                        informations={informations}
                        className="col-12 md:col-6 lg:col-2"
                    />
                ))}

                <FooterInformation
                    title="Contato"
                    className="col-12 md:col-6 lg:col-4"
                    informations={[
                        {
                            text: "Av. Santos Dumont, 1510 - 1º andar - Aldeota, Fortaleza - CE, 60150-161",
                            link: "/contact",
                        },
                        { text: "(85) 3051-3411", link: "tel:+558530513411" },
                    ]}
                />
            </div>

            <hr
                className="mx-auto mb-4"
                style={{
                    maxWidth: "1200px",
                    border: 0,
                    borderTop: "1px solid rgb(255 255 255 / 30%)",
                }}
            />
            <p className="text-center text-white text-sm m-0">
                © 2024 Digital Store
            </p>
        </footer>
    );
};

export default Footer;