const express = require('express');
const router = express.Router();

const auth = require('../middleware/auth')
const stuffCtrl = require('../controllers/stuff');

router.post('/',stuffCtrl.createThing);

router.get('/:id', stuffCtrl.modifyThing);

router.put('/:id', stuffCtrl.updateOne);
 
router.delete('/:id', stuffCtrl.delete);

router.use('/', stuffCtrl.find);

module.exports = router;