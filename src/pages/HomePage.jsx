import { Link } from 'react-router-dom'
import './styles/HomePage.css'
const HomePage = () => {
  return (
    <div className='initial-menu__container'>
        <ul className="menu-initial">
            <li><h2><Link to='/externas'>EXTERNAS <i class='bx bxs-truck'></i></Link></h2></li>
            <li><h2><Link to='/tienda/1'>CHIMORE <i class='bx bx-store'></i></Link></h2></li>
            <li><h2><Link to='/tienda/2'>VILLA TUNARI <i class='bx bx-store'></i></Link></h2></li>
        </ul>
    </div>
  )
}

export default HomePage