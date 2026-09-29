document
  .getElementById(
    'logoutBtn'
  )
  .addEventListener(
    'click',
    function () {

      SESSION = null;


      sessionStorage.removeItem(
        SESSION_KEY
      );

      document
        .getElementById(
          'app'
        )
        .classList.remove(
          'active'
        );

      document
        .getElementById(
          'loginScreen'
        )
        .style.display =
        'flex';


      /* Clear form */

      document
        .getElementById(
          'loginForm'
        )
        .reset();


      document
        .getElementById(
          'loginError'
        )
        .textContent = '';

    }
  );
