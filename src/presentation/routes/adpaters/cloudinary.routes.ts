import { Router } from 'express';
import fs from 'fs-extra';
import multer from 'multer';
import { IMAGE_UPLOAD_PATH, FOLDER_TO_UPLOAD } from '../../../config';
import { AppLogger } from '../../../config/appLogger';
import { CloudinaryResult } from '../../../domain/types/cloudinary-result.type';
import { CloudinaryController } from '../../controllers/adapters/cloudinary.controller';


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
                    const result = await controller.uploadMediaFile(file, req.body.folder) as unknown as CloudinaryResult
                    res.status(200).send(result);
                    await fs.unlink(file.path)
               } catch (err) {
                    const error = err as Error
                    logger.Error(error);
                    res.status(400).send(error);
               }

          });

          router.put('/', multer({ storage: storage }).single('file'), async (req: any, res) => {

               try {
                    const file = req.file;
                    const result = await controller.updateMediaFile(file, req.body.public_id) as unknown as CloudinaryResult
                    res.status(200).send(result);
                    await fs.unlink(file.path)
               } catch (err) {
                    const error = err as Error
                    logger.Error(error);
                    res.status(400).send(error);
               }

          });

          router.delete(`/${FOLDER_TO_UPLOAD}/:public_id`, async (req, res) => {

               try {
                    const result = await controller.deleteMediaFile(`${FOLDER_TO_UPLOAD}/${req.params.public_id}`)
                    res.status(200).send(result)
               } catch (err) {
                    const error = err as Error
                    logger.Error(error);
                    res.status(400).send(error);
               }

          });

          return router;
     }
}