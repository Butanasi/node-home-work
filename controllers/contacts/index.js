const contactRepository = require('../../repository/contacts/index');
const HTTP_CODE = require('../../libs/constCode');

const listContacts = async(req, res, next) => {
    const contacts = await contactRepository.listContacts();
    res.json({
        status: 'success',
        code: HTTP_CODE.OK,
        payload: { contacts }
    });
};

const getContactById = async(req, res, next) => {
    const contact = await contactRepository.getContactById(req.params.contactId);
    if (!contact) {
        res.json({
            status: 'error',
            code: HTTP_CODE.NOT_FOUND,
            message: 'Contact not found'
        });
    } else {
        res.json({
            status: 'success',
            code: HTTP_CODE.OK,
            payload: { contact }
        });
    }
};

const createContact = async(req, res, next) => {
    const contact = await contactRepository.createContact(req.body);
    res.json({
        status: 'success',
        code: HTTP_CODE.CREATED,
        payload: { contact }
    });
};

const updateContact = async(req, res, next) => {
    const contact = await contactRepository.updateContact(req.params.contactId, req.body);
    if (!contact) {
        res.json({
            status: 'error',
            code: HTTP_CODE.NOT_FOUND,
            message: 'Contact not found'
        });
    } else {
        res.json({
            status: 'success',
            code: HTTP_CODE.OK,
            payload: { contact }
        });
    }
};

const deleteContact = async(req, res, next) => {
    const contact = await contactRepository.deleteContact(req.params.contactId);
    if (!contact) {
        res.json({
            status: 'error',
            code: HTTP_CODE.NOT_FOUND,
            message: 'Contact not found'
        });
    } else {
        res.json({
            status: 'success',
            code: HTTP_CODE.OK,
            payload: { contact }
        });
    }
};

const updateStatusContact = async(req, res, next) => {
    const contact = await contactRepository.updateStatusContact(req.params.contactId);
    if (!contact) {
        res.json({
            status: 'error',
            code: HTTP_CODE.NOT_FOUND,
            message: 'Contact not found'
        });
    } else {
        res.json({
            status: 'success',
            code: HTTP_CODE.OK,
            payload: { contact }
        });
    }
};

module.exports = {
    listContacts,
    getContactById,
    createContact,
    updateContact,
    deleteContact,
    updateStatusContact
};