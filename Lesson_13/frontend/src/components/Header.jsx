import { Link, NavLink, useNavigate } from 'react-router-dom'
import apiServer from '../api/indexApi'
import { useLocation } from "react-router-dom"

const Header = ({ user, setToken, search, setSearch, productList }) => {
   const navigate = useNavigate()
   const { pathname } = useLocation()

   const handleLogout = () => {
      localStorage.removeItem('jwt_token')
      setToken('')
      apiServer.defaults.headers.common['Authorization'] = `Bearer`
      navigate('/catalog')
   }

   const checkPath = () => {
      if (pathname !== '/catalog') {
         navigate('/catalog')
      }
   }

   return (
      <header className="header">
         <div className="header__container">
            <Link onClick={() => setSearch('')} to="/"><img className="header__logo" src="/image/logo.svg" alt="Logo" /></Link>
            <div className="header__menu menu">
               <nav className="menu__body">
                  <ul className="menu__list">
                     <li className="menu__item">
                        <Link
                           to="/catalog"
                           className={`menu__link ${search !== 'Men' && search !== 'Women' && pathname === '/catalog' ? 'active' : ''}`}
                           onClick={() => setSearch('')}
                        >Catalog
                        </Link>
                     </li>
                     <li className="menu__item">
                        <Link
                           to="/catalog"
                           className={`menu__link ${search === 'Men' ? 'active' : ''}`}
                           onClick={() => setSearch('Men')}
                        >Men
                        </Link>
                     </li>
                     <li className="menu__item">
                        <Link
                           to="/catalog"
                           className={`menu__link ${search === 'Women' ? 'active' : ''}`}
                           onClick={() => setSearch('Women')}
                        >Women
                        </Link>
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
               <input
                  className="search-form__input"
                  placeholder="Search"
                  type="search"
                  onChange={(e) => {
                     setSearch(e.target.value)
                     checkPath()
                  }}
               />
            </form>
            <div className="header__action action-header">
               {user ? (
                  <>
                     <NavLink to="/favorite" className="action-header__item _icon-favorite"></NavLink>
                     <button className="action-header__item _icon-user" onClick={handleLogout}></button>
                     <NavLink to="/cart" className="action-header__item _icon-cart">
                        {productList.length > 0 && (
                           <span>{productList.reduce((total, item) => total + item.amount, 0)}</span>
                        )}
                     </NavLink>

                  </>
               ) : (
                  <>
                     <NavLink to="/login" className="action-header__button button button--white">Sign in</NavLink>
                  </>
               )}
            </div>
            <button className="icon-menu"><span></span></button>
         </div>
      </header >
   )
}

export default Header