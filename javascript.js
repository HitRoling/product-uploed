document.addEventListener("DOMContentLoaded", () => {
    // Authentication Elements
    const authPopup = document.getElementById("authPopup");
    const mainContent = document.getElementById("mainContent");
    const authTitle = document.getElementById("authTitle");
    const authForm = document.getElementById("authForm");
    const toggleAuth = document.getElementById("toggleAuth");

    // Admin Panel Elements
    const adminPopup = document.getElementById("adminPopup");
    const adminPanel = document.getElementById("adminPanel");
    const adminLoginForm = document.getElementById("adminLoginForm");
    const userList = document.getElementById("userList");

    // Upload Form Elements
    const uploadForm = document.getElementById("uploadForm");
    const productList = document.getElementById("productList");

    let isLogin = true;
    const ADMIN_PASSWORD = "Ewald@Pret911"; // Admin password for control panel

    // Switch between login and signup
    toggleAuth.addEventListener("click", () => {
        isLogin = !isLogin;
        authTitle.innerText = isLogin ? "Login" : "Sign Up";
        authForm.innerHTML = `
            <input type="text" id="username" placeholder="Username" required>
            <input type="password" id="password" placeholder="Password" required>
            <button type="submit">${isLogin ? "Login" : "Sign Up"}</button>
        `;
        toggleAuth.innerText = isLogin ? "Don't have an account? Sign up" : "Already have an account? Login";
    });

    // Authentication Handling
    authForm.addEventListener("submit", (e) => {
        e.preventDefault();
        const username = document.getElementById("username").value;
        const password = document.getElementById("password").value;

        if (isLogin) {
            if (localStorage.getItem(username) === password) {
                alert("Login successful!");
                authPopup.style.display = "none";
                mainContent.style.display = "block";
            } else {
                alert("Invalid credentials.");
            }
        } else {
            if (!localStorage.getItem(username)) {
                localStorage.setItem(username, password);
                alert("Signup successful! Please login.");
            } else {
                alert("User already exists.");
            }
        }
    });

    // Upload Product
    uploadForm.addEventListener("submit", (e) => {
        e.preventDefault();
        const productName = document.getElementById("productName").value;
        const productImage = document.getElementById("productImage").files[0];

        if (productImage) {
            const reader = new FileReader();
            reader.onload = function (e) {
                const productDiv = document.createElement("div");
                productDiv.classList.add("product-item");
                productDiv.innerHTML = `<h3>${productName}</h3><img src="${e.target.result}" width="100%">`;
                productList.appendChild(productDiv);
            };
            reader.readAsDataURL(productImage);
        }
    });

    // Admin login
    adminLoginForm.addEventListener("submit", (e) => {
        e.preventDefault();
        const password = document.getElementById("adminPassword").value;
        // Check if entered password matches the admin password
        if (password === ADMIN_PASSWORD) {
            // If password is correct, show admin panel and hide login popup
            adminPopup.style.display = "none";
            adminPanel.style.display = "block";
            loadUsers();
        } else {
            // If password is incorrect
            alert("Incorrect password!");
        }
    });

    // Load users into admin panel
    function loadUsers() {
        userList.innerHTML = "";
        for (let i = 0; i < localStorage.length; i++) {
            const username = localStorage.key(i);
            if (username !== "admin") { 
                const userDiv = document.createElement("div");
                userDiv.classList.add("user-item");
                userDiv.innerHTML = `
                    <span>${username}</span>
                    <button onclick="deleteUser('${username}')">Block</button>
                `;
                userList.appendChild(userDiv);
            }
        }
    }

    // Block user (Remove from localStorage)
    window.deleteUser = (username) => {
        localStorage.removeItem(username);
        loadUsers();
    };
});
