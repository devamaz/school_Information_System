const multer = require('multer');
const jimp =require('jimp');
const uuid = require('uuid');


const multeroptions = {
    storage: multer.memoryStorage(),
    fileFilter(req, file, next) {
        isPhoto = file.mimetype.startsWith('image/');
        if (isPhoto) {
            next(null, true)
        } else{
            next({message: 'is not a photo'}, false)
        }
    }
};


exports.upload = multer(multeroptions).single('photo');

exports.resize = (req, res, next) => {
    if (!req.file) {
        next();
        return; 
    }

    const fileExt = req.file.mimetype.split('/')[1];
    const photoName = req.body.photo = `${uuid.v4()}.${fileExt}`;
    
 
    jimp.read(req.file.buffer, (err, image) =>{
            if (err) {  throw err }
                image.resize(499, 499)
                .write(`./publics/image/${req.body.photo}`);
                
    });
    
    next();
}