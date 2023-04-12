class BasicProfileResponse {

    constructor(name, contactNumber, email, address, profession, profileImage, socialNetworks) {
        this.name = name;
        this.contactNumber = contactNumber;
        this.email = email;
        this.address = address;
        this.profession = profession;
        this.profileImage = profileImage;
        this.socialNetworks = socialNetworks;
    }

}


module.exports = { BasicProfileResponse };