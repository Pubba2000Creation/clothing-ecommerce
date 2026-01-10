/**
 * Search helper for Mongoose queries
 * @param {Object} query - Mongoose query object
 * @param {Object} queryStr - Request query parameters
 * @returns {Object} - Modified Mongoose query object
 */
const search = (query, queryStr) => {
    const keyword = queryStr.search
        ? {
            name: {
                $regex: queryStr.search,
                $options: 'i',
            },
        }
        : {};

    return query.find({ ...keyword });
};

module.exports = search;
