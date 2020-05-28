// Return an array of twelve months
// If passed an arg (string) for year, will return jan-dec of that year
// Else will return 12 months beginning with current month
const getMonths = year => {
  let d;
  // Create new date (today) if date not passed in
  year ? d = new Date(year,0) : d = new Date();
  d.setDate(1);

  // Push date and iterate month 12 times
  const months = [];
  while( months.length < 12 ){
    months.push(d)
    d = new Date(d.getFullYear(), d.getMonth() + 1)
  };
return months;
}

// Create monthly cell for yearly overviews
const createMonthCell = dateObject => {

  // Display heading MonthName - Full Year
  const monthString = dateObject.toLocaleDateString('en-US',
    {month: "long", year: "numeric"});

  // Create and return div for this month
  const monthCell = document.createElement('div');
    monthCell.className = 'month-cell';
    monthCell.id = `month-cell-${dateObject.getFullYear()}-${dateObject.getMonth()}`
    monthCell.innerHTML = `
        <h3>${monthString}</h3>
        <ul class='month-cell-list'></ul>
        `;
  return monthCell;
};

// Take an array of date objects and append a cell for each, six per page
const populateYear = monthsArray => {

  while (monthsArray.length > 6) {
    leftPage.appendChild(
      createMonthCell(
        monthsArray.shift()
      ));
  };
  while (monthsArray.length > 0) {
    rightPage.appendChild(
      createMonthCell(
        monthsArray.shift()
      ));
  };

  // Fetch events and populate
  getEvents(ev => {
    const y = ev.start_date.getFullYear();
    const m = ev.start_date.getMonth();
    const cell = document.getElementById(`month-cell-${y}-${m}`)

    // Ignore events out of date range
    if (cell) {
      const eventLi = document.createElement('li');
      eventLi.textContent = ev.name;
      cell.appendChild(eventLi)
    }
  })
};

const renderYearPage = d => {
  clearPages();
  populateYear(getMonths(d.getFullYear()));
};
