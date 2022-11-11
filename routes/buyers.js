const express = require('express');
const mysql = require('mysql');
const router = express.Router();
const cors = require('cors');

const db = mysql.createConnection({
    host: "localhost",
    port: 3306,
    user: 'root',
    password: 'Smcti@2022',
    database: 'raffle_pj'
});



router.get('/', function(req, res) {
    let query = "select * from buyers";
    res.send(
        db.query(query, (err, res)=>{
            if (err) {
                console.log("error: ", err);
                result(null, err);
                return;
              }
              console.log(res);
              return res.toString();
        })    
    )
    

});
   
    







db.connect(function(err) {
    if (err) throw err;
    console.log("Database Connected!");
  });

router.get('/:id/:name/:cellphone/:id_seller', (req, res, next) =>{
    const data = {
        "id" : req.params.id,
        "name" : req.params.name,
        "cellphone" : req.params.cellphone,
        "id_seller" : req.params.id_seller
    }
        res.status(200).send({
            message: "Deu boa",
            data : data
        });
});

router.post('/', (req, res, next) =>{
    const data = {
        "id" : req.body.id,
        "name" : req.body.name,
        "cellphone" : req.body.cellphone,
        "id_seller" : req.body.id_seller
    }
    try {
        db.query('insert into buyers set ?',{
            id : data.id,
            name : data.name.toString(),
            cellphone : data.cellphone.toString(),
            id_seller : data.id_seller.toString()
        })
    } catch (error) {
        console.log(error);
    }
   

    res.status(201).send({
        mensagem: "post pedidos"
    });
    
});

module.exports = router;