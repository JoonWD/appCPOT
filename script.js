document.addEventListener('DOMContentLoaded', () => {
    const loginContainer = document.getElementById('loginContainer');
    const registerContainer = document.getElementById('registerContainer');
    const usersContainer = document.getElementById('usersContainer');
    const loginForm = document.getElementById('loginForm');
    const registerForm = document.getElementById('registerForm');
    const usersList = document.getElementById('usersList');
    const showRegisterButton = document.getElementById('showRegister');
    const showLoginButton = document.getElementById('showLogin');
    const logoutButton = document.getElementById('logout');

    showRegisterButton.addEventListener('click', () => {
        loginContainer.style.display = 'none';
        registerContainer.style.display = 'block';
    });

    showLoginButton.addEventListener('click', () => {
        registerContainer.style.display = 'none';
        loginContainer.style.display = 'block';
    });

    loginForm.addEventListener('submit', (e) => {
        e.preventDefault();
        const cedula = document.getElementById('loginCedula').value;
        const password = document.getElementById('loginPassword').value;
        const users = JSON.parse(localStorage.getItem('users')) || [];

        const user = users.find(user => user.cedula === cedula && user.password === password);
        if (user) {
            loginContainer.style.display = 'none';
            usersContainer.style.display = 'block';
            displayUsers(users);
        } else {
            alert('Número de cédula o contraseña incorrectos');
        }
    });

    registerForm.addEventListener('submit', (e) => {
        e.preventDefault();
        const cedula = document.getElementById('registerCedula').value;
        const nombres = document.getElementById('registerNombres').value;
        const apellidos = document.getElementById('registerApellidos').value;
        const direccion = document.getElementById('registerDireccion').value;
        const telefono = document.getElementById('registerTelefono').value;
        const cargo = document.getElementById('registerCargo').value;
        const password = document.getElementById('registerPassword').value;
        const users = JSON.parse(localStorage.getItem('users')) || [];

        const userExists = users.some(user => user.cedula === cedula);
        if (userExists) {
            alert('Número de cédula ya registrado');
        } else {
            users.push({ cedula, nombres, apellidos, direccion, telefono, cargo, password });
            localStorage.setItem('users', JSON.stringify(users));
            alert('Usuario registrado exitosamente');
            registerContainer.style.display = 'none';
            loginContainer.style.display = 'block';
        }
    });

    logoutButton.addEventListener('click', () => {
        usersContainer.style.display = 'none';
        loginContainer.style.display = 'block';
    });

    function displayUsers(users) {
        usersList.innerHTML = '';
        users.forEach((user, index) => {
            const li = document.createElement('li');
            li.innerHTML = `
                ${user.nombres} ${user.apellidos} - ${user.cedula} - ${user.direccion} - ${user.telefono} - ${user.cargo}
                <button onclick="editUser(${index})">Edit</button>
                <button onclick="deleteUser(${index})">Delete</button>
            `;
            usersList.appendChild(li);
        });
    }

    window.editUser = function(index) {
        const users = JSON.parse(localStorage.getItem('users')) || [];
        const user = users[index];
        if (user) {
            const newNombres = prompt('Ingrese nuevos nombres:', user.nombres);
            const newApellidos = prompt('Ingrese nuevos apellidos:', user.apellidos);
            const newDireccion = prompt('Ingrese nueva dirección:', user.direccion);
            const newTelefono = prompt('Ingrese nuevo teléfono:', user.telefono);
            const newCargo = prompt('Ingrese nuevo cargo:', user.cargo);
            const newPassword = prompt('Ingrese nueva contraseña:', user.password);

            users[index] = { ...user, nombres: newNombres, apellidos: newApellidos, direccion: newDireccion, telefono: newTelefono, cargo: newCargo, password: newPassword };
            localStorage.setItem('users', JSON.stringify(users));
            displayUsers(users);
        }
    };

    window.deleteUser = function(index) {
        const users = JSON.parse(localStorage.getItem('users')) || [];
        users.splice(index, 1);
        localStorage.setItem('users', JSON.stringify(users));
        displayUsers(users);
    };
});

