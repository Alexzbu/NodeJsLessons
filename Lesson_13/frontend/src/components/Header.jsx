import { Link, NavLink, useNavigate } from 'react-router-dom'
import apiServer from '../api/indexApi';

const Header = ({ user, setToken, productList }) => {
   const navigate = useNavigate();

   const handleLogout = () => {
      localStorage.removeItem('jwt_token')
      setToken('')
      apiServer.defaults.headers.common['Authorization'] = `Bearer`
      navigate('/catalog');
   };

   return (
      <header className="header">
         <div className="header__container">
            <Link to="/"><img className="header__logo" src="/image/logo.svg" alt="Logo" /></Link>
            <div className="header__menu menu">
               <nav className="menu__body">
                  <ul className="menu__list">
                     <li className="menu__item">
                        <NavLink to="/catalog" className="menu__link menu__link--active">Shop</NavLink>
                     </li>
                     <li className="menu__item">
                        <NavLink to="#" className="menu__link">Men</NavLink>
                     </li>
                     <li className="menu__item">
                        <NavLink to="#" className="menu__link">Women</NavLink>
                     </li>
                     {/* <li className="menu__item">
                        <NavLink to="#" className="menu__link">Combos</NavLink>
                     </li>
                     <li className="menu__item">
                        <NavLink to="#" className="menu__link">Joggers</NavLink>
                     </li> */}
                  </ul>
               </nav>
            </div>
            <form className="header__search search-form">
               <input className="search-form__input" placeholder="Search" type="search" />
            </form>
            <div className="header__action action-header">
               {user ? (
                  <>
                     <NavLink to="#" className="action-header__item _icon-favorite"></NavLink>
                     <NavLink className="action-header__item _icon-user" onClick={handleLogout}></NavLink>
                     <NavLink to="/cart" className="action-header__item _icon-cart">
                        {productList.length > 0 && (
                           <span>{productList.reduce((total, item) => total + item.amount, 0)}</span>
                        )}
                     </NavLink>

                  </>
               ) : (
                  <>
                     <NavLink to="/login" className="button button--white">Sign in</NavLink>
                  </>
               )}
            </div>
            <button className="icon-menu"><span></span></button>
         </div>
      </header>
   )
}

export default Header