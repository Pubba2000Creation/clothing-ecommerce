const searchHelper = require('./helpers/search');
const filterHelper = require('./helpers/filter');
const paginationHelper = require('./helpers/pagination');

class APIFeatures {
    constructor(query, queryStr) {
        this.query = query;
        this.queryStr = queryStr;
    }

    search() {
        this.query = searchHelper(this.query, this.queryStr);
        return this;
    }

    filter() {
        this.query = filterHelper(this.query, this.queryStr);
        return this;
    }

    pagination(resPerPage) {
        this.query = paginationHelper(this.query, this.queryStr, resPerPage);
        return this;
    }
}

module.exports = APIFeatures;
