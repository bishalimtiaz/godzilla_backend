const EndUserRepositoryImpl = require("../../data_access/repository_impl/endUserRepositoryImpl");
const PublicProfileRespository = require("../../data_access/repository_impl/publicProfileRepository");
const NotFoundError = require("../exceptions/notFoundError");

class ProfileService {


    publicProfileRepository = new PublicProfileRespository();

    endUserRepository = new EndUserRepositoryImpl();


    async getBasicProfile(profile_id) {

        try {

            const publicProfile = await this.publicProfileRepository.findPublicProfileById(profile_id);

            if (!publicProfile) {
                throw new NotFoundError('Public Profile Not Found');
            }

            const basicProfile = await this.endUserRepository.getBasicProfileDetails(publicProfile.end_user_id);

            return basicProfile;

        } catch (error) {

            throw error;

        }
    }

}

module.exports = ProfileService;