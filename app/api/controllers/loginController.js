const LoginService = require('../../domain/services/loginService');


class LoginController{

    loginService = new LoginService();

    async login(req, res, next) {
        try {
          const {contactNumber, password} = req.body;
    
          const response = await this.loginService.login(contactNumber, password);
        
    
          res.json(response);
    
        } catch (error) {
          next(error);
        }
      }

}

module.exports = LoginController;