import "./styles/Header.css"
const Header = ({setPagSelected}) => {

  function handleDatos(){
    setPagSelected("datos")
  }

  function handleCerrarCaja(){
    setPagSelected("caja")
  }

  function handleCuentas(){
    setPagSelected("cuentas")
  }

  return (
    <header className="main-header">
      <div className="logo-container">
        <img className="logo" src="/img/logo.jpeg" alt="" />
      </div>
      <nav >
        <ul>
            <li onClick={handleDatos}>Datos</li>
            <li onClick={handleCerrarCaja}>Cerrar Caja</li>
            <li onClick={handleCuentas}>Cuentas</li>
        </ul>
      </nav>
        
    </header>
  )
}

export default Header