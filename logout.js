document
  .getElementById('logoutBtn')
  .addEventListener(
    'click',
    () => {

      SESSION = null;

      sessionStorage.removeItem(
        SESSION_KEY
      );

      document
        .getElementById('app')
        .classList.remove('active');

      document
        .getElementById('loginScreen')
        .style.display = 'flex';

      loginForm.reset();


      document
        .getElementById('loginError')
        .textContent = '';

    }
  );
