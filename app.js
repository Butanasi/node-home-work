const express = require('express')
const logger = require('morgan')
const cors = require('cors')

const contactsRouter = require('./routes/api/contacts')

const app = express()

const formatLogger = app.get('env') === 'development' ? 'dev' : 'short'

app.use(logger(formatLogger))
app.use(cors())
app.use(express.json())

app.use((req, res, next) => {
    console.log(process.version)
    next()
})

app.use('/api/contacts', contactsRouter)

app.use((req, res) => {
    res.status(404).json({ message: 'Contacts not found' })
})

app.use((err, req, res, next) => {
    res.status(500).json({ message: err.message })
})

module.exports = app