async function logout() {
    const response = await fetch('/api/users/logout', {
        method: 'post',
        headers: { 'Content-Type': 'application/json' }
    });
    if (response.ok) {
        message1();
    } else {
        message2();
    }
}

function message1() {
    const divEl = document.querySelector('.notice');
    const textEl2 = document.createElement('p');
    textEl2.textContent = "Logging Out.";
    divEl.append(textEl2);
    setTimeout(() => {
        document.location.replace('/');
    }, 4000);
}

function message2() {
    const divEl = document.querySelector('.notice');
    const textEl = document.createElement('p');
    textEl.textContent = "Logged Out.";
    divEl.append(textEl);
    setTimeout(() => {
        document.location.reload();
    }, 20000);
}

document.getElementById('logout').addEventListener('click', logout);