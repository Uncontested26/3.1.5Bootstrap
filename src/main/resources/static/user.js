const userUrl = 'http://localhost:8080/api/user';

function getUser(){
    fetch(userUrl)
        .then(res => res.json())
        .then(data =>
    getInformation(data))
}


function getInformation(user){

    let res = '';
    res+=
    `<tr>
            <td>${user.id}</td>
            <td>${user.name}</td>
            <td>${user.lastName}</td>
            <td>${user.age}</td>
            <td>${user.email}</td>
            <td>${user.roles.map(r => r.name.replace('ROLE_', '')).join(' ')}</td>
        </tr>`
    document.getElementById("basicTable").innerHTML= res;

}
getUser();
