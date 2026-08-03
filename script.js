const btnEntrar = document.getElementById("btn-entrar");
const btnComecar = document.getElementById("btn-comecar");
const btnCriarConta = document.getElementById("btn-criar-conta");
const btnEsqueceuSenha = document.getElementById("btn-esqueceu-senha");

if (btnEntrar) {
    btnEntrar.addEventListener("click", function () {
        window.location.href = "login.html";
    });
}

if (btnComecar) {
    btnComecar.addEventListener("click", function () {
        window.location.href = "login.html";
    });
}

if (btnCriarConta) {
    btnCriarConta.addEventListener("click", function () {
        window.location.href = "cadastro.html";
    });
}

if (btnEsqueceuSenha) {
    btnEsqueceuSenha.addEventListener("click", function (event) {
        event.preventDefault();
        window.location.href = "esqueceu-senha.html";
    });
}