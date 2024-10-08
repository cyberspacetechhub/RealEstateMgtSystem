const express = require('express');
const router = express.Router();
const propertyController = require('../controllers/propertyController');
const verifyRoles = require('../middleware/verifyRoles');

router.route('/')
    .get(propertyController.getPropertiesHandler)
    router.route('/:id')
    .get(propertyController.getPropertyHandler)
    .delete(verifyRoles('Admin', 'Agent', 'Owner'), propertyController.deletePropertyHandler)
router.route('/owner/:id')
    .get(verifyRoles('Admin', 'Agent', 'Owner'), propertyController.getPropertiesByOwnerHandler);

router.route('/status/:id')
    .put(verifyRoles('Admin', 'Agent', 'Owner'), propertyController.propertyStatusHandler)
module.exports = router;