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
