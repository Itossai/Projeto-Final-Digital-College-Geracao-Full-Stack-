const Header = () => {
    return ( <>
    <header>
        <div>   
                <h1>Digital Store</h1>
                
                <input type="search" placeholder="Pesquisar produto..."></input> 

                <button>Cadastre-se</button>
                <button>Entrar</button>
                <button>Carrinho</button>
        </div>
        
        <nav>
            <ul>
                <li>Home</li>
                 <li>Produtos</li>
                  <li>Categorias</li>
                   <li>Meus Pedidos</li>
            </ul>
        </nav>
    </header>
    </> );
}
 
export default Header;