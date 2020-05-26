const _HEADERS = {
	"Content-Type": "application/json",
	"Accept": "application/json"
};

document.addEventListener("DOMContentLoaded", () => {
	populateRightTabs();
	renderWelcomePublic();
	
	const fontSelect = document.querySelector("#font-select");
	const body = document.querySelector('body');

	fontSelect.addEventListener('change', (e) => {
		if (e.target.value === "caveat") {
			body.style.fontFamily = "Caveat,cursive";
		}	else if (e.target.value === "garamond") {
			body.style.fontFamily = "EB Garamond,serif";
		} else if (e.target.value === "inconsolata") {
			body.style.fontFamily = "'Inconsolata', monospace";
		} else if (e.target.value === "montserrat") {
			body.style.fontFamily = "'Montserrat', sans-serif";
		} else if (e.target.value === "yellowtail") {
			body.style.fontFamily = "'Yellowtail', cursive";
		}
	});

})

/* document.addEventListener('DOMContentLoaded', () => {

	// Handle user creation
	const newUserForm = document.getElementById('new-user-form');
	newUserForm.addEventListener('submit', e => {
		e.preventDefault();

		const data = {
			headers: {
				"Content-Type": "application/json",
				"Accept": "application/json"
			},
			method: "POST",
			body: JSON.stringify({
				first_name: newUserForm.firstname.value,
				last_name: newUserForm.lastname.value,
				username: newUserForm.username.value,
				email: newUserForm.email.value,
				password: newUserForm.password.value
			})
		};

		const url = 'localhost:3000/users';

		debugger;

		fetch(url, data)
		.then( res => res.json() )
		.then( console.log )

	});

	// Functions to handle dates. Move this to its own file.
	const addMonth = date => {
		date.setDate(date.getMonth() + 1);
		return date
	};

	const addDay = date => {
		date.setDate(date.getDate() + 1);
		return date;
	}



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
		const monthLeft = document.getElementById('month-left')
		monthLeft.className = 'show'
		const days = getDaysInMonth(d);
		days.forEach(day => {
			const list = document.getElementById('month-list-days');
			const dayLine = document.createElement('tr');
			dayLine['data-day'] = day;
			dayLine.innerHTML = `
				<td class='add-event-dayline'><strong>+</td>
				<td>${day.getDate()} <strong>${day.toLocaleDateString('en-US', {weekday: 'short'})}</strong></td> |
				<td><!-- this is for day stats --></td>
				<td'><!-- this is for listing events --></td>
			`;
			list.appendChild(dayLine);
			dayLine.querySelector("td[class='add-event-dayline']").addEventListener('click', e => {
				const newEventForm = document.getElementById('new-event-form');
				debugger
				newEventForm['start-day'].value = day;
			})
		});
	}

	let thisMonth = new Date();
//	populateMonth(thisMonth)

}) */
