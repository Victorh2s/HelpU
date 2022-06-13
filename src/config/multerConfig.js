import multer from 'multer';
import { extname, resolve } from 'path';

const aleatorio = () => Math.floor(Math.random() * 10000 + 10000);

export default {
  fileFilter: (req, file, cb) => {
    if (file.mimetype !== 'image/png' && file.mimetype !== 'image/jpeg') {
      return cb(new multer.MulterError('Arquivo precisa ser PNG ou JPG'));
    }
    return cb(null, true);
  },
  storage: multer.diskStorage({
    destination: (req, file, cb) => {
      cb(null, resolve(__dirname, '..', '..', 'uploads', 'images'));
    },
    filename: (req, file, cb) => {
      cb(null, `${Date.now()}_${aleatorio()}${extname(file.originalname)}`);
    },
  }),
};


// const maxSize = 10 * 1024 * 1024;
// export const multerConfig = {
//   dest: resolve(__dirname, '..', '..', 'uploads'),
//   storage: diskStorage({
//     destination: (request, file, callback) => {
//       callback(null, resolve(__dirname, '..', '..', 'uploads'));
//     },
//     filename: (request, file, callback) => {
//       randomBytes(16, (error, hash) => {
//         if (error) {
//           callback(error, file.filename);
//         }
//         const filename = `${hash.toString('hex')}.png`;
//         callback(null, filename);
//       });
//     },
//   }),
//   limits: { fileSize: maxSize },
//   fileFilter: (request, file, callback) => {
//     const formats = ['image/jpeg', 'image/jpg', 'image/png'];

//     if (formats.includes(file.mimetype)) {
//       callback(null, true);
//     } else {
//       callback(new Error('Format not accepted'));
//     }
//   },
// } as Options;
