import express from 'express'
import routes from './routes'
import cors from 'cors'

const port = process.env.PORT || 3333
const app = express()

app.use(cors()) // enable cors
app.use(express.json()) // parse the json body of the requests 
app.use(routes) // setup the routes

app.listen(port) // start the server
console.log(`Listen on PORT ${port}`)