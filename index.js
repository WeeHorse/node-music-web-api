let express = require('express')
const app = express()

// läser in modulen body-parser
const bodyParser = require('body-parser')
// registrerar den som middleware
app.use( bodyParser.json() )

// läser in modulen...
let cookieParser = require('cookie-parser')
// registrerar den som middleware
app.use(cookieParser())

// läser in module...
let session = require('express-session')
// registrerar den som middleware
app.use( session( {
  secret: 'keyboard cat boddyfollymeskaweq456',
  resave: false,
  saveUninitialized: true,
  cookie: { secure: false } // ändra till true för secure cookie (felsöka behövs här nu)
} ) )

// läser in mysql
const mysql = require('mysql');
const db = mysql.createConnection({
  host     : '127.0.0.1',
  user     : 'root',
  password : 'mysql',
  database : 'receptia'
});
// vi gör om metoderna connect och query till promise-metoder så att vi kan använda async/await för att vänta på databasen
const util = require('util')
db.connect = util.promisify(db.connect)
db.query = util.promisify(db.query)




// starta servern
app.listen(3000, async () => {
  await db.connect()
  console.log('server running on port 3000')
})


