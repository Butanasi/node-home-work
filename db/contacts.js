const fs = require('fs/promises')
const path = require('path')
const { randomUUID } = require('crypto')
const DB = require('./db')
const db = new DB('./contacts.json')


async function listContacts() {
    return await db.read()
}

async function getContactById(contactId) {
    const contacts = await db.read()
    const getContact = contacts.find((contact) => contact.id === contactId)
    return getContact
}


async function removeContact(contactId) {
    const contacts = await db.read()
    const index = contacts.findIndex((contact) => contact.id === contactId)
    if (index === -1) {
        return null
    }
    const [deleteContact] = contacts.splice(index, 1)
    await db.write(contacts)
    return deleteContact

}

async function addContact(body) {
    const contact = await db.read()
    const newContact = { id: randomUUID(), ...body }
    contact.push(newContact)
    await db.write(contact)
    return newContact
}

async function updayContact(contactId, body) {
    const contacts = await db.read()
    const index = contacts.findIndex((contact) => contact.id === contactId)
    if (index === -1) {
        return null
    }
    contacts[index] = {...contacts[index], ...body }
    await db.write(contacts)
    return contacts[index]
}


module.exports = {
    listContacts,
    getContactById,
    removeContact,
    addContact,
    updayContact
}