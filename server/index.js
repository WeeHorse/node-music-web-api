// server port
const port = 3000

// express server
const express = require('express')
const app = express()

// add body-parser to express
const bodyParser = require('body-parser')
// register as middleware
app.use( bodyParser.json() )

// add cookie-parser to express
const cookieParser = require('cookie-parser')
// register as middleware
app.use(cookieParser())

// add express-session to express
const session = require('express-session')
// register as middleware
app.use( session( {
  secret: 'keyboard cat boddyfollymeskaweq456',
  resave: false,
  saveUninitialized: true,
  cookie: { secure: false } // ändra till true för secure cookie (felsöka behövs här nu)
} ) )

// mysql
const mysql = require('mysql');
const db = mysql.createConnection({
  host     : '127.0.0.1',
  user     : 'root',
  password : 'mysql',
  database : 'nodemusic'
});
// vi gör om mysql-metoderna connect och query till promise-metoder så att vi kan använda async/await för att vänta på databasen
const util = require('util')
db.connect = util.promisify(db.connect)
db.query = util.promisify(db.query)

// load apis / endpoints

require('./youtube-rest-endpoints.js')(app, db)

require('./data-rest-endpoints.js')(app, db)


// example client
const path = require('path')
app.use(express.static(path.join(__dirname, '../example-client')))

// start the server
app.listen(3000, async () => {
  await db.connect()
  console.log('server running on port 3000')
})


