const express = require('express');
const app = express();


const routeBuyers = require("./routes/buyers");

app.use(express.json());
app.use(express.urlencoded({
    extended : true
}))
app.use('/buyers', routeBuyers);


app.use((req, res, next) =>{
    const error = new Error("Não encontrado");
    error.status = 404;
    next(error);
});

app.use((error, req, res, next) =>{
    res.status(error.status || 500);
    return res.send({
        mensagem: error.message
    });
});

module.exports = app;