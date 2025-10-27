const Note = require('../models/Note')

//GET ALL NOTES

const getAllNotes = async (_, res) => {
  try {
    const notes = await Note.find().sort({ createdAt: -1 }) // newest first
    res.status(200).json(notes)
  } catch (error) {
    console.error('Error in getAllNotes controller')
    res.status(500).json({ msg: 'Internal server error' })
  }
}

//GET SINGLE NOTE

const getNote = async (req, res) => {
  try {
    const singleNote = await Note.findById(req.params.id)
    if (!singleNote) {
      return res.status(404).json('Note not found')
    }
    res.status(200).json(singleNote)
  } catch (error) {
    console.error('Error in getSingleNote controller')
    res.status(500).json({ msg: 'Internal server error' })
  }
}

//CREATE NOTE

const createNote = async (req, res) => {
  try {
    const { title, content } = req.body
    const newNote = new Note({ title: title, content: content })
    await newNote.save()
    res.status(201).json({ newNote })
  } catch (error) {
    console.error('Error in createNote controller')
    res.status(500).json({ msg: 'Internal server error' })
  }
}

//UPDATE NOTE

const updateNote = async (req, res) => {
  try {
    const { title, content } = req.body
    const updatedNote = await Note.findByIdAndUpdate(
      req.params.id,
      { title, content },
      { new: true, runValidators: true }
    )
    if (!updatedNote) {
      return res.status(404).json({ msg: 'Note not found' })
    }

    res.status(200).json({ updatedNote })
  } catch (error) {
    console.error('Error in updateNote controller')
    res.status(500).json({ msg: 'Internal server error' })
  }
}

//DELETE NOTE

const deleteNote = async (req, res) => {
  try {
    const deleteNote = await Note.findByIdAndDelete(req.params.id)
    if (!deleteNote) {
      return res.status(404).json({ msg: 'Note not found' })
    }
    res.status(200).send('Note deleted successfully')
  } catch (error) {
    console.error('Error in deleteNote controller')
    res.status(500).json({ msg: 'Internal server error' })
  }
}

module.exports = { getAllNotes, getNote, createNote, updateNote, deleteNote }
