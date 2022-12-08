const multer = require('multer')
const path = require('path')

const filestorageEngine = multer.diskStorage({
    destination: path.join(__dirname, '../uploads/images'),
    filename: (req, file, cb) => {
        return cb(null, `${Date.now()}_${file.originalname}`)
    }
})


const upload = multer({ storage: filestorageEngine })

module.exports = { upload }