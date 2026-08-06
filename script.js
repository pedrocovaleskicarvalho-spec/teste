
// Página inicial
const btnEntrar = document.getElementById("btn-entrar");
const btnComecar = document.getElementById("btn-comecar");
const btnCriarConta = document.getElementById("btn-criar-conta");
 
const btn = document.getElementById("btnEnviar");
const email = document.getElementById("email");
 
// Página de recuperação de senha
if (btn && email) {
    btn.addEventListener("click", () => {
 
        if (email.value.trim() === "") {
            alert("Digite seu e-mail.");
            return;
        }
 
        // Aqui futuramente você enviará o código pelo backend
        localStorage.setItem("emailRecuperacao", email.value);
 
        window.location.href = "verificar-codigo.html";
    });
}
 
// Botão Entrar
if (btnEntrar) {
    btnEntrar.addEventListener("click", () => {
        window.location.href = "login.html";
    });
}
 
// Botão Começar Agora
if (btnComecar) {
    btnComecar.addEventListener("click", () => {
        window.location.href = "login.html";
    });
}
 
// Botão Criar Conta
if (btnCriarConta) {
    btnCriarConta.addEventListener("click", () => {
        window.location.href = "login.html?form=cadastro";
    });
}
 
// Página de login
const btnEsqueceuSenha = document.getElementById("btn-esqueceu-senha");

if (btnEsqueceuSenha) {
    btnEsqueceuSenha.addEventListener("click", (e) => {
        e.preventDefault();
        window.location.href = "esqueceu-senha.html";
    });
}

// Página esqueceu-senha
const btnEnviarCodigo = document.getElementById("btn-enviar-codigo");

if (btnEnviarCodigo) {

    btnEnviarCodigo.addEventListener("click", async () => {

        const email = document.getElementById("email").value;

        const resposta = await fetch("http://localhost:3000/esqueci-senha", {
            method: "POST",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify({ email })
        });

        const dados = await resposta.json();

        if (dados.sucesso) {

            localStorage.setItem("email", email);

            window.location.href = "verificar-email.html";

        } else {

            alert("Não foi possível enviar o código.");

        }

    });

}

// Página verificar-email
const btnVerificarCodigo = document.getElementById("btn-verificar-codigo");

if (btnVerificarCodigo) {

    btnVerificarCodigo.addEventListener("click", async () => {

        const codigo = document.getElementById("codigo").value;

        const email = localStorage.getItem("email");

        const resposta = await fetch("http://localhost:3000/verificar-codigo", {

            method: "POST",

            headers: {
                "Content-Type": "application/json"
            },

            body: JSON.stringify({
                email,
                codigo
            })

        });

        const dados = await resposta.json();

        if (dados.valido) {

            window.location.href = "nova-senha.html";

        } else {

            alert("Código inválido.");

        }

    });

}

// Reenviar código
const btnReenviar = document.getElementById("btn-reenviar");

if (btnReenviar) {

    btnReenviar.addEventListener("click", async () => {

        const email = localStorage.getItem("email");

        const resposta = await fetch("http://localhost:3000/reenviar-codigo", {

            method: "POST",

            headers: {
                "Content-Type": "application/json"
            },

            body: JSON.stringify({ email })

        });

        const dados = await resposta.json();

        if (dados.sucesso) {

            alert("Novo código enviado.");

        }

    });

}

