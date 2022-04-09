const Contact = require('../../model/contact');

async function listContacts() {
    const result = await Contact.find()
    return result
}

async function getContactById(contactId) {
    const result = await Contact.findById(contactId)
    return result
}


async function deleteContact(contactId) {
    const result = await Contact.findOneAndRemove({ _id: contactId })
    return result

}

async function createContact(body) {
    const result = await Contact.create(body)
    return result
}

async function updateContact(contactId, body) {
    const result = await Contact.findOneAndUpdate({ _id: contactId }, {...body })
    return result
}

async function updateStatusContact(contactId, body) {
    const result = await Contact.findOneAndUpdate({ _id: contactId }, {...body })
    return result
}

module.exports = {
    listContacts,
    getContactById,
    deleteContact,
    createContact,
    updateContact,
    updateStatusContact
}