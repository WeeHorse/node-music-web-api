module.exports = (app, db) => {


  // authentication: perform login
app.post('/api/login', async (request, response) => {
  let user = await db.query('SELECT * FROM users WHERE email = ? AND password = ?', [request.body.email, request.body.password])
  user = user[0]

  if(user && user.email){
    request.session.user = user
    user.loggedIn = true
    response.json({loggedIn: true})
  }else{
    response.status(401) // unauthorized  https://en.wikipedia.org/wiki/List_of_HTTP_status_codes
    response.json({message:"no matching user"})
  }
})

// authentication: get logged in user
app.get('/api/login', async (request, response) => {
  let user
  if(request.session.user){
    user = await db.query('SELECT * FROM users WHERE email = ? AND password = ?', [request.session.user.email, request.session.user.password])
    user = user[0]
  }
  if(user && user.email){
    user.loggedIn = true
    delete(user.password)
    response.json(user)
  }else{
    response.status(401) // unauthorized  https://en.wikipedia.org/wiki/List_of_HTTP_status_codes
    response.json({message:"not logged in"})
  }
})

// logga ut
app.delete('/api/login', async (request, response) => {
  request.session.destroy( () => {
    response.json({loggedIn: false})
  } )
})


}

