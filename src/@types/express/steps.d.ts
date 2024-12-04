import * as expressFileUpload from 'express-fileupload'

declare global {
    namespace Express {
        interface Request {
            files?: expressFileUpload.FileArray
        }
    }
}
