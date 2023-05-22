function initSlider() {
	if (!slides || !slides.length) return;

	let slider = document.querySelector('#slider');

	addSlides();
	addDots();
	initNavigation();

	function addSlides() { 
		slides.forEach((slide, index) => { 
			const slideListItems = createListItemsHTML(slide); 
			const slideHTML = createSlideHTML(slide, index, slideListItems); 
			appendSlideToDOM(slideHTML); 
		});
	} 

	function createListItemsHTML(slide) { 
		let slideListItems = '';
		slide.listItems.forEach((item) => {
			slideListItems += `<div class="slider__text-item"><span>${item.title}</span><p>${item.description}</p></div>`;
		});
		return slideListItems;
	} 

	function createSlideHTML(slide, index, slideListItems) { 
		return `<div class="slider__slide${index === 0 ? " active" : ""}" data-index="${index}"><div class="slider__text"><div class="slider__text-title">${slide.title}</div><p>${slide.description}</p>${slideListItems}</div><div class="slider__img"><img src="${slide.imgUrl}"></div></div>`;
	} 

	function appendSlideToDOM(slideHTML) { 
		slider.querySelector('.slider__content').innerHTML += slideHTML; 
	}

	function initNavigation() {
		let nav = slider.querySelectorAll('.slider__nav-element');
		
		nav.forEach(el => el.addEventListener('click', handleNavigationClick))

		function handleNavigationClick() { 
			let currentSlide = +slider.querySelector('.active').dataset.index;
			let nextSlideNumber;
	
			if (this.classList.contains('slider__arrow--prev')) {
				nextSlideNumber = currentSlide === 0 ? slides.length - 1 : currentSlide - 1
			} else if (this.classList.contains('slider__arrow--next')) {
				nextSlideNumber = currentSlide === slides.length - 1 ? 0 : currentSlide + 1
			} else {
				nextSlideNumber = +this.dataset.index;
			}
		
			switchActiveElements(nextSlideNumber);
		}
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