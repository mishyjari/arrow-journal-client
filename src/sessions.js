// This is a hack job sessions management system used strictly for development
const getActiveUserId = () => {

  // Session cookie stored as a string `user=${id}`
  if( document.cookie.includes('user=') ){
    const id = document.cookie.split('=')[1];
    if (id){
      return id
    } else {
      return false
    };
  } else {
    document.cookie = 'user=';
    getActiveUserId();
  };
};

const resetSession = () => {
  document.cookie = 'user='
};

const createSession = id => {
  document.cookie = `user=${id}`;
};

// Return promose to deliver user's journal
const getUserJournal = id => {
  return fetch(`http://localhost:3000/users/${id}/journal`)
    .then( res => res.json() )
    .then( user => user.journals )
}
