// Initialize or get users from localStorage
let users = JSON.parse(localStorage.getItem('users')) || [];

// Function to update users in localStorage
function updateUsers() {
    localStorage.setItem('users', JSON.stringify(users));
}

// Handle login/signup form submission on index.html
document.getElementById('authForm').addEventListener('submit', function (e) {
    e.preventDefault();

    const username = document.getElementById('username').value;
    const password = document.getElementById('password').value;
    const confirmPassword = document.getElementById('confirmPassword') ? document.getElementById('confirmPassword').value : '';

    const isSignup = document.getElementById('authTitle').textContent === "Sign Up";

    if (isSignup) {
        // Sign Up
        if (password === confirmPassword) {
            const userExists = users.some(user => user.username === username);
            if (userExists) {
                alert('User already exists!');
            } else {
                users.push({ username, password, isBlocked: false });
                updateUsers();
                alert('Account created successfully!');
                showMainContent();
            }
        } else {
            alert('Passwords do not match!');
        }
    } else {
        // Sign In
        const user = users.find(u => u.username === username);

        if (user && user.password === password && !user.isBlocked) {
            alert('Login successful!');
            showMainContent();
        } else if (user && user.isBlocked) {
            alert('Your account is blocked!');
        } else {
            alert('Invalid credentials!');
        }
    }
});

// Show the main content after login/signup
function showMainContent() {
    document.getElementById('authPopup').style.display = 'none';
    document.getElementById('mainContent').style.display = 'block';
}

// Handle product upload (on index.html)
document.getElementById('uploadForm').addEventListener('submit', function (e) {
    e.preventDefault();

    const productName = document.getElementById('productName').value;
    const productImage = document.getElementById('productImage').files[0];

    if (productName && productImage) {
        alert(`Product "${productName}" uploaded!`);

        // Here you would save the product data to localStorage or a server.
        console.log('Product uploaded:', productName, productImage.name);
    } else {
        alert('Please provide both product name and image!');
    }
});

// Control Panel functionality (control panel.js)

// Block/Unblock a user in the Control Panel
function toggleBlockStatus(username) {
    const user = users.find(u => u.username === username);
    if (user) {
        user.isBlocked = !user.isBlocked;
        updateUsers();
        alert(`User ${username} has been ${user.isBlocked ? 'blocked' : 'unblocked'}!`);
        renderUserList();  // Re-render the list after block/unblock
    }
}

// Change password functionality in the Control Panel
function changePassword(username) {
    const user = users.find(u => u.username === username);
    if (user) {
        const newPassword = prompt(`Enter new password for ${username}:`);
        if (newPassword) {
            user.password = newPassword;
            updateUsers();
            alert(`Password for ${username} has been changed!`);
        } else {
            alert('Password change cancelled');
        }
    }
}

// Render the list of users in the Control Panel
function renderUserList() {
    const userListDiv = document.getElementById('userList');
    userListDiv.innerHTML = '';

    users.forEach(user => {
        const userDiv = document.createElement('div');
        userDiv.classList.add('user-item');

        const userName = document.createElement('h4');
        userName.textContent = user.username;
        userDiv.appendChild(userName);

        const userStatus = document.createElement('p');
        userStatus.textContent = user.isBlocked ? 'Blocked' : 'Active';
        userDiv.appendChild(userStatus);

        const userActions = document.createElement('div');
        userActions.classList.add('user-actions');

        const blockButton = document.createElement('button');
        blockButton.textContent = user.isBlocked ? 'Unblock' : 'Block';
        blockButton.classList.add(user.isBlocked ? 'unblock-button' : 'block-button');
        blockButton.addEventListener('click', () => toggleBlockStatus(user.username));
        userActions.appendChild(blockButton);

        const passwordChangeButton = document.createElement('button');
        passwordChangeButton.textContent = 'Change Password';
        passwordChangeButton.classList.add('password-change-button');
        passwordChangeButton.addEventListener('click', () => changePassword(user.username));
        userActions.appendChild(passwordChangeButton);

        userDiv.appendChild(userActions);
        userListDiv.appendChild(userDiv);
    });
}

// On page load, check if the user is logged in, and render the Control Panel if they are
if (window.location.pathname.includes('control panel.html')) {
    const password = prompt('Enter Admin Password:');
    if (password === 'Ewald@Pret911') {
        renderUserList();
    } else {
        alert('Incorrect password!');
    }
}
