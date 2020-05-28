// Handle navigation
const navigate = (page, tab) => {
  const tabCollection = tabs.getElementsByClassName("tab")
  const tabArr = Array.from(tabCollection)
  // removes active page class from all tabs so you can set a new one on click
  for (let i = 0; i < tabArr.length; i++) {
    tabArr[i].className = "tab"
    tabArr[i].style.zIndex = null
    tabArr[i].style.height = null
    tabArr[i].style.bottom = null
  }
  if (!tab) { tab = document.getElementById(`${page}-tab` )}
  if (getActiveUserId()) {
    switch (page) {
      case "welcome":
        tab.style.height = "55px"
        tab.style.bottom = "-20px"

        updatePageIds('welcome-page');
        renderWelcomePagePrivate(getActiveUserId())
        break;
      case "year":
        tab.style.height = "58px"
        tab.style.bottom = "-20px"

        updatePageIds('year-page');
        renderYearPage(activeDate);
        break;
      case "month":
        tab.style.height = "61px"
        tab.style.bottom = "-20px"

        updatePageIds('month-page');
        renderMonthPage(activeDate);
        break;
      case "week":
        tab.style.height = "64px"
        tab.style.bottom = "-20px"

        updatePageIds('week-page');
        renderWeekPage(activeDate)
        break;
      case "memos":
        tab.style.height = "67px"
        tab.style.bottom = "-20px"

        updatePageIds('memo-page');
        renderMemoPage(activeDate);
        break;
    }
  } else if ( page === 'welcome' ){
    tab.style.height = "55px"
    tab.style.bottom = "-20px"

    updatePageIds('welcome-page');
    renderWelcomePublic();
  } else {
    tab.style.height = "55px"
    tab.style.bottom = "-20px"
    updatePageIds('welcome-page');
    renderWelcomePublic();
    rightPage.innerHTML = `
      <div class='message'>
        <h2>Please login or sign up to continue</h2>
      </div>
    `;
  }
}


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
  const arrowLeft = document.querySelector('.arrow-left');
  const arrowRight = document.querySelector('.arrow-right');

  if (e.target.id === "welcome-tab") { navigate('welcome',e.target )
    arrowLeft.style.display = "none"
    arrowRight.style.display = "none"
  }
  else if (e.target.id === "year-tab") { navigate('year', e.target )
    arrowLeft.style.display = "block"
    arrowRight.style.display = "block"
  }
  else if (e.target.id === "month-tab") { navigate('month', e.target )
    arrowLeft.style.display = "block"
    arrowRight.style.display = "block"
  }
  else if (e.target.id === "week-tab") { navigate('week', e.target )
    arrowLeft.style.display = "block"
    arrowRight.style.display = "block"
  }
  else if (e.target.id === "memo-tab") { navigate('memos', e.target )
    arrowLeft.style.display = "block"
    arrowRight.style.display = "block"
  }

	if (e.target.className === "tab") {
			e.target.classList.add("active-page")
		 }
})

const renderArrowBtns = () => {
  const journalMain = document.querySelector('#journal-main');
  const arrowLeft = document.createElement('div');
  const arrowRight = document.createElement('div');

  arrowLeft.className = 'arrow-left';
  arrowRight.className = 'arrow-right';

  arrowLeft.innerHTML = `
    <i class="fas fa-arrow-left"></i>
  `;

  arrowRight.innerHTML = `
    <i class="fas fa-arrow-right"></i>
  `;

  journalMain.appendChild(arrowLeft);
  journalMain.appendChild(arrowRight);
};

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
