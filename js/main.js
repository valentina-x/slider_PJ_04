function initSlider() {
	if (!slides || !slides.length) return;

	let slider = document.querySelector('#slider');

	addSlides();
	addDots();
	initNavigation();

	function addSlides() {
		slides.forEach((el, index) => {
			let slideListItems = '';
			slides[index].listItems.forEach((item) => {
				slideListItems += `<div class="slider__text-item"><span>${item.title}</span><p>${item.description}</p></div>`;
			});
			
			let slide = `<div class="slider__slide${index === 0 ? " active" : ""}" data-index="${index}"><div class="slider__text"><div class="slider__text-title">${slides[index].title}</div><p>${slides[index].description}</p>${slideListItems}</div><div class="slider__img"><img src="${slides[index].imgUrl}"></div></div>`;
			
			slider.querySelector('.slider__content').innerHTML += slide;
		})
	}

	function initNavigation() {
		let nav = slider.querySelectorAll('.slider__nav-element');
		let nextSlideNumber = 0;

		nav.forEach(el => {
			el.addEventListener('click', function () {
				let currentSlide = +slider.querySelector('.active').dataset.index;

				if (el.classList.contains('slider__arrow--prev')) {
					nextSlideNumber = (currentSlide === 0) ? slides.length - 1 : nextSlideNumber - 1
				} else if (el.classList.contains('slider__arrow--next')) {
					nextSlideNumber = currentSlide === slides.length - 1 ? 0 : nextSlideNumber + 1
				} else {
					nextSlideNumber = +el.dataset.index;
				}
			
				switchActiveElements(nextSlideNumber);
			})
		})
	}

	function addDots() {
		let dots = slider.querySelector('.slider__dots');
		for (let i = 0; i < slides.length; i++) {
			dots.innerHTML += `<div class="slider__nav-element${i === 0 ? ' active' : '' }" data-index="${i}"></div>`;			
		}
	}

	function switchActiveElements(index) {
		slider.querySelectorAll('.active').forEach(element => {
			element.classList.remove('active');
		})
		slider.querySelectorAll(`[data-index="${index}"]`).forEach(element => {
			element.classList.add('active');
		})
	}

}

document.addEventListener('DOMContentLoaded', initSlider);