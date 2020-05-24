document.addEventListener('DOMContentLoaded', () => {
	const allPages = Array.from(document.getElementById('all-pages').children);
	const welcomePage = document.getElementById('welcome-page');
	const indexPage = document.getElementById('index-page');
	const yearPageLeft = document.getElementById('year-page-left');
	const yearPageRight = document.getElementById('year-page-right');
	const monthPageLeft = document.getElementById('month-page-left');
	const monthPageRight = document.getElementById('month-page-right');
	const weekPageLeft = document.getElementById('week-page-left');
	const weekPageRight = document.getElementById('week-page-right');

	// On load, we should see only the welcome spread, so set the class of the other pages to 'hidden'	
	allPages.forEach(page => page.className = 'hidden');

	welcomePage.className = 'show';
	indexPage.className = 'show';

	// Functions to handle dates. Move this to its own file.
	const addMonth = date => {
		date.setDate(date.getMonth() + 1);
		return date
	};

	const addDay = date => {
		date.setDate(date.getDate() + 1);
		return date;
	}

	// Take fullYear and return an array of date objects set to the first of each month
	const getMonthsInYear = year => {
		let d = new Date(year, 0, 1);
		const months = [];
		while( months.length < 12 ){
			months.push(d)
			d = new Date(year, d.getMonth() + 1)
		};
		return months;
	};

	// Provided a date object, return an array of date instances for every day within that month
	const getDaysInMonth = d => {
		const month = d.getMonth();
		d.setDate(1);
		const days = [];
		
		while( d.getMonth() === month ){
			days.push(d);
			d = new Date(d.getFullYear(), d.getMonth(), d.getDate() + 1)
		}
		return days;
	}

	// populate month left
	const populateMonth = d => {
		monthPageLeft.className = 'show'
		const days = getDaysInMonth(d);
		days.forEach(day => {
			const list = document.getElementById('month-list-days');
			const dayLine = document.createElement('li');
			dayLine.innerHTML = `
				<strong>${day.toLocaleDateString('en-US', {weekday: 'short'})}</strong> | 
				<input type='text' /><button>+</button>
			`;
			list.appendChild(dayLine);
		})
	}
	
	let thisMonth = new Date();
	populateMonth(thisMonth)
	
})
