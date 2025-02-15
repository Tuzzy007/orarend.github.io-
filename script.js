const backendURL = "https://my-mongodb-backend.onrender.com"; // ← Cseréld ki a saját backend címedre!

// Felhasználók betöltése
async function loadUsers() {
    const response = await fetch(`${backendURL}/users`);
    const users = await response.json();
    const userList = document.getElementById("userList");
    userList.innerHTML = "";
    users.forEach(user => {
        const li = document.createElement("li");
        li.textContent = `${user.name} - ${user.email}`;
        userList.appendChild(li);
    });
}

// Új felhasználó hozzáadása
document.getElementById("userForm").addEventListener("submit", async function (e) {
    e.preventDefault();
    const name = document.getElementById("name").value;
    const email = document.getElementById("email").value;

    await fetch(`${backendURL}/users`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ name, email })
    });

    document.getElementById("name").value = "";
    document.getElementById("email").value = "";
    loadUsers();
});

loadUsers();
