const btnEntrar = document.getElementById("btn-entrar");
const btnComecar = document.getElementById("btn-comecar");
const btnCriarConta = document.getElementById("btn-criar-conta");

if (btnEntrar) {
    btnEntrar.addEventListener("click", () => {
        window.location.href = "login.html";
    });
}

if (btnComecar) {
    btnComecar.addEventListener("click", () => {
        window.location.href = "login.html";
    });
}

if (btnCriarConta) {
    btnCriarConta.addEventListener("click", () => {
        window.location.href = "cadastro.html";
    });
}

