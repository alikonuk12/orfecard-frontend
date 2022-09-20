const isLoggedIn = () => {
    return !!localStorage.getItem('email') && !!localStorage.getItem('role');
  }
  
  export default isLoggedIn;