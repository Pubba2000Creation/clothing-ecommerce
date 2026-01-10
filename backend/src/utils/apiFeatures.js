class APIFeatures {
    constructor(query, queryStr) {
        this.query = query;
        this.queryStr = queryStr;
    }

    search() {
        const keyword = this.queryStr.search
            ? {
                name: {
                    $regex: this.queryStr.search,
                    $options: 'i',
                },
            }
            : {};

        this.query = this.query.find({ ...keyword });
        return this;
    }

    filter() {
        const queryCopy = { ...this.queryStr };

        // Removing fields from the query
        const removeFields = ['search', 'page', 'limit'];
        removeFields.forEach((el) => delete queryCopy[el]);

        // Advance filter for price, etc.
        let queryStr = JSON.stringify(queryCopy);
        queryStr = queryStr.replace(/\b(gt|gte|lt|lte)\b/g, (match) => `$${match}`);

        const parsedQuery = JSON.parse(queryStr);

        // Handle minPrice and maxPrice specifically if provided
        if (this.queryStr.minPrice || this.queryStr.maxPrice) {
            parsedQuery.price = {};
            if (this.queryStr.minPrice) parsedQuery.price.$gte = Number(this.queryStr.minPrice);
            if (this.queryStr.maxPrice) parsedQuery.price.$lte = Number(this.queryStr.maxPrice);

            delete parsedQuery.minPrice;
            delete parsedQuery.maxPrice;
        }

        // Handle sizes (if it's an array or single value, Mongoose handles it if sizes is an array field)
        if (this.queryStr.size) {
            parsedQuery.sizes = this.queryStr.size;
            delete parsedQuery.size;
        }

        this.query = this.query.find(parsedQuery);
        return this;
    }

    pagination(resPerPage) {
        const currentPage = Number(this.queryStr.page) || 1;
        const skip = resPerPage * (currentPage - 1);

        this.query = this.query.limit(resPerPage).skip(skip);
        return this;
    }
}

module.exports = APIFeatures;
