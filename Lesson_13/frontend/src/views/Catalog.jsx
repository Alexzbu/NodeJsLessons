import React, { useEffect, useState } from 'react'
import { Link } from 'react-router-dom'
// import noUiSlider from 'nouislider'
// import wNumb from 'wnumb'
import apiServer from '../api/indexApi'
import Loading from '../components/Loading'
import { userType } from '../constants/userType.mjs'
import { filterSpoller } from '../utils/spollers/filterSpoller.mjs'

const Catalog = ({ user }) => {
   const [products, setProducts] = useState([])
   const [categories, setCategories] = useState([])
   const [category, setCategory] = useState('')
   const [priceFrom, setPriceFrom] = useState('0')
   const [priceTo, setPriceTo] = useState('1000')
   const [colors, setColors] = useState([])
   const [color, setColor] = useState('')
   const [sizes, setSizes] = useState([])
   const [size, setSize] = useState('')
   const [brands, setBrands] = useState([])
   const [brand, setBrand] = useState('')
   const [loading, setLoading] = useState(false)

   // useEffect(() => {
   //    const filterRange = document.querySelector('.price-filter__range');
   //    if (filterRange && !filterRange.noUiSlider) {
   //       const filterRangeFrom = document.querySelector('.price-filter__input--from');
   //       const filterRangeTo = document.querySelector('.price-filter__input--to');

   //       noUiSlider.create(filterRange, {
   //          start: [0, 1000],
   //          connect: true,
   //          range: {
   //             'min': 0,
   //             'max': 1000
   //          },
   //          format: wNumb({
   //             decimals: 0,
   //             thousand: '',
   //             prefix: ''
   //          })
   //       });

   //       filterRange.noUiSlider.on('update', function (values) {
   //          filterRangeFrom.value = `${values[0]}`;
   //          filterRangeTo.value = `${values[1]}`;
   //       });

   //       filterRangeFrom.addEventListener('change', function () {
   //          filterRange.noUiSlider.setHandle(0, filterRangeFrom.value);
   //       });
   //       filterRangeTo.addEventListener('change', function () {
   //          filterRange.noUiSlider.setHandle(1, filterRangeTo.value);
   //       });
   //    }
   // }, []);

   useEffect(() => {
      filterSpoller()
      const fetchData = async () => {
         try {
            setLoading(true)
            const response = await apiServer.get('/products', {
               params: { category, color, size, brand, priceFrom, priceTo }
            })
            setProducts(response.data)
            const [categoryResponse, colorResponse, sizeResponse, brandResponse] = await Promise.all([
               apiServer.get('/props/category'),
               apiServer.get('/props/color'),
               apiServer.get('/props/size'),
               apiServer.get('/props/brand')
            ]);

            setCategories(categoryResponse.data);
            setColors(colorResponse.data);
            setSizes(sizeResponse.data);
            setBrands(brandResponse.data);
         } catch (error) {
            console.error('Error fetching data:', error);
         } finally {
            setLoading(false);
         }
      }
      window.scrollTo(0, 0)
      fetchData()
   }, [category, color, size, brand, priceFrom, priceTo])

   return (
      <main className="page">
         <div className="page__catalog catalog">
            <section className="catalog__main">
               <div className="catalog__container">
                  <aside className="catalog__filter filter">
                     <h4 data-spoller="open" data-spoller-media="max,991.98" className="filter__title title-filter">
                        <button type="button" className="title-filter__button title-filter__button--main _icon-filter">Filter</button>
                     </h4>
                     <form className="filter__body">
                        <div className="filter__section section-filter">
                           <h5 data-spoller="open" className="section-filter__title title-filter">
                              <button type="button" className="title-filter__button _icon-ch-down">Category</button>
                           </h5>
                           <div className="section-filter__body">
                              <div className="section-filter__style style-filter" >
                                 {categories.map((item) => (
                                    <label className="style-filter__item _icon-ch-right" key={item._id}>
                                       <input
                                          type="radio"
                                          name="category"
                                          className="style-filter__input"
                                          value={item.name}
                                          onChange={(e) => setCategory(e.target.value)}
                                       />
                                       {item.name}
                                    </label>
                                 ))}
                              </div>
                           </div>
                        </div>
                        <div className="filter__section section-filter">
                           <h5 data-spoller="open" className="section-filter__title title-filter">
                              <button type="button" className="title-filter__button _icon-ch-down">Price</button>
                           </h5>
                           <div className="section-filter__body">
                              <div className="section-filter__price price-filter">
                                 <div className="price-filter__range"></div>
                                 <div className="price-filter__inputs">
                                    <input
                                       type="text"
                                       name="price-from"
                                       placeholder='0'
                                       className="price-filter__input price-filter__input--from"
                                       // value={priceFrom}
                                       onChange={(e) => setPriceFrom(e.target.value)}
                                    />
                                    <input
                                       type="text"
                                       name="price-to"
                                       placeholder='1000'
                                       className="price-filter__input price-filter__input--to"
                                       // value={priceTo}
                                       onChange={(e) => setPriceTo(e.target.value)}
                                    />
                                 </div>
                              </div>
                           </div>
                        </div>
                        <div className="filter__section section-filter">
                           <h5 data-spoller="open" className="section-filter__title title-filter">
                              <button type="button" className="title-filter__button _icon-ch-down">Colors</button>
                           </h5>
                           <div className="section-filter__body">
                              <div className="section-filter__colors colors-filter" >
                                 {colors.map((item) => (
                                    <label style={{ '--color': item.name }} className="colors-filter__item" key={item._id}>
                                       <input
                                          type="radio"
                                          name="color"
                                          className="colors-filter__input"
                                          value={item.name}
                                          onChange={(e) => setColor(e.target.value)}
                                       />
                                       {item.name}
                                    </label>
                                 ))}
                              </div>
                           </div>
                        </div>
                        <div className="filter__section section-filter">
                           <h5 data-spoller="open" className="section-filter__title title-filter">
                              <button type="button" className="title-filter__button _icon-ch-down">Size</button>
                           </h5>
                           <div className="section-filter__body">
                              <div className="section-filter__size size-filter">
                                 {sizes.map((item) => (
                                    <label className="size-filter__item" key={item._id}>
                                       <input
                                          type="radio"
                                          name="size"
                                          className="size-filter__input"
                                          value={item.name}
                                          onChange={(e) => setSize(e.target.value)}
                                       />
                                       {item.name}
                                    </label>
                                 ))}
                              </div>
                           </div>
                        </div>
                        <div className="filter__section section-filter">
                           <h5 data-spoller="open" className="section-filter__title title-filter">
                              <button type="button" className="title-filter__button _icon-ch-down">Brand</button>
                           </h5>
                           <div className="section-filter__body">
                              <div className="section-filter__style style-filter">
                                 {brands.map((item) => (
                                    <label className="style-filter__item _icon-ch-right" key={item._id}>
                                       <input
                                          type="checkbox"
                                          name="style[]"
                                          className="style-filter__input"
                                          value={item.name}
                                          onChange={(e) => setBrand(e.target.value)}
                                       />
                                       {item.name}
                                    </label>
                                 ))}
                              </div>
                           </div>
                        </div>
                     </form>
                  </aside>
                  <div className="catalog__body">
                     {user?.role === userType.ADMIN &&
                        <Link to="/addProduct" className="catalog__add-button button">Add procuct</Link>
                     }
                     <div className="catalog__header">
                        <h1 className="catalog__title">Catalog</h1>
                        <ul className="catalog__type type-catalog">
                           <li className="type-catalog__item">
                              <button className="type-catalog__button type-catalog__button--active">New</button>
                           </li>
                           <li className="type-catalog__item">
                              <button className="type-catalog__button">Recommended</button>
                           </li>
                        </ul>
                     </div>
                     <div className="catalog__items">
                        {products?.length === 0 && !loading && (<h2>NO MATCHES FOUND</h2>)}
                        {products.map((item) => (
                           < article className="item-product" key={item._id}>
                              <Link to={`/productCard/${item._id}`} className="item-product__picture-link">
                                 <img src={item.image[0]} className="item-product__image" alt={item.name} />
                              </Link>
                              <div className="item-product__body">
                                 <h4 className="item-product__title">
                                    <span className="item-product__link-title">{item.name}</span>
                                 </h4>
                                 <div className="item-product__label">Explore Now!</div>
                                 <div className="item-product__price">$ {item.price}</div>
                              </div>
                           </article>
                        ))}
                        {loading && <Loading />}
                     </div>
                  </div>
               </div>
            </section>
         </div >
         <script src="js/script.js"></script>
      </main >
   )
}

export default Catalog