$(document).ready(function(){
	'use strict';

	$('.slider').slick({
		dots: false,
		arrows: false,
		autoplay: true,
		fade: true
	});

	let toDate = new Date('2019-09-07 16:40:00');
	
	let countdown = setInterval(function (){
		// --старт--
		//2. получить разницу (дельту) во времени между сейчас и событием 
		let	now    = new Date(),
		delta  = parseInt((toDate - now) / 1000);

		if (delta <= 0) {
			clearInterval(countdown);
		} else {
			//3. посчитать сколько целых дней в этой разнице и вывести в квадрат дней 
			let days = Math.floor(delta / (24 * 60 * 60));
			$('#days').text(days.toString().length == 1 ? '0' + days : days);
			//3а. вычесть дни из дельты
			delta -= days * (24 * 60 * 60);
			//4. посчитать сколько целых часов в этой разнице и вывести в квадрат часов
			let hours = Math.floor(delta / (60*60));
			$('#hours').text(hours.toString().length == 1 ? '0' + hours : hours);
			//4а. вычесть часы из дельты
			delta -= hours * (60 * 60);
			//5. посчитать сколько целых минут в этой разнице и вывести в квадрат минут
			let minutes = Math.floor(delta / 60);
			$('#minutes').text(minutes.toString().length == 1 ? '0' + minutes : minutes);
			//5а. вычесть минуты из дельты
			delta -= minutes * 60;
			//3. сколько секунд в дельте и вевести квадрат секунд
			let seconds = delta;
			$('#seconds').text(seconds.toString().length == 1 ? '0' + seconds : seconds);
			// --енд--
		}
	}, 1000);
	

	//7. прделать действия п.п.2-6 кажду секунду

});