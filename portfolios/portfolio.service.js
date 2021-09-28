const db = require('_helpers/db');
const Portfolio = db.Portfolio;

module.exports = {
    getAll,
    getById,
    create,
    update,
    delete: _delete
};

async function getAll() {
    return await Portfolio.find();
}

async function getById(id) {
    return await Portfolio.findById(id);
}

async function create(portfolioParam) {
    // validate
    if (await Portfolio.findOne({ number: portfolioParam.number })) {
        throw 'Number "' + portfolioParam.number + '" is already taken';
    }

    const portfolio = new Portfolio(portfolioParam);

    // save portfolio
    await portfolio.save();
}

async function update(id, PortfolioParam) {
    const portfolio = await Portfolio.findById(id);
    // validate
    if (!portfolio) throw 'Portfolio not found';

    // copy PortfolioParam properties to Portfolio
    Object.assign(portfolio, PortfolioParam);

    await portfolio.save();
}

async function _delete(id) {
    await Portfolio.findByIdAndRemove(id);
}
