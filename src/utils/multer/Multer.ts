import multer from 'multer'

export const upload = multer({
    dest: './temp/',
    limits: { fileSize: 10 * 1024 * 1024 },
    fileFilter: (req, file, cb) => {
        if (file.mimetype !== 'text/csv' && file.mimetype !== 'application/vnd.ms-excel') {
            return cb(new Error('Formato de arquivo inválido. Apenas arquivos CSV são permitidos.'))
        }
        cb(null, true)
    },
})
