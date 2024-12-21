const Video = require('../models/Video');

class VideoRepository {
    async getVideosByModuleId(moduleId) {
        return await Video.findAll({ where: { idModule: moduleId } });
    }

    async createVideo(data) {
        return await Video.create(data);
    }

    async updateVideo(id, data) {
        const video = await Video.findByPk(id);
        if (video) {
            await video.update(data);
            return video;
        }
        return null;
    }

    async deleteVideo(id) {
        const video = await Video.findByPk(id);
        if (video) {
            await video.destroy();
            return true;
        }
        return false;
    }
}

module.exports = VideoRepository;
