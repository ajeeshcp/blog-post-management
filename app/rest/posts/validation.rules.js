const { body, query, param } = require('express-validator');

exports.validate = (validationType) => {
    switch (validationType) {
        case 'create': {
            return [ 
                body('name', 'Name doesnt exists').exists(),
                body('description', 'Description doest exist').exists(),
                body('categoryId', 'CategoryId doest exist').exists().isNumeric(),
               ]  
            }
        case 'getAll': {
            return [ 
                query('numResults', 'NumResults doesnt exists').exists().isNumeric(),
                query('offset', 'Offset doest exist').exists().isNumeric(),
                ]  
            }
        case 'update': {
            return [ 
                param('id', 'id doesnt exist').exists(),
                body('name', 'Name doesnt exists').exists(),
                body('description', 'Description doest exist').exists(),
                body('categoryId', 'CategoryId doest exist').exists().isNumeric(),
                ]  
            }
        case 'getOne': {
            return [ 
                param('id', 'id doesnt exist').exists().isNumeric(),
                ]  
            }
        case 'delete': {
            return [ 
                param('id', 'id doesnt exist').exists().isNumeric(),
                ]  
            }
        case 'comments': {
            return [ 
                param('id', 'id doesnt exist').exists().isNumeric(),
                body('content', 'Content doesnt exists').exists(),
                body('parentId', 'ParentId doest exist').exists(),
                ]  
            }
        case 'getComments': {
            return [ 
                param('id', 'id doesnt exist').exists().isNumeric(),
                ]  
            }
        default:
            break;
    }
}