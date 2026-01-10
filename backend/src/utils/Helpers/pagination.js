/**
 * Pagination helper for Mongoose queries
 * @param {Object} query - Mongoose query object
 * @param {Object} queryStr - Request query parameters
 * @param {Number} resPerPage - Results per page
 * @returns {Object} - Modified Mongoose query object
 */
const pagination = (query, queryStr, resPerPage) => {
    const currentPage = Number(queryStr.page) || 1;
    const skip = resPerPage * (currentPage - 1);

    return query.limit(resPerPage).skip(skip);
};

module.exports = pagination;
