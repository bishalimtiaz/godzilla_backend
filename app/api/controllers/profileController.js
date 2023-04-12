const { BasicProfileResponse } = require("../../domain/models/profile");
const ProfileService = require("../../domain/services/profileService");


class ProfileController {

    profileService = new ProfileService();

    async getBasicProfile(req, res, next) {


        try {
            const queryParams = req.query;
            const publicProfileId = queryParams.id;

            console.log('profile_debug', publicProfileId);

            const basicProfile = await this.profileService.getBasicProfile(publicProfileId);

            const response = new BasicProfileResponse(
                basicProfile.name,
                basicProfile.contact_number,
                basicProfile.email,
                basicProfile.address,
                basicProfile.introduction.profession,
                basicProfile.introduction.profile_image,
                basicProfile.user_social_networks
            )

            res.json(response);

        } catch (error) {

            next(error);

        }
    }



}


module.exports = ProfileController;