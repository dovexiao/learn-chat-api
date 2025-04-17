import AppDataSource from "../config/data-source";
import {ImageRepository} from "../repositories/resourceRepositories";

export class ResourceService {
    private imageRepo = new ImageRepository();

    uploadImage = async (image: any) => {
        try {
            const newImage = await this.imageRepo.save({
                base64: image.base64,
                type: image.type,
                width: image.width,
                height: image.height,
                isDelete: false,
                createTime: new Date(),
            });
            return newImage.id;
        } catch (error) {
            throw error;
        }
    }
}


