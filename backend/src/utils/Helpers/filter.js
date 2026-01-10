/**
 * Filter helper for Mongoose queries
 * @param {Object} query - Mongoose query object
 * @param {Object} queryStr - Request query parameters
 * @returns {Object} - Modified Mongoose query object
 */
const filter = (query, queryStr) => {
    const queryCopy = { ...queryStr };

    // Removing fields from the query
    const removeFields = ['search', 'page', 'limit'];
    removeFields.forEach((el) => delete queryCopy[el]);

    // Advance filter for price, etc.
    let queryStrJson = JSON.stringify(queryCopy);
    queryStrJson = queryStrJson.replace(/\b(gt|gte|lt|lte)\b/g, (match) => `$${match}`);

    const parsedQuery = JSON.parse(queryStrJson);

    // Handle minPrice and maxPrice specifically if provided
    if (queryStr.minPrice || queryStr.maxPrice) {
        parsedQuery.price = {};
        if (queryStr.minPrice) parsedQuery.price.$gte = Number(queryStr.minPrice);
        if (queryStr.maxPrice) parsedQuery.price.$lte = Number(queryStr.maxPrice);

        delete parsedQuery.minPrice;
        delete parsedQuery.maxPrice;
    }

    // Handle sizes
    if (queryStr.size) {
        parsedQuery.sizes = queryStr.size;
        delete parsedQuery.size;
    }

    return query.find(parsedQuery);
};

module.exports = filter;
