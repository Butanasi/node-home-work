const express = require('express')
const {
    listContacts,
    getContactById,
    deleteContact,
    createContact,
    updateContact,
    updateStatusContact
} = require('../../controllers/contacts')
const {
    schemaCreateContact,
    schemaUpdateContact,
    schemaMongoId,
    schemaFavorite
} = require('./validation-schems')
const {
    validationBody,
    validationParams
} = require('../../middlewares/validation')
const router = express.Router()


router.get('/', listContacts)

router.get('/:contactId', validationParams(schemaMongoId), getContactById)

router.post('/', validationBody(schemaCreateContact), createContact)

router.delete('/:contactId', validationParams(schemaMongoId), deleteContact)

router.put('/:contactId', validationBody(schemaUpdateContact), updateContact)

router.patch(
    '/:contactId/favorite', [
        validationParams(schemaMongoId),
        validationBody(schemaFavorite)
    ],
    updateStatusContact,
)

module.exports = router