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
        tableName = "network";
        db.run(`INSERT OR IGNORE INTO ${tableName} (key) VALUES (?)`, "Corporativa");
        db.run(`INSERT OR IGNORE INTO ${tableName} (key) VALUES (?)`, "Mainframe");
        db.run(`INSERT OR IGNORE INTO ${tableName} (key) VALUES (?)`, "RAI" );
        db.run(`INSERT OR IGNORE INTO ${tableName} (key) VALUES (?)`, "RAE" );
        return db;
    })
    .then(function (db) {
        tableName = "diagram";
        db.run(`INSERT OR IGNORE INTO ${tableName} (tag, description, author, lastmodified) VALUES (?,?,?,?)`, "web,IIS,Windows", "Arquitetura de referência Web", "Marcus Almendro", 1529065428452);
        db.run(`INSERT OR IGNORE INTO ${tableName} (tag, description, author, lastmodified) VALUES (?,?,?,?)`, "Tomcat,Linux", "Desenho do Alex", "Alex Albuquerque", 1529065428452);
        db.run(`INSERT OR IGNORE INTO ${tableName} (tag, description, author, lastmodified) VALUES (?,?,?,?)`, "Linux, Hadoop, BI", "Hadoop Arch", "Fernando Cardo", 1529065428452);
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
