const _HEADERS = {
	"Content-Type": "application/json",
	"Accept": "application/json"
};

// Use this variable to store the date object from the most recently rendered page
// That way we can increment consistently
let activeDate = new Date();

const leftPage = document.querySelector("section[class='left']");
const rightPage = document.querySelector("section[class='right']");

// Clear pages (called befoe rendering new content)
const clearPages = () => {
  leftPage.innerHTML = '';
  rightPage.innerHTML = '';
	console.log('pages clear')
}

document.addEventListener("DOMContentLoaded", () => {

	clearPages();

	renderSettingsTab();
	populateRightTabs();
	// renderArrowBtns();

	// A terrible way of handling session cookies. Dont do this.

	const currentUserId = getActiveUserId();

	if( currentUserId ){
		fetch(`http://localhost:3000/users/${currentUserId}`)
		.then( res => res.json() )
		.then( user => renderWelcomePagePrivate(user) )
		.catch( err => console.log(`Error fetching user with id #${currentUserId}: ${err}`))
	} else {
		renderWelcomePublic();
	}


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
