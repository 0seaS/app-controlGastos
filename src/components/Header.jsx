import "./styles/Header.css"
const Header = ({setPagSelected}) => {

  function handleCajas(){
    setPagSelected("cajas")
  }

  function handleMercaderia(){
    setPagSelected("Mercaderia")
  }

  return (
    <header className="main-header">
      <div className="logo-container">
        <img className="logo" src="/img/logo.jpeg" alt="" />
      </div>
      <nav >
        <ul>
            <li onClick={handleCajas}>Cajas</li>
            <li onClick={handleMercaderia}>Mercaderia</li>
        </ul>
      </nav>
        
    </header>
  )
}

export default Header