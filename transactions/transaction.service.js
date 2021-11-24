const bson = require("bson");
const db = require('_helpers/db');
const Transaction = db.Transaction;
const Portfolio = db.Portfolio;

module.exports = {
    getAll,
    getById,
    create,
    update,
    delete: _delete,
    getAllByPortfolio
};

async function getAll() {
    return await Transaction.find();
}

async function getById(id) {
    return await Transaction.findById(id);
}

async function create(transactionParam) {
    // validate
    const transaction = new Transaction(transactionParam);
    transaction.openCost = transaction.openPrice * transaction.quantity;
    // save transaction
    await transaction.save();
}

async function update(id, transactionParam) {
    const transaction = await Transaction.findById(id);
    // validate
    if (!transaction) throw 'Transaction not found';

    // copy Transaction properties to Transaction
    Object.assign(transaction, transactionParam);

    if (transaction.status == 'Closed') {
        transaction.portfolio.balance += transaction.costClosed;
        transaction.closeCost = transaction.closePrice * transaction.quantity;
        transaction.closeDate = new Date()
    }
    await transaction.save();
}

async function _delete(id) {
    await Transaction.findByIdAndRemove(id);
}

async function getAllByPortfolio(id) {
    return await Transaction.find({"portfolio": bson.ObjectID(id)});
}


