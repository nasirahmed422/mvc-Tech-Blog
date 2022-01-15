async function loginFormHandler(event) {
    event.preventDefault();

    const username = document.querySelector('#userEl').value.trim();
    const password = document.querySelector('#passEl').value.trim();

    if (username && password){
        const response = await fetch('/api/users/login',{
            method:'POST',
            body: JSON.stringify({
                username,
                password
                
            }),
            headers:{ 'Content-Type': 'application/json'}
        });
        
        if(response.ok){
           
            document.location.replace('/dashboard')
        } else {
            alert(response.statusText);
        }
    }
};

document.querySelector('#login-btn').addEventListener('click', loginFormHandler);