import express from 'express';
import * as controller from 'controllers/status';

const router = express.Router();

router.get('/', controller.get);
router.put('/:id', controller.update);
router.delete('/:id', controller.destroy);
router.get('/following', controller.getFollowing);
router.post('/', controller.create);

module.exports = router;
