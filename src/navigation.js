// Update page IDs
const updatePageIds = newId => {
  leftPage.id = newId + '-left';
  rightPage.id = newId + '-right';
}

// Populate tabs
const populateRightTabs = () => {
  const rightTabContainer = document.querySelector("div[class='tab-container']");
  rightTabContainer.innerHTML = `
  <div class="tab active-page" id="welcome-tab">welcome</div>
    <div class="tab" id="year-tab">year</div>
    <div class="tab" id="month-tab">month</div>
    <div class="tab" id="week-tab">week</div>
    <div class="tab" id="memo-tab">memos</div>
  `;
};

//tab navigation dynamic switching
const tabs = document.querySelector('.tab-container')

tabs.addEventListener('click', (e) => {
	const tabCollection = tabs.getElementsByClassName("tab")
	// console.log(tabCollection)
	const tabArr = Array.from(tabCollection)
	// removes active page class from all tabs so you can set a new one on click
	for (let i = 0; i < tabArr.length; i++) {
		tabArr[i].className = "tab"
    tabArr[i].style.zIndex = null
  tabArr[i].style.height = null
    tabArr[i].style.bottom = null
  }

  if (e.target.id === "welcome-tab") {
    e.target.style.height = "60px"
    e.target.style.bottom = "-25px"

    updatePageIds('welcome-page');

    getActiveUserId() ? renderWelcomePagePrivate(getActiveUserId()) :
      renderWelcomePublic()

  } else if (e.target.id === "year-tab") {
    e.target.style.height = "60px"
    e.target.style.bottom = "-25px"

    updatePageIds('year-page');

    renderYearPage(activeDate);
  } else if (e.target.id === "month-tab") {
    e.target.style.height = "63px"
    e.target.style.bottom = "-25px"

    updatePageIds('month-page');

    renderMonthPage(activeDate);
  } else if (e.target.id === "week-tab") {
    e.target.style.height = "66px"
    e.target.style.bottom = "-25px"

    updatePageIds('week-page');

    renderWeekPage(activeDate)
  } else if (e.target.id === "memo-tab") {
    e.target.style.height = "72px"
    e.target.style.bottom = "-25px"

    updatePageIds('memo-page');

    renderMemoPage(activeDate);
  }

	if (e.target.className === "tab") {
			e.target.classList.add("active-page")
		 }
})

// Hanlde arrow navigation
document.querySelector("div[class='arrow-left']").addEventListener('click', e => {
  const timeScope = leftPage.id.split('-')[0];
  if ( timeScope === 'year' ){
    activeDate.setFullYear(activeDate.getFullYear() - 1);
    renderYearPage(activeDate);
  } else if ( timeScope === 'month' ){
    activeDate.setMonth(activeDate.getMonth() - 1 );
    renderMonthPage(activeDate)
  } else if ( timeScope === 'week' ){
    activeDate.setDate(activeDate.getDate() - 7 );
    renderWeekPage(activeDate);
  }
});
document.querySelector("div[class='arrow-right']").addEventListener('click', e => {
  const timeScope = rightPage.id.split('-')[0];
  if ( timeScope === 'year' ){
    activeDate.setFullYear(activeDate.getFullYear() + 1);
    renderYearPage(activeDate);
  } else if ( timeScope === 'month' ){
    activeDate.setMonth(activeDate.getMonth() + 1 );
    renderMonthPage(activeDate);
  } else if ( timeScope === 'week' ){
    activeDate.setDate(activeDate.getDate() + 7  );
    renderWeekPage(activeDate);
  }
});
