class VideoService {
    constructor({ videoRepository }) {
        this.videoRepository = videoRepository;
    }

    async getVideosByModuleId(moduleId) {
        return await this.videoRepository.getVideosByModuleId(moduleId);
    }

    async createVideo(data) {
        return await this.videoRepository.createVideo(data);
    }

    async updateVideo(id, data) {
        return await this.videoRepository.updateVideo(id, data);
    }

    async deleteVideo(id) {
        return await this.videoRepository.deleteVideo(id);
    }
}

module.exports = VideoService;
