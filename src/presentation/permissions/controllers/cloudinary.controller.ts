import { v2 as cloudinary } from 'cloudinary';
import { Router } from 'express';
import { AppLogger } from '../../../config/appLogger';
import { CLOUDINARY_API_KEY, CLOUDINARY_API_SECRET, CLOUDINARY_NAME, FOLDER_TO_UPLOAD } from '../../../config/envs';

export class CloudinaryController {
     logger: AppLogger;
     router: Router;

     constructor() {
          this.logger = new AppLogger("CloudinaryController");

          if (!CLOUDINARY_NAME || !CLOUDINARY_API_KEY || !CLOUDINARY_API_SECRET || !FOLDER_TO_UPLOAD)
               this.logger.Error(new Error("Environment variables not set"));

          cloudinary.config({
               cloud_name: CLOUDINARY_NAME,
               api_key: CLOUDINARY_API_KEY,
               api_secret: CLOUDINARY_API_SECRET
          });

          if (!cloudinary.config().cloud_name || !cloudinary.config().api_key || !cloudinary.config().api_secret)
               this.logger.Error(new Error("Cloudinary config not set up"));

          this.router = Router();
     }

     uploadMediaFile = async (file: any) => {
          try {
               const options = {
                    folder: FOLDER_TO_UPLOAD,
                    resource_type: file.mimetype === 'video/mp4' ? 'video' : 'image' as 'video' | 'image',
                    overwrite: true,
               }
               return await cloudinary.uploader.upload(file.path, options)
          } catch (error) {
               this.logger.Error(error as Error);
          }
     }

     deleteMediaFile = async (public_id: string) => {
          try {
               return await cloudinary.uploader.destroy(public_id)
          } catch (error) {
               this.logger.Error(error as Error);
          }
     }
}