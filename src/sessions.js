// This is a hack job sessions management system used strictly for development
const getActiveUserId = () => {
  if ( sessionStorage.getItem('user') ){
    return sessionStorage.getItem('user')
  } else {
    return false;
  }
};

const resetSession = () => {
  sessionStorage.clear();
  updatePageIds('welcome-page')
  renderWelcomePublic();
  renderSettingsTab();
};

const createSession = id => {
  sessionStorage.setItem('user', id)
  renderSettingsTab();
};

// Return promose to deliver user's journal
const getUserJournal = id => {
  return fetch(`http://localhost:3000/users/${id}/journal`)
    .then( res => res.json() )
    .then( user => user.journals )
}
