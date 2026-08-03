const express = require("express");
const cors = require("cors");
const nodemailer = require("nodemailer");

const app = express();

app.use(cors());
app.use(express.json());

const codigos = {};

const transporter = nodemailer.createTransport({

    service: "gmail",

    auth: {

        user: "seuemail@gmail.com",

        pass: "SENHA_DE_APP"

    }

});

// Enviar código
app.post("/esqueci-senha", async (req, res) => {

    const { email } = req.body;

    const codigo = Math.floor(100000 + Math.random() * 900000).toString();

    codigos[email] = codigo;

    await transporter.sendMail({

        from: "seuemail@gmail.com",

        to: email,

        subject: "Recuperação de senha",

        html: `<h1>${codigo}</h1>`

    });

    res.json({
        sucesso: true
    });

});

// Verificar código
app.post("/verificar-codigo", (req, res) => {

    const { email, codigo } = req.body;

    if (codigos[email] === codigo) {

        res.json({
            valido: true
        });

    } else {

        res.json({
            valido: false
        });

    }

});

// Reenviar código
app.post("/reenviar-codigo", async (req, res) => {

    const { email } = req.body;

    const novoCodigo = Math.floor(100000 + Math.random() * 900000).toString();

    codigos[email] = novoCodigo;

    await transporter.sendMail({

        from: "seuemail@gmail.com",

        to: email,

        subject: "Novo código",

        html: `<h1>${novoCodigo}</h1>`

    });

    res.json({
        sucesso: true
    });

});

app.listen(3000, () => {

    console.log("Servidor rodando na porta 3000");

});