const express = require('express');
const router = express.Router();
const transactionService = require('./transaction.service');

// routes
router.get('/', getAll);
router.post('/create', create);
router.get('/current', getCurrent);
router.get('/:id', getById);
router.put('/:id', update);
router.delete('/:id', _delete);
router.get('/portfolio/:id', getByPortfolio);

module.exports = router;

function create(req, res, next) {
    transactionService.create(req.body)
        .then(() => res.json({}))
        .catch(err => next(err));
}
function getAll(req, res, next) {
    transactionService.getAll()
        .then(transactions => res.json(transactions))
        .catch(err => next(err));
}

function getCurrent(req, res, next) {
    transactionService.getById(req.transaction.sub)
        .then(transaction => transaction ? res.json(transaction) : res.sendStatus(404))
        .catch(err => next(err));
}

function getById(req, res, next) {
    transactionService.getById(req.params.id)
        .then(transaction => transaction ? res.json(transaction) : res.sendStatus(404))
        .catch(err => next(err));
}

function update(req, res, next) {
    transactionService.update(req.params.id, req.body)
        .then(() => res.json({}))
        .catch(err => next(err));
}

function _delete(req, res, next) {
    transactionService.delete(req.params.id)
        .then(() => res.json({}))
        .catch(err => next(err));
}

function getByPortfolio(req, res, next) {
    transactionService.getAllByPortfolio(req.params.id)
        .then(transactions => res.json(transactions))
        .catch(err => next(err));
}
