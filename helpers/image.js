const multer = require('multer')

const multerDiskStorage = multer.diskStorage({
    destination: function (req, file, cb) {
        cb(null, 'uploads/')
    },
    filename: function (req, file, cb) {
        const originalName = file.originalname
        const nameArr = originalName.split('.')
        var extension = ''
        if (nameArr.length > 1) {
            extension = nameArr[nameArr.length - 1]
        }
        // picture-237435252.jpg
        cb(null, `${file.fieldname}-${Date.now()}.${extension}`)
    }
})

const multerUpload = multer({ storage: multerDiskStorage })

module.exports = { multerUpload }