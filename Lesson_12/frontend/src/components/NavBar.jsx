import { NavLink } from 'react-router-dom'

const Navbar = () => {
   return (
      <header className="header">
         <nav className="nav">
            <NavLink to="/" className="nav__link">Home</NavLink>
            <NavLink to="/locations" className="nav__link">Where to find us</NavLink>
            <NavLink to="/cars" className="nav__link">Fleet</NavLink>
            <NavLink to="/addCar" className="nav__link">Add a car</NavLink>
            <NavLink to="/addLocation" className="nav__link">Add the location</NavLink>
         </nav>
         <div className="auth">
            <NavLink to="/locations" className="nav__link">Sign in</NavLink>
            <NavLink to="/locations" className="nav__link">Sign up</NavLink>
         </div>
      </header>

   )
}

export default Navbar