// Return an array of twelve months
// If passed an arg (string) for year, will return jan-dec of that year
// Else will return 12 months beginning with current month
const getMonths = year => {

  let d;
  year ? d = new Date(year,0) : d = new Date();
  d.setDate(1);

  const months = [];
  while( months.length < 12 ){
    months.push(d)
    d = new Date(d.getFullYear(), d.getMonth() + 1)
  };
  return months;
}

// Create monthly cell for yearly overviews
const createMonthCell = dateObject => {
  const monthString = dateObject.toLocaleDateString('en-US',
    {month: "long", year: "numeric"});

  const monthCell = document.createElement('div');
  monthCell.className = 'month-cell';

  monthCell.innerHTML = `
    <h3>${monthString}</h3>
    <ul class='month-cell-list'></ul>
    
  `;
  return monthCell;
};

// Take an array of date objects and append a cell for each, six per page
const populateYear = monthsArray => {
  const leftPage = document.querySelector("section[class='left']");
  leftPage.id = 'year-page-left';
  const rightPage = document.querySelector("section[class='right']");
  rightPage.id = 'year-page-right'

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
};
