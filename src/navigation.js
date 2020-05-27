// Populate tabs
const populateRightTabs = () => {
  const rightTabContainer = document.querySelector("div[class='tab-container']");
  rightTabContainer.innerHTML = `
    <div class="tab" id="year-tab">year</div>
    <div class="tab" id="month-tab">month</div>
    <div class="tab" id="week-tab">week</div>
    <div class="tab" id="memo-tab">memos</div>
  `;
// <div class="tab" id="day-tab">day</div>


  // Click Event Listeners for Tabs
  rightTabContainer.addEventListener('click', e => {
    const tabId = e.target.id;

    if (tabId === 'year-tab'){
      clearPages();
      populateYear(getMonths());
      console.log('Switch to year view')
    }
    else if (tabId === 'month-tab'){
      clearPages();

      let d = new Date(); // Get rid of this!
      renderMonthPage(d)
    }
    else if (tabId === 'week-tab'){
      console.log('switch to week tab')
      clearPages();

      renderWeekPage(new Date())
    }
    else if (tabId === 'day-tab'){
      clearPages();
      renderWelcomePublic();
      console.log('Day tab should be depreciated -mf')
    }
    else if (tabId === 'memo-tab'){
      console.log('switch to memos tab')
    }
    else {
      console.log('maybe add a home/welcome tab?')
    }
  });
};

// Clear pages (called befoe rendering new content)
const clearPages = () => {
  document.querySelector("section[class='left']").innerHTML = '';
  document.querySelector("section[class='right']").innerHTML = '';
}


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
  
  if (e.target.id === "year-tab") {
    e.target.style.height = "60px"
    e.target.style.bottom = "-25px"
  } else if (e.target.id === "month-tab") {
    e.target.style.height = "63px"
    e.target.style.bottom = "-25px"
  } else if (e.target.id === "week-tab") {
    e.target.style.height = "66px"
    e.target.style.bottom = "-26px"
  } else if (e.target.id === "memo-tab") {
    e.target.style.height = "69px"
    e.target.style.bottom = "-25px"
  }
	
	if (e.target.className === "tab") {
			e.target.classList.add("active-page")
		 }
})