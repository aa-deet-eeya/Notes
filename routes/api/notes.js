const express = require('express')
const router = express.Router()

const Notes = require('../../models/schema')

router.get('/' , (req,res, next)=>{
  Notes.find()
    .sort({date : -1})
    .then(notes=>{
        res.json(notes)
    })  
})
router.post('/', (req, res, next)=>{
    const newNote = new Notes({
        note : req.body.note 
    })

    newNote
        .save()
        .then((note)=>{
            res.status(201).json({
                success : true ,
                msg : "Note successfully saved" ,
                note
            })
        })
        .catch(err=>{
            res.status(500).json({
                success : false ,
                err
            })
        })
})


module.exports = router 