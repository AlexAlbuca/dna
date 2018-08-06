const sqlite3 = require('sqlite3')

new Promise(function (resolve, reject) {
        let db = new sqlite3.Database('db/dna.db', (err) => {
            if (err) {
                console.error(err.message);
            }
            console.log('Connected to the dna database.');

        });
        resolve(db);
    })
    .then(function (db) {
        var tableName = "environment";
        db.run(`CREATE TABLE ${tableName}(id  INTEGER PRIMARY KEY AUTOINCREMENT, key TEXT NOT NULL);`);
        return db;
    })
    .then(function (db) {
        tableName = "os";
        db.run(`CREATE TABLE ${tableName}(id  INTEGER PRIMARY KEY AUTOINCREMENT, key TEXT NOT NULL);`);
        return db;
    })
    .then(function (db) {
        tableName = "flavor";
        db.run(`CREATE TABLE ${tableName}(id  INTEGER PRIMARY KEY AUTOINCREMENT, key TEXT NOT NULL);`);
        return db;
    })
    .then(function (db) {
        tableName = "tenent";
        db.run(`CREATE TABLE ${tableName}(id  INTEGER PRIMARY KEY AUTOINCREMENT, key TEXT NOT NULL);`);
        return db;
    })
    .then(function (db) {
        tableName = "lb_profile_session";
        db.run(`CREATE TABLE ${tableName}(id  INTEGER PRIMARY KEY AUTOINCREMENT, key TEXT NOT NULL);`);
        return db;
    })
    .then(function (db) {
        tableName = "network";
        db.run(`CREATE TABLE ${tableName}(id  INTEGER PRIMARY KEY AUTOINCREMENT, key TEXT NOT NULL);`);
        return db;
    })
    .then(function (db) {
        tableName = "diagram";
        db.run(`CREATE TABLE ${tableName} (id  TEXT NOT NULL, xml TEXT NOT NULL,
		tag TEXT, description TEXT NOT NULL, author TEXT NOT NULL, lastmodified DATETIME NOT NULL, PRIMARY KEY(id, lastmodified));`);
        return db;
    })
    .then(function (db) {
        db.close((err) => {
            if (err) {
                return console.error(err.message);
            }
            console.log('Close the database connection.');
        });
    });


/*
tableName = "flavor";
db.each((`SELECT name FROM sqlite_master WHERE type='table' AND name='${tableName}'`), function (err, row) {
    if (row == undefined)
        db.run(`CREATE TABLE ${tableName}(id  INTEGER PRIMARY KEY AUTOINCREMENT, key TEXT NOT NULL);`);
});

db.each(("SELECT name FROM sqlite_master WHERE type='table'"), function (err, row) {
    console.log("LIST: ");
    console.log(row);
    console.log(err);

});
*/
