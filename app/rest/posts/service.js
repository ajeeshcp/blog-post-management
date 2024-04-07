const { posts, sequelize, comments } = require("../../sequelize");
const messages = require("./messages");
const queries = require('./queries');

const sortAllowedFields = (sort) => {
    const fields = {
        name: 'p.name',
        username: 'u.user_name'
    };
    return fields[sort] ? fields[sort] : 'p.id'; 
};

const checkPostExist = async (id) => {
    const data = await posts.findOne({
        where: { id }
    });
    if (!data) {
        throw new Error(messages.INVALID_POST_ID)
    }
}

const checkPostPermissionExist = async (postId, postUserId) => {
    const data = await posts.findOne({
        where: { id: postId, user_id: postUserId }
    });
    if (!data) {
        throw new Error(messages.PERMISSION_DENIED)
    }
    return;
}

exports.create = async (createBody) => {
    await posts.create(createBody);
    return true;
}

exports.getAll = async (queryParams) => {
    const replacements = {
        offset: queryParams.offset,
        numResults: queryParams.numResults,
        asc: parseInt(queryParams.asc) ? 'asc' : 'desc',
        sort: sortAllowedFields(queryParams.sort)
    }
    const [dataQuery, countQuery] = queries.getAll(replacements);
    const dataPromise  =  sequelize.query(dataQuery, { type: sequelize.QueryTypes.SELECT });
    const countPromise = sequelize.query(countQuery, { type: sequelize.QueryTypes.SELECT });

    const data = await Promise.all([dataPromise, countPromise]);
    return {
        count: data?.length ? data[1][0]?.count : 0,
        data:  data?.length ? data[0] : [],
    };
}

exports.update = async (id, updateBody) => {
    await checkPostExist(id);
    await checkPostPermissionExist(id, updateBody.userId);
    await posts.update({
        name: updateBody.name,
        description: updateBody.description,
        category_id: updateBody.categoryId
    }, {
        where: { id }
    });
    return true;
}

exports.getOne = async (id) => {
    await checkPostExist(id);
    const query = queries.getOne(id);
    const data = await sequelize.query(query, { type: sequelize.QueryTypes.SELECT });
    return data && data.length ? data[0] : [];
}

exports.delete = async (id, userId) => {
    await checkPostExist(id);
    await checkPostPermissionExist(id, userId);
    await comments.destroy({
        where: {
          post_id: id
        }
    });
    await posts.destroy({
        where: {
          id,
          user_id: userId
        }
    });
    return true;  
}

exports.createComment = async (createBody) => {
    await checkPostExist(createBody.post_id);
    await comments.create(createBody);
    return true;
}

exports.getComments = async (postId) => {
    const query = queries.getComments(postId);
    const data = await sequelize.query(query, { type: sequelize.QueryTypes.SELECT });
    const response = generateRecursiveComments(data);
    return response;
}

const generateRecursiveComments = comments => {
    const nestedComments = {};
    for (const comment of comments) {
        const { id, parentId, content } = comment;
        if (!nestedComments[id]) {
            nestedComments[id] = { id, parentId, content, children: [] };
        }

        if (parentId && nestedComments[parentId]) {
            nestedComments[parentId].children.push(nestedComments[id]);
        }
    }

    const commentWithNullParentId = comments.filter(comment => !comment.parentId);
    const results = commentWithNullParentId.map(comment => nestedComments[comment.id]);
    return results;
}