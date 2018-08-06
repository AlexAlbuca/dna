module.exports = {
 
    createConn: function () {

        const path = require('path');
        const sqlite3 = require('sqlite3').verbose()
        var result = [];
	
	var dbpath = path.join(__dirname, '../db/dna.db')
        
	console.log(dbpath);

	let dbConnect = new sqlite3.Database(dbpath, (err) => {
            if (err) {
                console.error(err.message);
            }
            console.log('Connected to the dna database.');
        });
        return dbConnect

    }

}
