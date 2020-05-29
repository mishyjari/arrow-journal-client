const renderMemoPage = d => {
  clearPages();

  // leftPage.textContent = 'memos'

  //hardcoding in data for design purposes
  leftPage.innerHTML += `
    <h2>Memos</h2>
    <div class="memo-entry">
      <span class="memo-date">May 25 2020</span>
      <p>I'd rather be dead in California than alive in Arizona. She's always got to wedge herself in the middle of us so that she can control everything. Yeah. Mom's awesome. The only person that gets Lucille this excited is Gene. Can't a guy call his mother pretty without it seeming strange? Amen. And how about that little piece of tail on her? Cute! No, Pop-pop does not get a treat, I just brought you a [bleep]ing pizza.</p>
      <span class="memo-edit-btn">Edit memo</span>
    </div>
    <div class="memo-entry">
      <span class="memo-date">May 27 2020</span>
      <p>Yeah, that's a cultural problem is what it is. You know, your average American male is in a perpetual state of adolescence, you know, arrested development. (Hey. That's the name of the show!) You go buy a tape recorder and record yourself for a whole day. I think you'll be surprised at some of your phrasing. Taste the happy, Michael! Taste it! She's a contestant. It's sorta like an inner beauty pageant. Ah, there it is. You need to do more with Rita. Believe me, I'd like to.</p>
      <span class="memo-edit-btn">Edit memo</span>
    </div>
  `;

  rightPage.innerHTML += `
    <h2>Memos</h2>
    <div class="memo-entry">
      <span class="memo-date">May 28 2020</span>
      <p>I'd rather be dead in California than alive in Arizona. She's always got to wedge herself in the middle of us so that she can control everything. Yeah. Mom's awesome. The only person that gets Lucille this excited is Gene. Can't a guy call his mother pretty without it seeming strange? Amen. And how about that little piece of tail on her? Cute! No, Pop-pop does not get a treat, I just brought you a [bleep]ing pizza.</p>
      <span class="memo-edit-btn">Edit memo</span>
    </div>
  `;

}

const renderNewMemoForm = parentNode => {
  const taskFormContainer = document.createElement('div');
  taskFormContainer.innerHTML = `
      <div id="new-memo-container" class="hidden">
        <h2>New Memo</h2>
        <form id="new-memo-form" action="#">
          <label for="content">Memo Content: </label>
          <textarea id="content" name="content" rows="4" cols="50">
            Write your memo here
          </textarea>
          <br />
          <label for="start">Date: </label>
          <input type="date" name='date' value="${new Date().toLocaleDateString()}"/>
          <br />
          <input type="submit" class='btn' value='Add Event'>
          <br />
          <h6 class='clickable'>cancel</h6>
        </form>
      </div>
  `;

  parentNode.appendChild(taskFormContainer);

  const cancel = document.querySelector("h6[class='clickable']");
  cancel.addEventListener("click", e => {
    e.target.parentNode.parentNode.className = 'hidden';
    navigate(parentNode.id.split('-')[0])
  }); 

  const form = document.getElementById('new-memo-form');
  form.addEventListener('submit', (e) => {
    e.preventDefault();

    const form = e.target;
    const content = form.content.value;
    const date = new Date(form.date.valueAsDate);
    const completed = false;

    const postData = {
      headers: _HEADERS,
      method: 'POST',
      body: JSON.stringify({
        name: name,
        date: date,
        important: important,
        completed: completed,
        journal_id: JSON.parse(sessionStorage.user).journal.id
      })
    };

    const url = 'http://localhost:3000/memos'

    fetch( url, postData )
    .then( res => res.json() )
    .then( memo => {
      console.log(memo)
      setActiveUser();
      setTimeout(() => {
        const page = parentNode.id.split('-')[0];
        switch(page) {
          case 'year':
            renderYearPage(activeDate)
            break;
          case 'month':
            renderMonthPage(activeDate)
            break;
          case 'week':
            renderWeekPage(activeDate)
            break;
          case 'welcome':
            renderWelcomePagePrivate()
            break;
        }
      },100)
    });

  })
}
