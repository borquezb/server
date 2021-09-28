const express = require('express');
const router = express.Router();
const portfolioService = require('./portfolio.service');

// routes
router.get('/', getAll);
router.post('/create', create);
router.get('/current', getCurrent);
router.get('/:id', getById);
router.put('/:id', update);
router.delete('/:id', _delete);

module.exports = router;

function create(req, res, next) {
    portfolioService.create(req.body)
        .then(() => res.json({}))
        .catch(err => next(err));
}
function getAll(req, res, next) {
    portfolioService.getAll()
        .then(portfolios => res.json(portfolios))
        .catch(err => next(err));
}

function getCurrent(req, res, next) {
    portfolioService.getById(req.portfolio.sub)
        .then(portfolio => portfolio ? res.json(portfolio) : res.sendStatus(404))
        .catch(err => next(err));
}

function getById(req, res, next) {
    portfolioService.getById(req.params.id)
        .then(portfolio => portfolio ? res.json(portfolio) : res.sendStatus(404))
        .catch(err => next(err));
}

function update(req, res, next) {
    portfolioService.update(req.params.id, req.body)
        .then(() => res.json({}))
        .catch(err => next(err));
}

function _delete(req, res, next) {
    portfolioService.delete(req.params.id)
        .then(() => res.json({}))
        .catch(err => next(err));
}
