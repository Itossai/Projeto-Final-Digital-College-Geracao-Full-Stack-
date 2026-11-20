import Header from "./Header";
import Footer from "./Footer";

const Layout = ({children}) => {
    return (
        <div
            className="flex flex-column"
            style={{
                fontFamily: "Arial, sans-serif",
                color: "var(--dark-gray-2)",
            }}
        >
            <Header />
            {children}
            <Footer />
        </div>
    );
};

export default Layout;