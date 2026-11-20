import Header from "./Header";
import Footer from "./Footer";

const Layout = ({children}) => {
    return (
        <div
            className="flex flex-column min-h-screen"
            style={{
                fontFamily: "Arial, sans-serif",
                color: "var(--dark-gray-2)",
                backgroundColor: "var(--light-gray-3)",
            }}
        >
            <Header />
            {children}
            <Footer />
        </div>
    );
};

export default Layout;