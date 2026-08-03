const botao = document.getElementById("btnEnviar");
const email = document.getElementById("email");
const mensagem = document.getElementById("mensagem");

botao.addEventListener("click", function(){

    if(email.value.trim() === ""){
        mensagem.style.color="red";
        mensagem.innerHTML="Digite um e-mail.";
        return;
    }

    if(!email.value.includes("@")){
        mensagem.style.color="red";
        mensagem.innerHTML="E-mail inválido.";
        return;
    }

    mensagem.style.color="green";
    mensagem.innerHTML="Código enviado com sucesso!";
});