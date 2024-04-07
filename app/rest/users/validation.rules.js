const { body } = require('express-validator');

exports.validate = (validationType) => {
    switch (validationType) {
        case 'create': {
            return [ 
                body('username', 'Username doesnt exists').exists(),
                body('password', 'Password doest exist').exists(),
               ]  
            }
        case 'login': {
            return [ 
                body('username', 'Username doesnt exists').exists(),
                body('password', 'Password doest exist').exists(),
                ]  
            }
        default:
            break;
    }
}