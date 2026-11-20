import { Link } from "react-router-dom";

const FooterInformation = ({
    title,
    informations,
    className = "col-12 md:col-6 lg:col-2",
}) => {
    return (
        <section className={className}>
            <h2 className="text-white text-lg font-bold mt-0 mb-3">{title}</h2>
            <ul className="flex flex-column gap-2 list-none p-0 m-0">
                {informations.map(({ text, link }) => (
                    <li
                        key={`${text}-${link}`}
                        className="text-white text-sm line-height-3"
                    >
                        {link.startsWith("tel:") ? (
                            <a href={link} className="text-white no-underline">
                                {text}
                            </a>
                        ) : (
                            <Link
                                to={link}
                                className="text-white no-underline"
                            >
                                {text}
                            </Link>
                        )}
                    </li>
                ))}
            </ul>
        </section>
    );
};

export default FooterInformation;
