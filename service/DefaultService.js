'use strict';
var dbconn = require("../dataservices/dbconnection")

/**
 * Retorna uma lista de desenhos
 *
 * descricao String  (optional)
 * returns List
 **/
exports.desenhosGET = function(descricao) {
  return new Promise(function(resolve, reject) {

    const sqlite3 = require('sqlite3').verbose()
    var result = [];

    var db = dbconn.createConn();

    descricao = descricao + "%";
    db.serialize(function () {

        db.each(`SELECT id, xml, tag, description as descricao, author as autor, lastmodified as data_criacao FROM diagram where description like ?`, [ descricao ], function (err, row) {
            result.push(row);
        }, function () {
            db.close();
	    var  sendData = {};
	    sendData['application/json'] = result;

	    if (Object.keys(sendData).length > 0) {
	      resolve(sendData[Object.keys(sendData)[0]]);
	    } else {
	      resolve();
	    }
        });

    });

  });
}

/**
 * Retorna um desenho específico
 *
 * id String 
 * returns desenho
 **/
exports.desenhosIdGET = function(id) {
  return new Promise(function(resolve, reject) {

    const sqlite3 = require('sqlite3').verbose()
    var result = null;

    var db = dbconn.createConn();

    db.serialize(function () {

        db.get(`SELECT id, xml FROM diagram where id = ?`, [id] , function (err, row) {
            result = row;
            db.close();
	    var  sendData = {};
	    sendData['application/json'] = result;

	    if (Object.keys(sendData).length > 0) {
	      resolve(sendData[Object.keys(sendData)[0]]);
	    } else {
	      resolve();
	    }
        });
    });

 });
}


/**
 * Salva um desenho
 *
 * desenho Desenho_novo 
 * no response value expected for this operation
 **/
exports.desenhosPOST = function(desenho) {
  return new Promise(function(resolve, reject) {

    const sqlite3 = require('sqlite3').verbose()
    var result = [];
    var shortid = require('shortid');

    var db = dbconn.createConn(); 

    if (desenho.id == 0){
        desenho.id = shortid.generate();
    }
    console.log(desenho);
db.serialize(function () {

        db.run(`INSERT  OR IGNORE INTO diagram (id, xml, tag, description, author, lastmodified) VALUES(?,?,?,?,?,?)`,[desenho.id, desenho.xml, 'desenho', desenho.descricao, 'author', Date.now()], function (err) {
		console.log(err);
                db.close();
                resolve();
	    }
        );

    });

  });
}


/**
 * Retorna um xlsx com a ReqInfra
 *
 * xml String 
 * no response value expected for this operation
 **/
exports.exportacoesReqinfraPOST = function(xml) {
  return new Promise(function(resolve, reject) {
    resolve();
  });
}

