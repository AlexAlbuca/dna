'use strict';
var dbconn = require("../dataservices/dbconnection")

    const sqlite3 = require('sqlite3').verbose()
    var result = [];
    var shortid = require('shortid');

    var db = dbconn.createConn(); 

	var desenho = {
	"id" : "dwewrtf",
	"xml" : "teste",
	"description" : "testes"
};


    if (desenho.id == 0){
        desenho.id = shortid.generate();
    }
    console.log(desenho);
    db.serialize(function () {
        db.run(`INSERT  OR IGNORE INTO diagram (id, xml, tag, description, author, lastmodified) VALUES(?,?,?,?,?,?)`,[desenho.id, desenho.xml, 'desenho', desenho.description, 'author', Date.now()], function (err) {
		console.log(err);
                db.close();
                resolve();
	    }
        );

    });

