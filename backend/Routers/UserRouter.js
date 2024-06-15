const express = require('express')
const router = express.Router();
const { likedMovies, getLikedMovies, removeFromLikedMovies } = require('../Controllers/UserController')

router.post('/likeprogram', likedMovies);
router.get('/getLikedPrograms/:email', getLikedMovies)
router.put('/delete', removeFromLikedMovies)
module.exports = router;