"use strict"

// Ждем загрузку контента
window.onload = function () {
	const parallax = document.querySelector('.parallax');

	if (parallax) {
		const front = document.querySelector('.images-parallax__front');
		const clouds = document.querySelector('.images-parallax__clouds');
		const me = document.querySelector('.images-parallax__me');


		// Коэффициенты
		const forClouds = 40;
		const forMe = 20;
		const forFront = 15;

		// Скорость анимации
		const speed = 0.05;

		// Объявление переменных
		let positionX = 0, positionY = 0;
		let coordXprocent = 0, coordYprocent = 0;

		function setMouseParallaxStyle() {
			const distX = coordXprocent - positionX;
			const distY = coordYprocent - positionY;

			positionX = positionX + (distX * speed);
			positionY = positionY + (distY * speed);

			// Передаем стили
			clouds.style.cssText = `transform: translate(${positionX / forClouds}%,${positionY / forClouds}%);`;
			me.style.cssText = `transform: translate(${positionX / forMe}%,${positionY / forMe}%);`;
			front.style.cssText = `transform: translate(${positionX / forFront}%,${positionY / forFront}%);`;

			requestAnimationFrame(setMouseParallaxStyle);
		}
		setMouseParallaxStyle();

		parallax.addEventListener("mousemove", function (e) {
			// Получение ширины и высоты блока
			const parallaxWidth = parallax.offsetWidth;
			const parallaxHeight = parallax.offsetHeight;

			// Ноль по середине
			const coordX = e.pageX - parallaxWidth / 2;
			const coordY = e.pageY - parallaxHeight / 2;

			// Получаем проценты
			coordXprocent = coordX / parallaxWidth * 100;
			coordYprocent = coordY / parallaxHeight * 100;
		});
	}
}