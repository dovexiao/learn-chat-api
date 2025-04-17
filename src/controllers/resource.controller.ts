import { Request, Response, NextFunction } from 'express';
import { ResourceService } from '../services/resource.service';
import { logger } from '../utils/logger';

class resourceController {
    private resourceService = new ResourceService();

    uploadImage = async (req: Request, res: Response, next: NextFunction) => {
        const { image } = req.body;
        logger.info('上传图片 | Uploading image');

        try {
            const imageId = await this.resourceService.uploadImage(image);
            logger.info(`图片上传成功 ${imageId} | Image uploaded successfully`, {
                imageId
            });
            res.status(200).json({
                success: true,
                data: {
                    imageId
                },
                timestamp: new Date().toISOString()
            })
        } catch(error: any) {
            logger.error('上传图片失败 | Failed to upload image', {
                error: error.message
            });
            next(error);
        }
    }
}

export default new resourceController();
