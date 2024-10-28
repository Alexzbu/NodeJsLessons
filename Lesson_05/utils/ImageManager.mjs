import multer from 'multer'

class ImageManager {
  static getUploadStorage(dirName = 'public/images') {
    // Налаштовуємо місце збереження файлів та їх імена
    const storage = multer.diskStorage({
      destination: function (req, file, cb) {
        cb(null, dirName)
      },
      filename: function (req, file, cb) {
        cb(null, Date.now() + '-' + file.originalname)
      },
    })

    const upload = multer({ storage })
    return upload
  }
}

export default ImageManager
