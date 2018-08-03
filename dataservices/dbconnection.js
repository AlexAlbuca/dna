module.exports = {
 
    createConn: function () {

        const sqlite3 = require('sqlite3').verbose()
        var result = [];

        let dbConnect = new sqlite3.Database('db/dna.db', (err) => {
            if (err) {
                console.error(err.message);
            }
            console.log('Connected to the dna database.');
        });
        return dbConnect

    }

}
