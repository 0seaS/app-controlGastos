import "./styles/Header.css"
import file from "../assets/util/datosCarniceria.json"
import useFetchMerc from "../Hooks/useFetchMerc"

const Header = () => {

  const {llenarData} = useFetchMerc()

  function llenarDataButton() {
    file.map((data) => {llenarData(data)})
  }

  return (
    <header className="main-header">
      <div className="logo-container">
        <img className="logo" src="/img/logo.jpeg" alt="" />
      </div>
      <nav >
        <ul>
          <li style={{/*visibility: "hidden"*/}}><button onClick={llenarDataButton}>llenar</button></li>
        </ul>
      </nav>
        
    </header>
  )
}

export default Header