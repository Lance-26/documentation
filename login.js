const loginForm =
  document.getElementById('loginForm');


loginForm.addEventListener(
  'submit',
  (event) => {

    event.preventDefault();


    const username =
      document
        .getElementById('loginUser')
        .value
        .trim();


    const password =
      document
        .getElementById('loginPass')
        .value;


    const role =
      document
        .getElementById('loginRole')
        .value;


    const errorElement =
      document
        .getElementById('loginError');


    const user =
      DATA.users.find(
        user =>
          user.username === username &&
          user.password === password &&
          user.role === role
      );


    if (!user) {

      errorElement.textContent =
        'Incorrect username, password or role.';

      return;

    }


    errorElement.textContent = '';


    SESSION = {

      username: user.username,

      role: user.role

    };


    sessionStorage.setItem(
      SESSION_KEY,
      JSON.stringify(SESSION)
    );


    enterApp();

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


const backToLoginFromSignupBtn =
  document.getElementById(
    'backToLoginFromSignupBtn'
  );


const signupForm =
  document.getElementById(
    'signupForm'
  );

if (showSignupBtn) {

  showSignupBtn.addEventListener(
    'click',
    () => {

      document
        .getElementById('loginScreen')
        .style.display = 'none';


      signupScreen.style.display =
        'flex';


      document
        .getElementById('signupError')
        .textContent = '';


      signupForm.reset();

    }
  );

}

if (backToLoginFromSignupBtn) {

  backToLoginFromSignupBtn
    .addEventListener(
      'click',
      () => {

        signupScreen.style.display =
          'none';


        document
          .getElementById('loginScreen')
          .style.display = 'flex';


        signupForm.reset();

      }
    );

}

if (signupForm) {

  signupForm.addEventListener(
    'submit',
    (event) => {

      event.preventDefault();


      const username =
        document
          .getElementById('signupUser')
          .value
          .trim();


      const password =
        document
          .getElementById('signupPass')
          .value;


      const confirmPassword =
        document
          .getElementById('signupConfirmPass')
          .value;


      const role =
        document
          .getElementById('signupRole')
          .value;


      const errorElement =
        document
          .getElementById('signupError');

      if (
        !username ||
        !password ||
        !confirmPassword ||
        !role
      ) {

        errorElement.textContent =
          'Please complete all fields.';

        return;

      }


      if (username.length < 3) {

        errorElement.textContent =
          'Username must be at least 3 characters.';

        return;

      }

      if (password.length < 6) {

        errorElement.textContent =
          'Password must be at least 6 characters.';

        return;

      }

      if (password !== confirmPassword) {

        errorElement.textContent =
          'Passwords do not match.';

        return;

      }

      const existingUser =
        DATA.users.find(
          user =>
            user.username.toLowerCase() ===
            username.toLowerCase()
        );


      if (existingUser) {

        errorElement.textContent =
          'Username is already registered.';

        return;

      }

      if (role !== 'cashier') {

        errorElement.textContent =
          'Only Cashier accounts can be registered here.';

        return;

      }

      DATA.users.push({

        username: username,

        password: password,

        role: 'cashier'

      });


      saveData();

      errorElement.textContent = '';

      signupForm.reset();

      signupScreen.style.display =
        'none';


      document
        .getElementById('loginScreen')
        .style.display = 'flex';


      document
        .getElementById('loginError')
        .textContent =
          'Account created successfully. You can now log in.';

    }
  );

}

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
  () => {

    document
      .getElementById('loginScreen')
      .style.display = 'none';


    changePasswordScreen.style.display =
      'flex';


    document
      .getElementById('changePasswordError')
      .textContent = '';

  }
);

backToLoginBtn.addEventListener(
  'click',
  () => {

    changePasswordScreen.style.display =
      'none';


    document
      .getElementById('loginScreen')
      .style.display = 'flex';


    changePasswordForm.reset();

  }
);

async function getTwoFactorCode() {

  try {

    const response =
      await fetch(
        '2fa_code.txt',
        {
          cache: 'no-store'
        }
      );


    if (response.ok) {

      const code =
        (
          await response.text()
        ).trim();


      if (code) {

        return code;

      }

    }

  } catch (error) {

  }


  return atob(
    'S0FMWUUtNDgyOTE3'
  );

}

changePasswordForm.addEventListener(
  'submit',
  async (event) => {

    event.preventDefault();


    const username =
      document
        .getElementById('changeUser')
        .value
        .trim();


    const newPassword =
      document
        .getElementById('newPassword')
        .value;


    const confirmPassword =
      document
        .getElementById('confirmPassword')
        .value;


    const enteredCode =
      document
        .getElementById('twoFactorCode')
        .value
        .trim();


    const errorElement =
      document
        .getElementById(
          'changePasswordError'
        );


    const user =
      DATA.users.find(
        user =>
          user.username === username
      );


    if (!user) {

      errorElement.textContent =
        'Username not found.';

      return;

    }


    if (newPassword.length < 6) {

      errorElement.textContent =
        'Password must be at least 6 characters.';

      return;

    }



    if (newPassword !== confirmPassword) {

      errorElement.textContent =
        'Passwords do not match.';

      return;

    }



    const adminCode =
      await getTwoFactorCode();


    if (enteredCode !== adminCode) {

      errorElement.textContent =
        'Invalid 2FA code.';

      return;

    }

    user.password =
      newPassword;


    saveData();


    errorElement.textContent = '';

    changePasswordForm.reset();

    changePasswordScreen.style.display =
      'none';


    document
      .getElementById('loginScreen')
      .style.display = 'flex';


    document
      .getElementById('loginError')
      .textContent =
        'Password changed successfully. You can now log in.';

  }
);


if (SESSION) {

  enterApp();

}
