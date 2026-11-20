import headerLogo from "../assets/icons/logo-header.svg";
import footerLogo from "../assets/icons/logo-footer.svg";

const Logo = ({ variant = "header" }) => {
    const logoSource = variant === "footer" ? footerLogo : headerLogo;

    return (
        <img
            src={logoSource}
            alt="Digital Store"
            width={253}
            height={44}
            className="block"
            style={{
                width: "253px",
                height: "auto",
                maxWidth: "100%",
                objectFit: "contain",
            }}
        />
    );
};

export default Logo;