class BackgroundResponse{

    constructor(id,background_name){
        this.id = id;
        this.background_name = background_name;
    }
}

class ForegroundResponse{

    constructor(id,color_scheme){
        this.id = id;
        this.color_scheme = color_scheme;
    }
}

module.exports = {BackgroundResponse,ForegroundResponse}