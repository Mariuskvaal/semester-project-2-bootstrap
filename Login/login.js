async function loginUser(email, password) {
    const loginUrl = 'api.noroff.dev/api/v1/auction/auth/login';

    try {
        const response = await fetch(loginUrl, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({
                email: email,
                password: password
            })
        });

        if (response.ok) {
            console.log('Login successful');
            // Additional handling of response data here, if needed
        } else {
            const errorText = await response.text();
            console.error('Login failed:', errorText);
        }
    } catch (error) {
        console.error('Error during login:', error);
    }
}

