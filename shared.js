
const STORAGE_KEY = 'kalye_luma_3_modules_data_v1';
const SESSION_KEY = 'kalye_luma_session_v1';

function seedData() {

  return {

    users: [

      {
        username: 'admin',
        password: 'admin123',
        role: 'admin'
      },

      {
        username: 'cashier',
        password: 'cashier123',
        role: 'cashier'
      }

    ],

    products: [],

    transactions: []

  };

}

function loadData() {

  const raw =
    localStorage.getItem(STORAGE_KEY);

  if (!raw) {

    const seeded = seedData();

    localStorage.setItem(
      STORAGE_KEY,
      JSON.stringify(seeded)
    );

    return seeded;

  }

  try {

    return JSON.parse(raw);

  } catch (error) {

    const seeded = seedData();

    localStorage.setItem(
      STORAGE_KEY,
      JSON.stringify(seeded)
    );

    return seeded;

  }

}


function saveData() {

  localStorage.setItem(
    STORAGE_KEY,
    JSON.stringify(DATA)
  );

}


let DATA = loadData();

let SESSION =
  JSON.parse(
    sessionStorage.getItem(SESSION_KEY) || 'null'
  );


function fmt(number) {

  return '₱' + Number(number).toFixed(2);

}


function todayStr() {

  return new Date()
    .toISOString()
    .slice(0, 10);

}

function niceDateTime(iso) {

  const date = new Date(iso);

  return date.toLocaleString(
    undefined,
    {
      month: 'short',
      day: 'numeric',
      hour: '2-digit',
      minute: '2-digit'
    }
  );

}


let toastTimer;

function toast(message, isError = false) {

  const element =
    document.getElementById('toast');

  if (!element) {
    return;
  }

  element.textContent = message;

  element.className =
    'toast show' +
    (isError ? ' error' : '');

  clearTimeout(toastTimer);

  toastTimer =
    setTimeout(() => {

      element.classList.remove('show');

    }, 2600);

}



function showView(name) {

  document
    .querySelectorAll('.view')
    .forEach(view => {

      view.classList.remove('active');

    });


  const target =
    document.getElementById(
      'view-' + name
    );


  if (target) {

    target.classList.add('active');

  }


  document
    .querySelectorAll('.nav-link')
    .forEach(link => {

      link.classList.toggle(
        'active',
        link.dataset.view === name
      );

    });

}


document
  .querySelectorAll('.nav-link')
  .forEach(link => {

    link.addEventListener(
      'click',
      () => {

        showView(
          link.dataset.view
        );

      }
    );

  });


function renderAll() {

  renderDashboard();

}


function enterApp() {

  document
    .getElementById('loginScreen')
    .style.display = 'none';

  document
    .getElementById('signupScreen')
    .style.display = 'none';

  document
    .getElementById('changePasswordScreen')
    .style.display = 'none';


  document
    .getElementById('app')
    .classList.add('active');


  document
    .getElementById('userLabel')
    .textContent =
      SESSION.username +
      ' · ' +
      SESSION.role;


  showView('dashboard');

  renderAll();

}
