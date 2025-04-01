// Hardcoded Admin password
const adminPassword = 'Ewald@Pret911';

// Data structure to hold users
let users = JSON.parse(localStorage.getItem('users')) || [];

// Admin login functionality
document.getElementById('adminLoginForm').addEventListener('submit', function(e) {
    e.preventDefault();

    const passwordInput = document.getElementById('adminPassword').value;

    if (passwordInput === adminPassword) {
        // Hide login popup and show admin panel
        document.getElementById('adminPopup').style.display = 'none';
        document.getElementById('adminPanel').style.display = 'block';
        displayUsers(); // Display the list of users
    } else {
        alert('Incorrect Admin Password');
    }
});

// Display users in the admin panel
function displayUsers() {
    const userListDiv = document.getElementById('userList');
    userListDiv.innerHTML = ''; // Clear any existing user list

    // Loop through users and display each one
    users.forEach((user, index) => {
        const userDiv = document.createElement('div');
        userDiv.classList.add('user-item');
        
        userDiv.innerHTML = `
            <h4>${user.username}</h4>
            <p>Status: <strong>${user.isBlocked ? 'Blocked' : 'Active'}</strong></p>
            <div class="user-actions">
                <button class="${user.isBlocked ? 'unblock-button' : 'block-button'}" 
                        onclick="toggleUserStatus(${index})">
                    ${user.isBlocked ? 'Unblock' : 'Block'}
                </button>
                <button class="password-change-button" onclick="changePassword(${index})">
                    Change Password
                </button>
            </div>
        `;

        userListDiv.appendChild(userDiv);
    });
}

// Toggle block/unblock user status
function toggleUserStatus(index) {
    users[index].isBlocked = !users[index].isBlocked; // Toggle status
    localStorage.setItem('users', JSON.stringify(users)); // Update localStorage
    displayUsers(); // Refresh the user list
}

// Change user password
function changePassword(index) {
    const newPassword = prompt('Enter the new password for ' + users[index].username);

    if (newPassword) {
        users[index].password = newPassword; // Update the password
        localStorage.setItem('users', JSON.stringify(users)); // Update localStorage
        alert('Password changed successfully!');
    }
}

// User Registration and Login (from Index page)
document.getElementById('authForm').addEventListener('submit', function(e) {
    e.preventDefault();
    const username = document.getElementById('username').value;
    const password = document.getElementById('password').value;

    let userExists = users.some(user => user.username === username);

    if (userExists) {
        // User exists, check if password matches
        const user = users.find(user => user.username === username);
        if (user.password === password && !user.isBlocked) {
            alert('Login successful!');
            // Redirect or show product upload form
            showMainContent();
        } else if (user.isBlocked) {
            alert('Your account is blocked!');
        } else {
            alert('Incorrect password');
        }
    } else {
        alert('User not found');
    }
});

// Show main content after login
function showMainContent() {
    document.getElementById('authPopup').style.display = 'none';
    document.getElementById('mainContent').style.display = 'block';
}

// Handle product upload
document.getElementById('uploadForm').addEventListener('submit', function(e) {
    e.preventDefault();

    const productName = document.getElementById('productName').value;
    const productImage = document.getElementById('productImage').files[0];

    if (productName && productImage) {
        // Product uploaded successfully
        alert(`Product ${productName} uploaded!`);

        // You can save the product to localStorage if needed (e.g., save as an array of product objects)
        // Here, we'll just log the product name and image file name
        console.log('Product:', productName, productImage.name);
    } else {
        alert('Please fill out the product name and upload an image.');
    }
});

// Initialize product list display (if you want to display products after uploading)
function displayProductList() {
    // Assuming you will use localStorage for storing product data
    // Example of how to list products if you decide to save them
    const productListDiv = document.getElementById('productList');
    productListDiv.innerHTML = ''; // Clear product list

    // Retrieve products from localStorage (if any)
    const products = JSON.parse(localStorage.getItem('products')) || [];

    // Loop through and display the products
    products.forEach(product => {
        const productDiv = document.createElement('div');
        productDiv.classList.add('product-item');
        productDiv.innerHTML = `
            <img src="${product.imageUrl}" alt="${product.name}">
            <h3>${product.name}</h3>
        `;
        productListDiv.appendChild(productDiv);
    });
}

// Initialize users in localStorage (use this if you want some sample users for testing)
function initializeSampleUsers() {
    if (localStorage.getItem('users') === null) {
        const sampleUsers = [
            { username: 'admin', password: 'admin123', isBlocked: false },
            { username: 'john', password: 'john123', isBlocked: false },
            { username: 'alice', password: 'alice123', isBlocked: true }
        ];

        localStorage.setItem('users', JSON.stringify(sampleUsers)); // Save to localStorage
    }
}

// Call the function to initialize sample users (if necessary)
initializeSampleUsers();
