const messages = require('./messages');
const service = require('./service');

exports.create = async (req, res) => {
    const createBody = {
        name: req.body.name,
        description: req.body.description,
        user_id: req.userId,
        category_id: req.body.categoryId
    }
   try {
        await service.create(createBody);
        res.status(201).json({
            message: messages.POST_CREATE_SUCCESS
        });
   } catch (error) {
        res.status(401).json({
            message: messages.POST_CREATE_FAILED,
            error
        });
   }
}

exports.getAll = async (req, res) => {
    const queryParams = {
        offset: req.query.offset,
        numResults: req.query.numResults,
        sort: req.query.sort,
        asc: req.query.asc
    }
    const response = await service.getAll(queryParams);
    res.status(201).json(response);
}

exports.update = async (req, res) => {
    const updateBody = {
        name: req.body.name,
        description: req.body.description,
        userId: req.userId,
        category_id: req.body.categoryId
    };
    try {
        await service.update(req.params.id, updateBody);
        res.status(201).json({
            message: messages.POST_UPDATE_SUCCESS
        });
    } catch (error) {
        res.status(201).json({
            message: error.message || messages.POST_UPDATE_FAILED
        });
    }
}

exports.getOne = async (req, res) => {
    try {
        const data = await service.getOne(req.params.id);
        res.status(201).json({
            data
        });
    } catch (error) {
        res.status(201).json({
            message: error.message 
        });
    }
}

exports.delete = async (req, res) => {
    try {
        await service.delete(req.params.id, req.userId);
        res.status(201).json({
            message: messages.POST_DELETE_SUCCESS
        });
    } catch (error) {
        res.status(201).json({
            message: error.message || messages.POST_DELETE_FAILED
        });
    }
}

exports.createComment = async (req, res) => {
    const createBody = {
        user_id: req.userId,
        post_id: req.params.id,
        content: req.body.content,
        parent_comment_id: req.body.parentId || null
    };
    try {
        await service.createComment(createBody);
        res.status(201).json({
            message: messages.CREATE_COMMENT_SUCCESS
        });
    } catch (error) {
        res.status(201).json({
            message: error.message || messages.CREATE_COMMENT_FAILED
        });
    }
}

exports.getComments = async (req, res) => {
    try {
        const data = await service.getComments(req.params.id);
        res.status(201).json({
            data
        });
    } catch (error) {
        res.status(201).json({
            message: error.message
        });
    }
}