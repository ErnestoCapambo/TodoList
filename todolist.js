const conteudo=document.createElement("table"),form=document.querySelector(".formulario");form.addEventListener("submit",function(a){a.preventDefault();const b=document.querySelector("#nome").value;if(localStorage.listuser){let a=JSON.parse(localStorage.listuser);if(0<a.length){const c=a[a.length-1],d=c.id+1,e=a.concat({id:d,nome:b});localStorage.setItem("listuser",JSON.stringify(e))}else{const a=JSON.parse(localStorage.listuser),c=a.concat({id:1,nome:b});localStorage.setItem("listuser",JSON.stringify(c))}}else localStorage.setItem("listuser",JSON.stringify([{id:1,nome:b}]));mostrarDados()});function mostrarDados(){const a=localStorage.listuser;if(a){const b=JSON.parse(a),c=document.querySelector("body");conteudo.className="tabela",conteudo.innerHTML="",conteudo.innerHTML=`
            <tr>
                <th>Id</th>
                <th>Nome</th>
                <th>Botao</th>
            </tr>
        `,c.appendChild(conteudo);for(let a=0;a<b.length;a++){const c=b[a],d=`
                <tr>
                    <td>${c.id}</td>
                    <td>${c.nome}</td>
                    <td><button type="submit" onclick="eliminarUsuario(${c.id})">Eliminar</button></td>
                </tr>
            `;conteudo.innerHTML+=d}}}function eliminarUsuario(a){const b=JSON.parse(localStorage.listuser),c=b.filter(b=>b.id!==a);localStorage.listuser=JSON.stringify(c),mostrarDados()}window.onload=mostrarDados;