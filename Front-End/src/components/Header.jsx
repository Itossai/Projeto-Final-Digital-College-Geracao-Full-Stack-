import { useState } from "react";
import { Button } from "primereact/button";
import { InputText } from "primereact/inputtext";
import { Link, NavLink, useNavigate } from "react-router-dom";
import cartIcon from "../assets/icons/mini-cart.svg";
import Logo from "./Logo";

const Header = () => {
    const [searchQuery, setSearchQuery] = useState("");
    const navigate = useNavigate();

    const handleSearch = (event) => {
        event.preventDefault();
        const filter = searchQuery.trim();
        navigate(`/products?filter=${encodeURIComponent(filter)}`);
    };

    const navigationItems = [
        { label: "Home", to: "/", end: true },
        { label: "Produtos", to: "/products", end: true },
        { label: "Categorias", to: "/categories" },
        { label: "Meus Pedidos", to: "/orders" },
    ];

    return (
        <header className="surface-0 px-3 pt-4">
            <div
                className="flex flex-column gap-3 mx-auto lg:flex-row lg:align-items-center lg:gap-4"
                style={{ maxWidth: "1200px" }}
            >
                <Link
                    to="/"
                    className="flex align-items-center no-underline"
                    aria-label="Digital Store - início"
                    style={{ flexShrink: 0 }}
                >
                    <Logo />
                </Link>

                <form
                    className="flex flex-grow-1 align-items-center gap-2 p-2 pl-3 border-round-lg"
                    onSubmit={handleSearch}
                    style={{
                        minWidth: 0,
                        height: "60px",
                        backgroundColor: "var(--light-gray-3)",
                    }}
                >
                    <InputText
                        type="search"
                        aria-label="Pesquisar produtos"
                        placeholder="Pesquisar produto..."
                        value={searchQuery}
                        onChange={(event) => setSearchQuery(event.target.value)}
                        className="flex-1 w-full border-none shadow-none bg-transparent p-0"
                        style={{ minWidth: 0,
                            fontSize:"2em"
                         }}
                    />
                    <Button
                        type="submit"
                        aria-label="Buscar"
                        variant="text"
                        rounded
                        iconOnly
                        className="p-0"
                        style={{
                            width: "44px",
                            height: "44px",
                            flexShrink: 0,
                            border: "none",
                            backgroundColor: "transparent",
                            color: "var(--dark-gray-2)",
                        }}
                    >
                        <i className="pi pi-search" aria-hidden="true" />
                    </Button>
                </form>

                <div
                    className="flex align-items-center justify-content-between lg:justify-content-end gap-3 lg:gap-4"
                    style={{ whiteSpace: "nowrap" }}
                >
                    <Link
                        to="/register"
                        className="text-base underline"
                        style={{
                            color: "var(--dark-gray-2)",
                            textDecorationColor: "var(--dark-gray-2)",
                        }}
                    >
                        Cadastre-se
                    </Link>
                    <Link
                        to="/login"
                        className="flex align-items-center justify-content-center no-underline border-round-sm font-bold"
                        style={{
                            width: "114px",
                            height: "40px",
                            backgroundColor: "var(--primary)",
                            color: "var(--white)",
                            fontSize: "14px",
                        }}
                    >
                        Entrar
                    </Link>
                    <span
                        className="inline-flex align-items-center justify-content-center"
                        role="img"
                        aria-label="Carrinho de compras"
                    >
                        <img src={cartIcon} alt="" width="20" height="21" />
                    </span>
                </div>
            </div>

            <nav
                className="mx-auto mt-4"
                aria-label="Navegação principal"
                style={{ maxWidth: "1200px" }}
            >
                <ul className="flex flex-wrap gap-4 list-none m-0 p-0">
                    {navigationItems.map(({ label, to, end }) => (
                        <li key={label} className="flex">
                            <NavLink
                                to={to}
                                end={end}
                                className="inline-block no-underline"
                                style={({ isActive }) => ({
                                    paddingBottom: "12px",
                                    borderBottom: `2px solid ${
                                        isActive
                                            ? "var(--primary)"
                                            : "transparent"
                                    }`,
                                    color: isActive
                                        ? "var(--primary)"
                                        : "var(--dark-gray-2)",
                                    fontSize: "16px",
                                    fontWeight: isActive ? 700 : 400,
                                })}
                            >
                                {label}
                            </NavLink>
                        </li>
                    ))}
                </ul>
            </nav>
        </header>
    );
};

export default Header;