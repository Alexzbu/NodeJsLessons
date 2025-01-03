import { NavLink, useNavigate } from 'react-router-dom'
import apiServer from '../api/indexApi';

const Navbar = ({ isAuthenticated, username, setIsAuthenticated }) => {
   const navigate = useNavigate();

   const handleLogout = () => {
      localStorage.removeItem('jwt_token')
      setIsAuthenticated(false)
      apiServer.defaults.headers.common['Authorization'] = `Bearer`
      navigate('/cars');
   };

   return (
      <header className="header">
         <nav className="nav">
            <NavLink to="/" className="nav__link">Home</NavLink>
            <NavLink to="/locations" className="nav__link">Where to find us</NavLink>
            <NavLink to="/cars" className="nav__link">Fleet</NavLink>
            <NavLink to="/carsScroll" className="nav__link">Fleet Scroll</NavLink>
            {isAuthenticated && (
               <>
                  <NavLink to="/addCar" className="nav__link">Add a car</NavLink>
                  <NavLink to="/addLocation" className="nav__link">Add the location</NavLink>
               </>
            )}
         </nav>
         <div className="auth">
            {isAuthenticated ? (
               <>
                  <span>{username}</span>
                  <NavLink className="nav__link" onClick={handleLogout}>Logout</NavLink>
               </>
            ) : (
               <>
                  <NavLink to="/login" className="nav__link">Sign in</NavLink>
                  <NavLink to="/register" className="nav__link">Sign up</NavLink>
               </>
            )}
         </div>
      </header>

   )
}

export default Navbar