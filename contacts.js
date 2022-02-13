const fs = require('fs/promises')
const path = require('path')
const { randomUUID } = require('crypto')

const readContent = async() => {
    const content = await fs.readFile(
        path.join(__dirname, 'db', 'contacts.json'),
        'utf8',
    )
    const result = JSON.parse(content)
    return result
}

async function listContacts() {
    return await readContent()
}

async function getContactById(contactId) {
    const contacts = await readContent()
    const getContact = contacts.find((contact) => contact.id === contactId)
    return getContact ? getContact : null
}


async function removeContact(contactId) {
    const contacts = await readContent()
    const index = contacts.findIndex((contact) => contact.id === contactId)
    if (index === -1) {
        return null
    }
    const [deleteContact] = contacts.splice(index, 1)
    await fs.writeFile(path.join(__dirname, 'db', 'contacts.json'), JSON.stringify(contacts, null, 2))
    return deleteContact



}

async function addContact(name, email, phone) {
    const contact = await readContent()
    const newContact = { id: randomUUID(), name, email, phone }
    contact.push(newContact)
    await fs.writeFile(path.join(__dirname, 'db', 'contacts.json'), JSON.stringify(contact, null, 2))
    return newContact
}

module.exports = { listContacts, getContactById, removeContact, addContact }