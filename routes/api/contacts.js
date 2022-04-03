const express = require('express')
const contactModel = require('../../db/contacts')
const routes = express.Router()
const { schemaAddContact, schemaUpdayContact } = require('./validation-schems')
const { validationBody } = require('../../middlewares/validation')

routes.get('/', async(req, res, next) => {
    const contacts = await contactModel.listContacts()
    res.json({ status: 'success', code: 200, payload: { contacts } })
})

routes.get('/:contactId', async(req, res, next) => {
    const contact = await contactModel.getContactById(req.params.contactId)
    if (contact) {
        return res.json({ status: 'success', code: 200, payload: { contact } })
    }
    return res
        .status(404)
        .json({ status: 'error', code: 404, message: 'NOT FOUND' })
})

routes.post('/', validationBody(schemaAddContact), async(req, res, next) => {
    const contact = await contactModel.addContact(req.body)
    res.status(201).json({ status: 'success', code: 201, payload: { contact } })
})

routes.delete('/:contactId', async(req, res, next) => {
    const contact = await contactModel.removeContact(req.params.contactId)
    if (contact) {
        return res.json({ status: 'success', code: 200, payload: { contact } })
    }
    return res
        .status(404)
        .json({ status: 'error', code: 404, message: 'NOT FOUND' })
})

routes.put('/:contactId', validationBody(schemaUpdayContact), async(req, res, next) => {
    const contact = await contactModel.updayContact(req.params.contactId, req.body)
    if (contact) {
        return res.json({ status: 'success', code: 200, payload: { contact } })
    }
    return res
        .status(404)
        .json({ status: 'error', code: 404, message: 'NOT FOUND' })
})

module.exports = routes