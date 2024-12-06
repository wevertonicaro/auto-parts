import multer from 'multer'

export const upload = multer({
    dest: './temp/',
    limits: { fileSize: 10 * 1024 * 1024 },
    fileFilter: (req, file, cb) => {
        const allowedMimeTypes = [
            'text/csv',
            'application/vnd.ms-excel',
            'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet',
        ]

        if (!allowedMimeTypes.includes(file.mimetype)) {
            return cb(
                new Error(
                    'Formato de arquivo inválido. Apenas arquivos CSV ou Excel são permitidos.'
                )
            )
        }

        cb(null, true)
    },
})
