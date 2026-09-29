const loginForm =
  document.getElementById(
    'loginForm'
  );


loginForm.addEventListener(
  'submit',
  function (event) {

    event.preventDefault();


    const username =
      document
        .getElementById(
          'loginUser'
        )
        .value
        .trim();


    const password =
      document
        .getElementById(
          'loginPass'
        )
        .value;


    const error =
      document
        .getElementById(
          'loginError'
        );


    /*
      Login accepts either Admin
      or Cashier without asking
      the user to select a role.
    */

    const user =
      DATA.users.find(
        account =>
          account.username ===
            username &&
          account.password ===
            password
      );


    if (!user) {

      error.textContent =
        'Incorrect username or password.';

      return;

    }


    error.textContent = '';


    SESSION = {

      username:
        user.username,

      role:
        user.role

    };


    sessionStorage.setItem(
      SESSION_KEY,
      JSON.stringify(
        SESSION
      )
    );


    enterApp();

  }
);


const showPasswordBtn =
  document.getElementById(
    'showPasswordBtn'
  );


showPasswordBtn.addEventListener(
  'click',
  function () {

    const password =
      document.getElementById(
        'loginPass'
      );


    if (
      password.type ===
      'password'
    ) {

      password.type =
        'text';

      showPasswordBtn.textContent =
        'HIDE';

    } else {

      password.type =
        'password';

      showPasswordBtn.textContent =
        'SHOW';

    }

  }
);


const signupScreen =
  document.getElementById(
    'signupScreen'
  );


const showSignupBtn =
  document.getElementById(
    'showSignupBtn'
  );


const signupForm =
  document.getElementById(
    'signupForm'
  );


const backToLoginFromSignupBtn =
  document.getElementById(
    'backToLoginFromSignupBtn'
  );


showSignupBtn.addEventListener(
  'click',
  function () {

    document
      .getElementById(
        'loginScreen'
      )
      .style.display =
      'none';


    signupScreen.style.display =
      'flex';


    signupForm.reset();

  }
);


backToLoginFromSignupBtn.addEventListener(
  'click',
  function () {

    signupScreen.style.display =
      'none';


    document
      .getElementById(
        'loginScreen'
      )
      .style.display =
      'flex';


    signupForm.reset();

  }
);



/* SIGN UP SUBMIT */

signupForm.addEventListener(
  'submit',
  function (event) {

    event.preventDefault();


    const username =
      document
        .getElementById(
          'signupUser'
        )
        .value
        .trim();


    const password =
      document
        .getElementById(
          'signupPass'
        )
        .value;


    const confirmPassword =
      document
        .getElementById(
          'signupConfirmPass'
        )
        .value;


    const error =
      document
        .getElementById(
          'signupError'
        );


    if (
      username.length < 3
    ) {

      error.textContent =
        'Username must be at least 3 characters.';

      return;

    }


    if (
      password.length < 6
    ) {

      error.textContent =
        'Password must be at least 6 characters.';

      return;

    }


    if (
      password !==
      confirmPassword
    ) {

      error.textContent =
        'Passwords do not match.';

      return;

    }


    const exists =
      DATA.users.find(
        user =>
          user.username
            .toLowerCase() ===
          username.toLowerCase()
      );


    if (exists) {

      error.textContent =
        'Username is already registered.';

      return;

    }


    DATA.users.push({

      username:
        username,

      password:
        password,

      role:
        'cashier'

    });


    saveData();


    signupForm.reset();


    signupScreen.style.display =
      'none';


    document
      .getElementById(
        'loginScreen'
      )
      .style.display =
      'flex';


    document
      .getElementById(
        'loginError'
      )
      .textContent =
      'Account created successfully.';

  }
);


const changePasswordScreen =
  document.getElementById(
    'changePasswordScreen'
  );


const showChangePasswordBtn =
  document.getElementById(
    'showChangePasswordBtn'
  );


const backToLoginBtn =
  document.getElementById(
    'backToLoginBtn'
  );


const changePasswordForm =
  document.getElementById(
    'changePasswordForm'
  );


showChangePasswordBtn.addEventListener(
  'click',
  function () {

    document
      .getElementById(
        'loginScreen'
      )
      .style.display =
      'none';


    changePasswordScreen.style.display =
      'flex';

  }
);


backToLoginBtn.addEventListener(
  'click',
  function () {

    changePasswordScreen.style.display =
      'none';


    document
      .getElementById(
        'loginScreen'
      )
      .style.display =
      'flex';


    changePasswordForm.reset();

  }
);


changePasswordForm.addEventListener(
  'submit',
  function (event) {

    event.preventDefault();


    const username =
      document
        .getElementById(
          'changeUser'
        )
        .value
        .trim();


    const newPassword =
      document
        .getElementById(
          'newPassword'
        )
        .value;


    const confirmPassword =
      document
        .getElementById(
          'confirmPassword'
        )
        .value;


    const code =
      document
        .getElementById(
          'twoFactorCode'
        )
        .value
        .trim();


    const error =
      document
        .getElementById(
          'changePasswordError'
        );


    const user =
      DATA.users.find(
        account =>
          account.username ===
          username
      );


    if (!user) {

      error.textContent =
        'Username not found.';

      return;

    }


    if (
      newPassword.length < 6
    ) {

      error.textContent =
        'Password must be at least 6 characters.';

      return;

    }


    if (
      newPassword !==
      confirmPassword
    ) {

      error.textContent =
        'Passwords do not match.';

      return;

    }


    /*
      Demo 2FA code.
    */

    if (
      code !==
      'KALYE-482917'
    ) {

      error.textContent =
        'Invalid 2FA code.';

      return;

    }


    user.password =
      newPassword;


    saveData();


    changePasswordForm.reset();


    changePasswordScreen.style.display =
      'none';


    document
      .getElementById(
        'loginScreen'
      )
      .style.display =
      'flex';


    document
      .getElementById(
        'loginError'
      )
      .textContent =
      'Password changed successfully.';

  }
);


if (SESSION) {

  enterApp();

}
