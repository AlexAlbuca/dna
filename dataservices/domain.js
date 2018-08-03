var http = require('http');
var express = require('express');
var routes = express.Router();
var dbconn = require("./dbconnection")


function listAll(domainName, res) {

    const sqlite3 = require('sqlite3').verbose()
    var result = [];

    var db = dbconn.createConn();
    /*
        let db = new sqlite3.Database('./db/dna.db', (err) => {
            if (err) {
                console.error(err.message);
            }
            console.log('Connected to the dna database.');
        });
    */
    db.serialize(function () {

        db.each(`SELECT id, key FROM ${domainName}`, function (err, row) {
            result.push(row);
        }, function () {
            db.close();
            console.log(result);
            res.send(result);
        });

    });
}

function searchItembyKey(domainName, key, res) {
    var db = dbconn.createConn();
    var result = [];

    db.serialize(function () {

        db.each(`SELECT id, key FROM ${domainName} where key = ${key}`, function (err, row) {
            result.push(row);
        }, function () {
            db.close();
            console.log(result);
            res.send(result);
        });

    });
}

function searchItembyID(domainName, id, res) {
    var db = dbconn.createConn();
    var result = [];

    db.serialize(function () {

        db.each(`SELECT id, key FROM ${domainName} where id = ${id}`, function (err, row) {
            result.push(row);
        }, function () {
            db.close();
            console.log(result);
            res.send(result);
        });

    });
}

routes.route('/v1.0/network').get(function (req, res, next) {
    listAll("network", res);
});

routes.route('/v1.0/network').post(function (req, res, next) {
    searchItembyID("network", req.body.id, res);
});

routes.route('/v1.0/flavor').get(function (req, res, next) {
    listAll('flavor', res);
});


module.exports = routes;