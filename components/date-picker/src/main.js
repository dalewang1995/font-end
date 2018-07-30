(function() {
	let datepicker = window.datepicker;
	let monthData,$wrapper;
	function createTD(monthData) {
		let chtml = '';
		for(let i =0; i<monthData.length; i++){
			let date = monthData[i];
			if(i%7 === 0){
				chtml +='<tr>';
			}
			chtml += '<td>' + date.showDate + '</td>';
			if(i%7 === 6){
				chtml +='</tr>';
			}
		}
		// console.log(chtml)
		return chtml;
	}
	datepicker.buildUi = function(year, month) {
		monthData = datepicker.getMonthData(year, month);
		// console.log('monthData',monthData)
		let html = 
		`<div>
			<div class="p-header ui-datepicker-btn">
				<span class="ui-datepicker-prev-btn">&lt;</span>
				 ${monthData.year} 年 ${monthData.month} 月 
				 <span class="ui-datepicker-next-btn">&gt;</span>
			</div>
			<div class="p-body">
				<table>
					<thead>
						<th>日</th>
						<th>一</th>
						<th>二</th>
						<th>三</th>
						<th>四</th>
						<th>五</th>
						<th>六</th>	
					</thead>
					<tbody>
						${createTD(monthData.days)}
					</tbody>
				</table>
			</div>
		</div>`;
		return html

	};

	datepicker.render = function(direction) {

		let year,month;

		if(monthData) {
			year = monthData.year;
			month = monthData.month;
		}

		if(direction === 'prev') {
			month = month  - 1;
			if(month === 0){
				year =  parseInt(year) - 1;
				month = 12;
			}
		};
		if(direction === 'next') month++;

		let html = datepicker.buildUi(year, month);

		$wrapper = document.querySelector('.ui-date-picker')
		if (!$wrapper) {
			$wrapper = document.createElement('div');
			document.body.appendChild($wrapper)
			$wrapper.className = 'ui-date-picker'
		}
		
		$wrapper.innerHTML = html;
		}

	datepicker.init = function(input) {

		datepicker.render();

		$input = document.querySelector(input);
		let isPickerShow = false;
		$input.addEventListener('click', function(){
			
			if(isPickerShow) {
				// console.log('click',$wrapper.classList)
				$wrapper.classList.remove('ui-date-picker-show');
				isPickerShow = false;
			}else {
				$wrapper.classList.add('ui-date-picker-show');
				isPickerShow = true;

				let top = $input.offsetTop;
				let left = $input.offsetLeft;
				let inputHeight = $input.offsetHeight;

				$wrapper.style.top = top + inputHeight + 2 + 'px';
				$wrapper.style.left = left + 'px';


			}
		}, false)

		$wrapper.addEventListener('click',function(e){
			let $target = e.target;

			// if(!$target.classList.contains('ui-datepicker-btn'))
			// 	break;
			if($target.classList.contains('ui-datepicker-prev-btn')){
				console.log(1111)
				datepicker.render('prev')
			}else if($target.classList.contains('ui-datepicker-next-btn')){
				console.log(222)
				datepicker.render('next')
			}
		}, false);

	};
})();

