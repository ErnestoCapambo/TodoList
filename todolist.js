const conteudo = document.createElement("table");
const form = document.querySelector(".formulario");

form.addEventListener("submit", function(event) {
    event.preventDefault();
    const nome = document.querySelector("#nome").value;

    if (localStorage.listuser) {
        let userList = JSON.parse(localStorage.listuser);
        if (userList.length > 0) {
            const lastUser = userList[userList.length - 1];
            const id = lastUser.id + 1;
            userList = userList.concat({ id: id, nome: nome });
            localStorage.setItem("listuser", JSON.stringify(userList));
        } else {
            userList = userList.concat({ id: 1, nome: nome });
            localStorage.setItem("listuser", JSON.stringify(userList));
        }
    } else {
        localStorage.setItem("listuser", JSON.stringify([{ id: 1, nome: nome }]));
    }

    mostrarDados();
});

function mostrarDados() {
    const userListString = localStorage.listuser;
    if (userListString) {
        const userList = JSON.parse(userListString);
        const body = document.querySelector("body");
        conteudo.className = "tabela";
        conteudo.innerHTML = "";
        conteudo.innerHTML = `
            <tr>
                <th>Id</th>
                <th>Nome</th>
                <th>Botao</th>
            </tr>
        `;
        body.appendChild(conteudo);

        for (let i = 0; i < userList.length; i++) {
            const user = userList[i];
            const row = `
                <tr>
                    <td>${user.id}</td>
                    <td>${user.nome}</td>
                    <td><button type="submit" onclick="eliminarUsuario(${user.id})">Eliminar</button></td>
                </tr>
            `;
            conteudo.innerHTML += row;
        }
    }
}

function eliminarUsuario(id) {
    const userList = JSON.parse(localStorage.listuser);
    const updatedList = userList.filter(user => user.id !== id);
    localStorage.listuser = JSON.stringify(updatedList);
    mostrarDados();
}

window.onload = mostrarDados;
