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
    getActiveUser();
  };
};

const resetSession = () => {
  document.cookie = 'user='
};

const createSession = id => {
  document.cookie = `user=${id}`;
};
