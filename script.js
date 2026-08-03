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

const codigo = Math.floor(100000 + Math.random() * 900000).toString();

const nodemailer = require("nodemailer");

const transporter = nodemailer.createTransport({
    service: "gmail",
    auth: {
        user: "seuemail@gmail.com",
        pass: "senha-de-app"
    }
});

await transporter.sendMail({
    from: "seuemail@gmail.com",
    to: email,
    subject: "Recuperação de senha",
    html: `
        <h2>Seu código é:</h2>
        <h1>${codigo}</h1>
        <p>Ele expira em 10 minutos.</p>
    `
});

app.post("/esqueci-senha", async (req, res) => {

    const { email } = req.body;

    const codigo = Math.floor(100000 + Math.random() * 900000).toString();

    // salvar no banco
    await db.query(
        "UPDATE usuarios SET codigo=?, expiracao=DATE_ADD(NOW(), INTERVAL 10 MINUTE) WHERE email=?",
        [codigo, email]
    );

    await transporter.sendMail({
        from: "seuemail@gmail.com",
        to: email,
        subject: "Código de recuperação",
        html: `<h1>${codigo}</h1>`
    });

    res.json({
        sucesso: true
    });

});

app.post("/verificar-codigo", async (req, res) => {

    const { email, codigo } = req.body;

    const [usuario] = await db.query(
        "SELECT * FROM usuarios WHERE email=?",
        [email]
    );

    if (
        usuario.codigo === codigo &&
        new Date(usuario.expiracao) > new Date()
    ){
        return res.json({
            valido: true
        });
    }

    res.json({
        valido: false
    });

});

app.post("/reenviar-codigo", async (req, res) => {

    const { email } = req.body;

    const novoCodigo = Math.floor(100000 + Math.random() * 900000).toString();

    await db.query(
        "UPDATE usuarios SET codigo=?, expiracao=DATE_ADD(NOW(), INTERVAL 10 MINUTE) WHERE email=?",
        [novoCodigo, email]
    );

    await transporter.sendMail({
        from: "seuemail@gmail.com",
        to: email,
        subject: "Novo código de recuperação",
        html: `<h1>${novoCodigo}</h1>`
    });

    res.json({
        sucesso: true
    });

});