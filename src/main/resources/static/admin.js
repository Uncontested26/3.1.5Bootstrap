const url = 'http://localhost:8080/api/admin';

function getAllUser() {
    fetch(url)
        .then(res => res.json())
        .then(data => loadTable(data))
}

function loadTable(listAllUsers) {
    let res = '';

    for (let user of listAllUsers) {
        res +=
            `<tr>
                <td>${user.id}</td>
                <td>${user.name}</td>
                <td>${user.lastName}</td>
                <td>${user.age}</td>
                <td>${user.email}</td>
                <td>${user.roles.map(r => r.name.replace('ROLE_', '')).join(' ')}</td>
                <td>
                    <button class="btn btn-info" type="button"
                    data-bs-toggle="modal" data-bs-target="#editModal"
                    onclick="editModal(${user.id})">Edit</button></td>
                <td>
                    <button class="btn btn-danger" type="button"
                    data-bs-toggle="modal" data-bs-target="#deleteModal"
                    onclick="deleteModal(${user.id})">Delete</button></td>
            </tr>`
    }
    document.getElementById('tableBodyAdmin').innerHTML = res;
}
getAllUser();


document.getElementById('newUserForm').addEventListener('submit', (e) => {
    e.preventDefault()
    let role = document.getElementById("newRole")
    let roleAddUser = []
    let rolesAddUserValue = ''
    for (let i = 0; i < role.options.length; i++) {
        if (role.options[i].selected) {
            roleAddUser.push({id: role.options[i].value, name: 'ROLE_' + role.options[i].innerHTML})
            rolesAddUserValue += role.options[i].innerHTML
        }
    }

    fetch(url, {
        method: 'POST',
        headers: {'Content-Type': "application/json"},
        body: JSON.stringify({
            name: document.getElementById('newName').value,
            lastName: document.getElementById('newLastName').value,
            age: document.getElementById('newAge').value,
            email: document.getElementById('newEmail').value,
            password: document.getElementById('newPassword ').value,
            roles: roleAddUser
        })

    })
        .then((response) => {
            if (response.ok) {
                getAllUser()
                document.getElementById("all-users-tab").click()

            }
        })
})


function closeModal() {
    document.querySelectorAll(".btn-close").forEach((btn) => btn.click())
}


function editModal(id) {
    fetch(url + '/' + id,
        {
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json;charset=UTF-8'
            }
        }).then(res => {
        res.json().then(user => {
            document.getElementById('editId').value = user.id;
            document.getElementById('editName').value = user.name;
            document.getElementById('editLastName').value = user.lastName;
            document.getElementById('editAge').value = user.age;
            document.getElementById('editEmail').value = user.email;
            document.getElementById('editPassword').value = "****";

        })
    })
}


async function editUser() {
    let idValue = document.getElementById('editId').value;
    let nameValue = document.getElementById('editName').value;
    let lastNameValue = document.getElementById('editLastName').value;
    let ageValue = document.getElementById('editAge').value;
    let emailValue = document.getElementById('editEmail').value;
    let passwordValue = document.getElementById('editPassword').value;
    let role = document.getElementById('editRoles')
    let roles = [];
    for (let i = 0; i < role.options.length; i++) {
        if (role.options[i].selected) {
            roles.push({id: role.options[i].value, name: 'ROLE_' + role.options[i].innerHTML})
        }
    }
    let user = {
        id: idValue,
        name: nameValue,
        lastName: lastNameValue,
        age: ageValue,
        email: emailValue,
        password: passwordValue,
        roles: roles
    }
    await fetch(url + '/' + user.id, {
        method: "PATCH",
        headers: {
            'Accept': 'application/json',
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(user)
    });
    closeModal()
    getAllUser()
}

function deleteModal(id) {
    fetch(url + '/' + id, {
        headers: {
            'Accept': 'application/json',
            'Content-Type': 'application/json;charset=UTF-8'
        }
    }).then(res => {
        res.json().then(user => {
            document.getElementById('deleteId').value = user.id;
            document.getElementById('deleteName').value = user.name;
            document.getElementById('deleteLastName').value = user.lastName;
            document.getElementById('deleteAge').value = user.age;
            document.getElementById('deleteEmail').value = user.email;

        })
    });
}

async function deleteUser() {
    const id = document.getElementById('deleteId').value
    let urlDel = url + "/" + id;
    let method = {
        method: 'DELETE',
        headers: {
            "Content-Type": "application/json"
        }
    }
    fetch(urlDel, method).then(() => {
        closeModal()
        getAllUser()
    })
}











