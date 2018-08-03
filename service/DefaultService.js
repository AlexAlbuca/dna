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

    db.serialize(function () {

        db.each(`SELECT id, tag, description, author, lastmodified FROM diagram`, function (err, row) {
            result.push(row);
        }, function () {
            db.close();
        });

    });

    var  sendData = {};
    sendData['application/json'] = result;

    if (Object.keys(sendData).length > 0) {
      resolve(sendData[Object.keys(sendData)[0]]);
    } else {
      resolve();
    }
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
    var examples = {};
    examples['application/json'] = {
  "data_criacao" : "data_criacao",
  "xml" : "xml",
  "id" : 0,
  "autor" : "autor",
  "descricao" : "descricao"
};
    if (Object.keys(examples).length > 0) {
      resolve(examples[Object.keys(examples)[0]]);
    } else {
      resolve();
    }
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
    resolve();
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

