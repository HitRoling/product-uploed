// Get stored users or initialize empty array
let users = JSON.parse(localStorage.getItem('users')) || [];

// Function to handle Sign In
document.getElementById('authForm').addEventListener('submit', function (e) {
    e.preventDefault();

    const username = document.getElementById('username').value;
    const password = document.getElementById('password').value;

    const user = users.find(u => u.username === username);

    // Check if the user exists and if the password matches
    if (user && user.password === password && !user.isBlocked) {
        alert('Login successful!');
        showMainContent();
    } else if (user && user.isBlocked) {
        alert('Your account is blocked!');
    } else {
        alert('Invalid credentials!');
    }
});

// Show the main content after login
function showMainContent() {
    document.getElementById('authPopup').style.display = 'none';
    document.getElementById('mainContent').style.display = 'block';
}

// Handle product upload
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

// Control Panel: Adding a new user
document.getElementById('addUserButton').addEventListener('click', function () {
    const username = document.getElementById('newUsername').value;
    const password = document.getElementById('newPassword').value;

    if (username && password) {
        // Check if the username already exists
        const userExists = users.some(user => user.username === username);
        if (userExists) {
            alert('User already exists!');
        } else {
            users.push({ username, password });
            localStorage.setItem('users', JSON.stringify(users));
            alert('User added successfully!');
            document.getElementById('newUsername').value = '';
            document.getElementById('newPassword').value = '';
            updateUserList(); // Refresh the user list
        }
    } else {
        alert('Please enter both username and password!');
    }
});

// Function to remove a user from the list
function removeUser(index) {
    const confirmed = confirm('Are you sure you want to remove this user?');
    if (confirmed) {
        users.splice(index, 1); // Remove user from the array
        localStorage.setItem('users', JSON.stringify(users)); // Update localStorage
        updateUserList(); // Refresh the user list
    }
}

// Function to update and display users list
function updateUserList() {
    const userListContainer = document.getElementById('userListContainer');
    userListContainer.innerHTML = '';  // Clear the current list

    users.forEach((user, index) => {
        const userDiv = document.createElement('div');
        userDiv.classList.add('user-item');
        userDiv.innerHTML = `
            <span>${user.username}</span>
            <button class="remove-button" onclick="removeUser(${index})">Remove</button>
        `;
        userListContainer.appendChild(userDiv);
    });
}

// Initialize the user list display on load
updateUserList();
