const express = require('express')
const bodyParser = require('body-parser')
const mongoose = require('mongoose')

const purchaseRoutes = require('./routes/purchase-routes')
const usersRoutes = require('./routes/users-routes')
const saleRoutes = require('./routes/sale-routes')
const maintainanceRoutes = require ('./routes/maintainance-routes')
const app = express()

app.use((req, res, next) => {
    res.setHeader('Access-Control-Allow-Origin', '*')
    res.setHeader(
        'Access-Control-Allow-Headers',
        'Origin, X-Requested-With, Content-type, Accept, Authorization'
    )
    res.setHeader('Access-Control-Allow-Methods', 'get, post, patch, delete')
    next()
})

app.use(bodyParser.json())

app.use('/api/users', usersRoutes)
app.use('/api/purchase', purchaseRoutes)
app.use('/api/sale', saleRoutes)
app.use('/api/maintainance',maintainanceRoutes)


app.use((req, res, next) => {
    const error = res.status(404).json({error:'Could not find this route.'})
    throw error
})


mongoose
.connect(`mongodb+srv://${process.env.DB_USER}:${process.env.DB_PASSWORD}@cluster0.st5bw.mongodb.net/${process.env.DB_NAME}?retryWrites=true&w=majority`, { useNewUrlParser: true })
.then(() => {
        app.listen(5000)
    })
    .catch(err => {
        console.log(err)
    })
