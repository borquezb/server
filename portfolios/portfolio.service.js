const bson = require("bson");
const db = require('_helpers/db');
const Portfolio = db.Portfolio;
const PortfolioBalance = db.PortfolioBalance;
const Transaction = db.Transaction;
const moment = require('moment');

module.exports = {
    getAll,
    getById,
    create,
    update,
    delete: _delete,
    updateBalance
};

async function getAll() {
    return await Portfolio.find();
}

async function getById(id) {
    return await Portfolio.findById(id);
}

async function create(portfolioParam) {
    // validate
    if (await Portfolio.findOne({number: portfolioParam.number})) {
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

async function updateBalance() {
    let portfolios = await Portfolio.find();
    for (const portfolio of portfolios) {
        let today = new Date();
        let currentDate = moment(portfolio.createdDate).format('YYYY-MM-DD');
        while (currentDate < moment(today).format('YYYY-MM-DD')) {
            currentDate = moment(currentDate).add(1, 'days').format('YYYY-MM-DD');
            if (moment(currentDate).day() != 6 && moment(currentDate).day() != 0) {
                let portfolioBalance = await PortfolioBalance.findOne({
                    "portfolio": bson.ObjectID(portfolio.id),
                    "date": currentDate
                });
                if (!portfolioBalance) {
                    portfolioBalance = new PortfolioBalance();
                    portfolioBalance.portfolio = portfolio;
                    portfolioBalance.balance = 0;
                    portfolioBalance.date = currentDate;
                }
                // let transactions = await Transaction.find({"portfolio": bson.ObjectID(portfolio.id)});
                // transactions.forEach(function (transaction) {
                //     portfolioBalance = transaction.quantity * transaction.openPrice;
                // });
                portfolioBalance.save()
            }
        }
    }
}
