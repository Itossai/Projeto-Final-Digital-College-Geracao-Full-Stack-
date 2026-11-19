import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";

const Header = () => {
    const [searchQuery, setSearchQuery] = useState("");
    const navigate = useNavigate();

    const handleSearch = (event) => {
        event.preventDefault();
        navigate(`/produtos?q=${encodeURIComponent(searchQuery.trim())}`);
    };

    return ( <>
    <header>
        <div>   
                <h1>Digital Store</h1>
                
                <form onSubmit={handleSearch}>
                    <input
                        type="search"
                        placeholder="Pesquisar produto..."
                        value={searchQuery}
                        onChange={(event) => setSearchQuery(event.target.value)}
                    />
                    <button type="submit">Pesquisar</button>
                </form>

                <button>Cadastre-se</button>
                <button>Entrar</button>
                <button>Carrinho</button>
        </div>
        
        <nav>
            <ul>
                <li>Home</li>
                 <li><Link to="/produtos">Produtos</Link></li>
                  <li>Categorias</li>
                   <li>Meus Pedidos</li>
            </ul>
        </nav>
    </header>
    </> );
}
 
export default Header;