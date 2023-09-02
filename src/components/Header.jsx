import "./styles/Header.css"
const Header = () => {


  return (
    <header className="main-header">
      <div className="logo-container">
        <img className="logo" src="/img/logo.jpeg" alt="" />
      </div>
      <nav >
        <ul>
            <li>Datos</li>
            <li>Cerrar Caja</li>
            <li>Cuentas</li>
        </ul>
      </nav>
        
    </header>
  )
}

export default Header