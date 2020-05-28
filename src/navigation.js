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
    e.target.style.height = "57px"
    e.target.style.bottom = "-25px"

    getActiveUserId() ? renderWelcomePagePrivate(getActiveUserId()) :
      renderWelcomePublic()

  } else if (e.target.id === "year-tab") {
    e.target.style.height = "60px"
    e.target.style.bottom = "-25px"

    renderYearPage(activeDate);
  } else if (e.target.id === "month-tab") {
    e.target.style.height = "63px"
    e.target.style.bottom = "-25px"

    renderMonthPage(activeDate);
  } else if (e.target.id === "week-tab") {
    e.target.style.height = "66px"
    e.target.style.bottom = "-25px"

    renderWeekPage(activeDate)
  } else if (e.target.id === "memo-tab") {
    e.target.style.height = "72px"
    e.target.style.bottom = "-25px"

    renderMemoPage(activeDate);
  }

	if (e.target.className === "tab") {
			e.target.classList.add("active-page")
		 }
})
