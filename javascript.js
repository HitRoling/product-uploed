document.addEventListener("DOMContentLoaded", () => {
    const adminPopup = document.getElementById("adminPopup");
    const adminPanel = document.getElementById("adminPanel");
    const adminLoginForm = document.getElementById("adminLoginForm");
    const userList = document.getElementById("userList");

    const ADMIN_PASSWORD = "Ewald@Pret911"; // Admin password for control panel

    // Admin login functionality
    adminLoginForm.addEventListener("submit", (e) => {
        e.preventDefault();
        const password = document.getElementById("adminPassword").value;
        
        // Check if entered password matches the admin password
        if (password === ADMIN_PASSWORD) {
            // If password is correct, show admin panel and hide login popup
            adminPopup.style.display = "none";
            adminPanel.style.display = "block";

            // Load users for the admin to manage
            loadUsers();
        } else {
            alert("Incorrect admin password!");
        }
    });

    // Load users into the admin panel (from localStorage)
    function loadUsers() {
        userList.innerHTML = ''; // Clear previous list
        for (let i = 0; i < localStorage.length; i++) {
            const username = localStorage.key(i);
            const password = localStorage.getItem(username);
            
            // Only display users with valid passwords
            if (password) {
                const userDiv = document.createElement("div");
                userDiv.classList.add("user-item");
                userDiv.innerHTML = `
                    <h4>${username}</h4>
                    <p>Status: ${password === null ? "Blocked" : "Active"}</p>
                    <div class="action-buttons">
                        <button class="block-button" onclick="blockUser('${username}')">Block</button>
                        <button class="unblock-button" onclick="unblockUser('${username}')">Unblock</button>
                    </div>
                `;
                userList.appendChild(userDiv);
            }
        }
    }

    // Block a user (set password to null to "block")
    window.blockUser = function(username) {
        localStorage.setItem(username, null);
        loadUsers();
    };

    // Unblock a user (restore the password)
    window.unblockUser = function(username) {
        // For simplicity, unblock a user by setting their password back (you could add logic to reset or change the password)
        alert(`Unblocking user: ${username}`);
        loadUsers();
    };
});
