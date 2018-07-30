(function() {
	let datepicker = {};

	datepicker.getMonthData = function(year, month){
		let ret = [];

		if(!year || !month){
			let today = new Date();
			year = today.getFullYear();
			month = today.getMonth() + 1;
		}

		let firstDay = new Date(year, month - 1, 1);
		let firstDayWeekDay = firstDay.getDay();
		if(firstDayWeekDay === 0) firstDayWeekDay = 7;

		year = firstDay.getFullYear();
		month = firstDay.getMonth() + 1;

		let lastDayOfLastMonth = new Date(year, month -1, 0);
		let lastDateOfLastMonth = lastDayOfLastMonth.getDate();

		let preMonthDayCount = firstDayWeekDay;
		let lastDay = new Date(year, month, 0);
		let lastDate = lastDay.getDate();

		for(let i=0; i<7*6; i++){
			let date = i + 1 - preMonthDayCount;
			let showDate = date;
			let thisMonth = month;

			if(date <= 0 ){
				thisMonth = month - 1;
				showDate = lastDateOfLastMonth + date;
			}else if(date > lastDate){
				thisMonth = month + 1;
				showDate = showDate - lastDate;
			}

			if(thisMonth === 0) thisMonth = 12;
			if(thisMonth === 13) thisMonth =1;

			ret.push({
				month: thisMonth,
				date:date,
				showDate:showDate
			})
		}

		return {
			year: year,
			month: month,
			days: ret
		};
	}

	window.datepicker = datepicker;
})();