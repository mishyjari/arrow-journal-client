// Populate tabs
const populateRightTabs = () => {
  const rightTabContainer = document.querySelector("div[class='tab-container']");
  rightTabContainer.innerHTML = `
    <div class="tab" id="year-tab">year</div>
    <div class="tab" id="month-tab">month</div>
    <div class="tab" id="week-tab">week</div>
    <div class="tab" id="day-tab">day</div>
    <div class="tab" id="memo-tab">memos</div>
  `;

  // Click Event Listeners for Tabs
  rightTabContainer.addEventListener('click', e => {
    const tabId = e.target.id;

    if (tabId === 'year-tab'){
      clearPages();
      populateYear(getMonths());
      console.log('Switch to year view')
    }
    else if (tabId === 'month-tab'){
      console.log('switch to month tab')
    }
    else if (tabId === 'week-tab'){
      console.log('switch to week tab')
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
