$(document).ready(function(){
	'use strict';

	$('.slider').slick({
		dots     : false,
		arrows   : false,
		autoplay : true,
		fade     : true
	});


	let toDate = new Date('2019-09-07 16:40:00'); // когда событие

	let countdown = setInterval(function() {
		// --start--
		// 2. получить разницу (дельту) во времени между сейчас и событием
		let now    = new Date(),                      // сейчас
			delta  = parseInt((toDate - now) / 1000); // дельта в секундах 

		if (delta <= 0) {
			clearInterval(countdown);
		} else {
			// 3. сколько целых дней в дельте и вывести в квадрат дней
			// 24 * 60 * 60
			let days = Math.floor(delta / (24 * 60 * 60));
			$('#days').text(days.toString().length == 1 ? '0' + days : days);
			// 3а. вычесть дни из дельты
			delta -= days * (24 * 60 * 60);
			// 4. сколько целых часов в дельте и вывести в квадрат часов
			// 60 * 60
			let hours = Math.floor(delta / (60 * 60));
			$('#hours').text(hours.toString().length == 1 ? '0' + hours : hours);
			// 4а. вычесть часы из дельты
			delta -= hours * (60 * 60);
			// 5. сколько целых минут в дельте и вывести в квадрат минут
			// 60
			let minutes = Math.floor(delta / 60);
			// console.log(minutes.toString().length);
			$('#minutes').text(minutes.toString().length == 1 ? '0' + minutes : minutes);
			// 5а. вычесть минуты из дельты
			delta -= minutes * 60;
			// 6. сколько секунд в дельте и вывести в квадрат секунд
			let seconds = delta;
			$('#seconds').text(seconds.toString().length == 1 ? '0' + seconds : seconds);
			
			// --end--
		}

	}, 1000);

	// 7. проделать действия п.п.2-6 каждую секунду

	let options = [
		{
			endpoint : 'https://reqres.in/api/users',
			count	 : 6,
			target   : 'competitorsUsers',
			class    : '',
		},
		{
			endpoint : 'https://reqres.in/api/users?page=2',
			count	 : 3,
			target   : 'juryUsers',
			class    : 'user__img-box--round',
		}
	];

	options.forEach(function(option){
		loadUsers(option);
	})


	function loadUsers(opt) {

		let xhr = new XMLHttpRequest(); 

		xhr.open('GET', opt.endpoint);
		xhr.send();
		
		xhr.responseType = 'json';

		xhr.onerror = function() {
  			alert("Запрос не удался");
		};

		xhr.onload = function() {
  			if (xhr.status != 200) { // анализируем HTTP-статус ответа, если статус не 200, то произошла ошибка
    			alert(`Ошибка ${xhr.status}: ${xhr.statusText}`); // Например, 404: Not Found
  			} else { // если всё прошло гладко, выводим результат

				let target = document.getElementById(opt.target),
					users  = xhr.response.data.splice(0, opt.count);
  				
  				users.forEach(function(user){
  					// console.log(user.id);
  					// console.log(user.first_name,user.last_name);
  					let html = `
  						<div class="user">
							<div class="user__img-box ${opt.class}">
								<img src="${user.avatar}" alt="${user.first_name} ${user.last_name}" class="user__img">
							</div>
							<div class="user__name">${user.first_name} ${user.last_name}</div>
							<div class="user__pos">${user.email}</div>
						</div>`;

					target.innerHTML = target.innerHTML + html;

  				});

    		}
		};

		console.log(xhr);
	};

});