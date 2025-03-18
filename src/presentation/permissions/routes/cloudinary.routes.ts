import { Router } from 'express';
import { AppLogger } from '../../../config/appLogger';
import { FOLDER_TO_UPLOAD, IMAGE_UPLOAD_PATH } from '../../../config/envs';
import { CloudinaryController } from '../controllers/cloudinary-controller';
import multer from 'multer';
import { CloudinaryResult } from '../../../domain/types/cloudinary-result.type';

export class CloudinaryRoutes {

     static get routes(): Router {

          const router = Router();
          const logger = new AppLogger("CloudinaryRoutes");
          const controller = new CloudinaryController();

          const storage = multer.diskStorage({
               destination: function (req, file, cb) {
                    cb(null, IMAGE_UPLOAD_PATH)
               },
               filename: function (req, file, cb) {
                    cb(null, file.originalname)
               }
          })

          router.post('/', multer({ storage: storage }).single('file'), async (req: any, res) => {
               try {
                    const file = req.file;
                    const result = await controller.uploadMediaFile(file) as unknown as CloudinaryResult
                    console.dir(result);
                    res.status(200).send(result)
                    //await fs.unlink(req.files.file.tempFilePath)
               } catch (error) {
                    logger.Error(error as Error);
               }

          });

          router.delete(`/${FOLDER_TO_UPLOAD}/:public_id`, async (req, res) => {
               try {
                    //logger.info('req.params.id: ', req.params.public_id)
                    const result = await controller.deleteMediaFile(`${FOLDER_TO_UPLOAD}/${req.params.public_id}`)
                    res.status(200).send(result)
               } catch (error) {
                    logger.Error(error as Error);
               }

          });

          return router;
     }
}