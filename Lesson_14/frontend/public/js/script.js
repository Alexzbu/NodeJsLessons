// Строгий режим
"use strict"

document.addEventListener("click", documentActions);

function documentActions(e) {
	const targetElement = e.target;

	if (targetElement.closest('.icon-menu')) {
		document.body.classList.toggle('menu-open');
	}
	if (targetElement.closest('[data-spoller]')) {
		const currentElement = targetElement.closest('[data-spoller]');
		if (!currentElement.nextElementSibling.classList.contains('--sliding')) {
			currentElement.classList.toggle('active');
		}
		slideToggle(currentElement.nextElementSibling);
	}
	if (targetElement.closest('.rating__input')) {
		const currentElement = targetElement.closest('.rating__input');
		const rating = currentElement.closest('.rating');
		if (rating.classList.contains('rating--set')) {
			starRatingGet(rating, currentElement);
		}
	}
	if (targetElement.closest('[data-tabs-button]')) {
		const currentElement = targetElement.closest('[data-tabs-button]');
		setTab(currentElement);
	}
}

// Rating
const ratings = document.querySelectorAll('[data-rating]')
if (ratings) {
	ratings.forEach(rating => {
		const currentValue = +rating.dataset.rating;
		currentValue ? starRatingSet(rating, currentValue) : null;
	});
}
function starRatingGet(rating, currentElement) {
	const ratingValue = +currentElement.value;
	// Тут відправка оцінки (ratingValue) на бекенд...
	// Уявімо, що ми отримали середню оцінку 3.2
	const resultRating = 3.2;
	starRatingSet(rating, resultRating);
}
function starRatingSet(rating, value) {
	const ratingItems = rating.querySelectorAll('.rating__item');
	const resultFullItems = parseInt(value);
	const resultPartItem = value - resultFullItems;

	ratingItems.forEach((ratingItem, index) => {
		ratingItem.classList.remove('active');
		ratingItem.querySelector('span') ? ratingItems[index].querySelector('span').remove() : null;

		if (index <= (resultFullItems - 1)) {
			ratingItem.classList.add('active');
		}
		if (index === resultFullItems && resultPartItem) {
			ratingItem.insertAdjacentHTML("beforeend", `<span style="width:${resultPartItem * 100}%"></span>`)
		}
	});
}

// Spollers
const spollers = document.querySelectorAll('[data-spoller]')
if (spollers.length) {
	spollers.forEach(spoller => {
		spoller.dataset.spoller !== 'open' ? spoller.nextElementSibling.hidden = true : spoller.classList.add('active')
	});
	// Filter
	const filterTitle = document.querySelector('.filter__title')
	console.log(filterTitle)
	if (filterTitle) {
		//window.addEventListener('resize', someFunc);
		const breakPointValue = filterTitle.dataset.spollerMedia;
		const breakPoint = breakPointValue ? `(${breakPointValue.split(',')[0]}-width:${breakPointValue.split(',')[1]}px)` : null
		if (breakPoint) {
			const matchMedia = window.matchMedia(breakPoint)
			matchMedia.addEventListener("change", (e) => {
				const isTrue = e.matches

				if (isTrue) {
					slideUp(filterTitle.nextElementSibling)
					filterTitle.classList.remove('active')
				} else {
					slideDown(filterTitle.nextElementSibling)
					filterTitle.classList.add('active')
				}
			})
		}
	}
}

let slideDown = (target, duration = 500) => {
	if (!target.classList.contains('--sliding')) {
		target.classList.add('--sliding');
		target.hidden = false;
		let height = target.offsetHeight;

		target.style.paddingTop = 0;
		target.style.paddingBottom = 0;
		target.style.marginTop = 0;
		target.style.marginBottom = 0;

		target.style.overflow = 'hidden';
		target.style.height = 0;

		target.offsetHeight;

		target.style.transitionProperty = `height, margin, padding`;
		target.style.transitionDuration = `${duration}ms`;

		target.style.height = `${height}px`;

		target.style.removeProperty('padding-top')
		target.style.removeProperty('padding-bottom')
		target.style.removeProperty('margin-bottom')
		target.style.removeProperty('margin-top')

		setTimeout(() => {
			target.style.removeProperty('height')
			target.style.removeProperty('overflow')
			target.style.removeProperty('transition-duration')
			target.style.removeProperty('transition-property')
			target.classList.remove('--sliding');
		}, duration);
	}
}
let slideUp = (target, duration = 500) => {
	if (!target.classList.contains('--sliding')) {
		target.classList.add('--sliding');
		let height = target.offsetHeight;

		target.style.transitionProperty = `height, margin, padding`;
		target.style.transitionDuration = `${duration}ms`;
		target.style.height = `${height}px`;

		target.offsetHeight;

		target.style.overflow = 'hidden';
		target.style.paddingTop = 0;
		target.style.paddingBottom = 0;
		target.style.marginTop = 0;
		target.style.marginBottom = 0;

		target.style.height = 0;

		setTimeout(() => {
			target.style.removeProperty('padding-top')
			target.style.removeProperty('padding-bottom')
			target.style.removeProperty('margin-bottom')
			target.style.removeProperty('margin-top')

			target.style.removeProperty('height')
			target.style.removeProperty('overflow')
			target.style.removeProperty('transition-duration')
			target.style.removeProperty('transition-property')
			target.classList.remove('--sliding');

			target.hidden = true;
		}, duration);
	}
}
let slideToggle = (target, duration = 500) => {
	target.hidden ? slideDown(target, duration) : slideUp(target, duration)
}

// Tabs
function setTab(tabElement) {
	const tabsParent = tabElement.closest('[data-tabs]');

	const tabsButtons = Array.from(tabsParent.querySelectorAll('[data-tabs-button]'));
	const tabsActiveButton = tabsParent.querySelector('[data-tabs-button].active');
	tabsActiveButton.classList.remove('active');
	tabElement.classList.add('active');

	const currentButtonIndex = tabsButtons.indexOf(tabElement);
	const tabsElements = tabsParent.querySelectorAll('[data-tabs-element]');

	tabsElements.forEach(tabsElement => {
		tabsElement.hidden = true;
	});

	tabsElements[currentButtonIndex].hidden = false;

}
