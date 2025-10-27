const express = require('express')
const router = express.Router()
const {
  getAllNotes,
  getNote,
  createNote,
  updateNote,
  deleteNote,
} = require('../controllers/notesController')

router.get('/', getAllNotes)

router.get('/:id', getNote)

router.post('/', createNote)

router.put('/:id', updateNote)

router.delete('/:id', deleteNote)

module.exports = router
