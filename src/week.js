const renderWeekPage = d => {

  const leftPage = document.querySelector("section[class='left']");
  const rightPage = document.querySelector("section[class='right']");

  leftPage.innerHTML = 'Sunday - Monday - Tuesday - Wednesday';
  rightPage.innerHTML = 'Thursday - Friday - Saturday - Sunday';
}
