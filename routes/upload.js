const express = require('express')
const router = express.Router()
const maulter = require('multer')
const path = require('path')


const storage = maulter.diskStorage({
    destination: function(req, file, cb) {
        cb(null, path.join(__dirname,'../images'))
    },
    filename: function(req, file, cb) {
        cb(null, new Date().toISOString().replace(/:/g,'-') + file.originalname)
    }
})

const upload = maulter({storage})

router.post('/register', upload.single('image'), (req,res) => {
    res.status(200).json({message: "image uploaded successfully"})
})

module.exports = router