import React, { useEffect } from 'react';
import { Link } from 'react-router-dom';
import noUiSlider from 'nouislider';
import wNumb from 'wnumb';

const Catalog = () => {

   useEffect(() => {
      const filterRange = document.querySelector('.price-filter__range');
      if (filterRange && !filterRange.noUiSlider) {
         const filterRangeFrom = document.querySelector('.price-filter__input--from');
         const filterRangeTo = document.querySelector('.price-filter__input--to');

         noUiSlider.create(filterRange, {
            start: [0, 100],
            connect: true,
            range: {
               'min': 0,
               'max': 100
            },
            format: wNumb({
               decimals: 0,
               thousand: '',
               prefix: '$'
            })
         });

         filterRange.noUiSlider.on('update', function (values) {
            filterRangeFrom.value = `${values[0]}`;
            filterRangeTo.value = `${values[1]}`;
         });

         filterRangeFrom.addEventListener('change', function () {
            filterRange.noUiSlider.setHandle(0, filterRangeFrom.value);
         });
         filterRangeTo.addEventListener('change', function () {
            filterRange.noUiSlider.setHandle(1, filterRangeTo.value);
         });
      }
   }, []);

   return (
      <main className="page">
         <div className="page__catalog catalog">
            <section className="catalog__main">
               <div className="catalog__container">
                  <aside className="catalog__filter filter">
                     <h4 data-spoller="open" data-spoller-media="max,991.98" className="filter__title title-filter">
                        <button type="button" className="title-filter__button title-filter__button--main _icon-filter">Filter</button>
                     </h4>
                     <form action="#" className="filter__body">
                        <div className="filter__section section-filter">
                           <div className="section-filter__body">
                              <nav className="section-filter__menu menu-filter">
                                 <ul className="menu-filter__list">
                                    <li className="menu-filter__item">
                                       <Link to="#" className="menu-filter__link _icon-ch-right active">Tops</Link>
                                    </li>
                                    <li className="menu-filter__item">
                                       <Link to="#" className="menu-filter__link _icon-ch-right">Printed T-shirts</Link>
                                    </li>
                                    <li className="menu-filter__item">
                                       <Link to="#" className="menu-filter__link _icon-ch-right">Plain T-shirts</Link>
                                    </li>
                                    <li className="menu-filter__item">
                                       <Link to="#" className="menu-filter__link _icon-ch-right">Kurti</Link>
                                    </li>
                                    <li className="menu-filter__item">
                                       <Link to="#" className="menu-filter__link _icon-ch-right">Tops</Link>
                                    </li>
                                    <li className="menu-filter__item">
                                       <Link to="#" className="menu-filter__link _icon-ch-right">Printed T-shirts</Link>
                                    </li>
                                    <li className="menu-filter__item">
                                       <Link to="#" className="menu-filter__link _icon-ch-right">Plain T-shirts</Link>
                                    </li>
                                    <li className="menu-filter__item">
                                       <Link to="#" className="menu-filter__link _icon-ch-right">Kurti</Link>
                                    </li>
                                    <li className="menu-filter__item">
                                       <Link to="/" className="menu-filter__link _icon-ch-right">Printed T-shirts</Link>
                                    </li>
                                 </ul>
                              </nav>
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
                                    <input type="text" name="price-from" className="price-filter__input price-filter__input--from" />
                                    <input type="text" name="price-to" className="price-filter__input price-filter__input--to" />
                                 </div>
                              </div>
                           </div>
                        </div>
                        <div className="filter__section section-filter">
                           <h5 data-spoller="open" className="section-filter__title title-filter">
                              <button type="button" className="title-filter__button _icon-ch-down">Colors</button>
                           </h5>
                           <div className="section-filter__body">
                              <div className="section-filter__colors colors-filter">
                                 <label style={{ '--color': "#8434e1" }} className="colors-filter__item">
                                    <input type="checkbox" name="color[]" className="colors-filter__input" />
                                    Purple
                                 </label>
                                 <label style={{ '--color': '#000000' }} className="colors-filter__item">
                                    <input type="checkbox" name="color[]" className="colors-filter__input" />
                                    Black
                                 </label>
                                 <label style={{ '--color': "#F35528" }} className="colors-filter__item">
                                    <input type="checkbox" name="color[]" className="colors-filter__input" />
                                    Red
                                 </label>
                                 <label style={{ '--color': "#F16F2B" }} className="colors-filter__item">
                                    <input type="checkbox" name="color[]" className="colors-filter__input" />
                                    Orange
                                 </label>
                                 <label style={{ '--color': "#345EFF" }} className="colors-filter__item">
                                    <input type="checkbox" name="color[]" className="colors-filter__input" />
                                    Navy
                                 </label>
                              </div>
                           </div>
                        </div>
                        <div className="filter__section section-filter">
                           <h5 data-spoller="open" className="section-filter__title title-filter">
                              <button type="button" className="title-filter__button _icon-ch-down">Size</button>
                           </h5>
                           <div className="section-filter__body">
                              <div className="section-filter__size size-filter">
                                 <label className="size-filter__item">
                                    <input type="checkbox" name="size[]" className="size-filter__input" />
                                    XXS
                                 </label>
                                 <label className="size-filter__item">
                                    <input type="checkbox" name="size[]" className="size-filter__input" />
                                    XS
                                 </label>
                                 <label className="size-filter__item">
                                    <input type="checkbox" name="size[]" className="size-filter__input" />
                                    S
                                 </label>
                                 <label className="size-filter__item">
                                    <input type="checkbox" name="size[]" className="size-filter__input" />
                                    m
                                 </label>
                                 <label className="size-filter__item">
                                    <input type="checkbox" name="size[]" className="size-filter__input" />
                                    l
                                 </label>
                              </div>
                           </div>
                        </div>
                        <div className="filter__section section-filter">
                           <h5 data-spoller="open" className="section-filter__title title-filter">
                              <button type="button" className="title-filter__button _icon-ch-down">Dress Style</button>
                           </h5>
                           <div className="section-filter__body">
                              <div className="section-filter__style style-filter">
                                 <label className="style-filter__item _icon-ch-right">
                                    <input type="checkbox" name="style[]" className="style-filter__input" />
                                    classNameic
                                 </label>
                                 <label className="style-filter__item _icon-ch-right">
                                    <input type="checkbox" name="style[]" className="style-filter__input" />
                                    Casual
                                 </label>
                                 <label className="style-filter__item _icon-ch-right">
                                    <input type="checkbox" name="style[]" className="style-filter__input" />
                                    Business
                                 </label>
                              </div>
                           </div>
                        </div>
                     </form>
                  </aside>
                  <div className="catalog__body">
                     <Link to="/addProduct" className="catalog__add-button button">Add procuct</Link>
                     <div className="catalog__header">
                        <h1 className="catalog__title">Women’s Clothing</h1>
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
                        <article className="item-product">
                           <a href="#" className="item-product__picture-link">
                              <img src="image/modules/for-men/01.jpg" className="item-product__image" alt="" />
                           </a>
                           <div className="item-product__body">
                              <h4 className="item-product__title">
                                 <a href="#" className="item-product__link-title">Lorem ipsum dolor sit amet consectetur adipisicing elit. Nemo, molestias!</a>
                              </h4>
                              <div className="item-product__label">Explore Now!</div>
                              <div className="item-product__price">$38.00</div>
                           </div>
                        </article>
                     </div>
                  </div>
               </div>
            </section>
         </div >
      </main >
   )
}

export default Catalog