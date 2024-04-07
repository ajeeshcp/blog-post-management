exports.getAll = (queryParams) => {
    const dataQuery = `
                    select 
                        p.id,
                        p."name" ,
                        p.description ,
                        u.user_name "postedBy",
                        p.created_at "createdOn",
                        c.name "category"
                    from posts p
                    left join users u on u.id = p.user_id 
                    left join categories c on c.id = p.category_id
                    order by ${queryParams.sort} ${queryParams.asc}
                    limit ${queryParams.numResults} offset ${queryParams.offset} ; `;
    const countQuery = `select count(*) from posts ;`;
    return [dataQuery, countQuery];
}

exports.getOne = (id) => {
    const query = `select 
                        p.id,
                        p."name" ,
                        p.description ,
                        u.user_name "postedBy",
                        p.created_at "createdOn",
                        c.name "category"
                    from posts p
                    left join users u on u.id = p.user_id 
                    left join categories c on c.id = p.category_id
                    where p.id = ${id} ;`;
    return query;
}

exports.getComments = (id) => {
    const query = `WITH RECURSIVE nested_comments AS (
                        SELECT id, user_id, post_id, parent_comment_id, content
                        FROM comments
                        WHERE post_id = ${id} AND parent_comment_id IS NULL
                    UNION
                        SELECT c.id, c.user_id, c.post_id, c.parent_comment_id, c.content
                        FROM comments c
                        JOIN nested_comments nc ON c.parent_comment_id = nc.id
                    )
                    SELECT id, user_id "userId", post_id "postId", parent_comment_id "parentId", content
                    FROM nested_comments
                    ORDER BY id ;`;
    return query;
}