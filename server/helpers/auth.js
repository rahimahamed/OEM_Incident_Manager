const userHelper = require('./user.helper');

module.exports = {
  register,
  authenticate,
  getAll,
  getCurrent,
  getById,
  update,
  delete: _delete
};

function authenticate(req, res, next) {
  userHelper
    .authenticate(req.body)
    .then(user =>
      user
        ? res.json(user)
        : res.status(400).json({ message: 'Username or password is incorrect' })
    )
    .catch(err => next(err));
}

function register(req, res, next) {
  userHelper
    .create(req.body)
    .then(() => res.json({}))
    .catch(err => next(err));
}

function getAll(req, res, next) {
  userHelper
    .getAll()
    .then(users => res.json(users))
    .catch(err => next(err));
}

function getCurrent(req, res, next) {
  userHelper
    .getById(req.user.sub)
    .then(user => (user ? res.json(user) : res.sendStatus(404)))
    .catch(err => next(err));
}

function getById(req, res, next) {
  userHelper
    .getById(req.params.id)
    .then(user => (user ? res.json(user) : res.sendStatus(404)))
    .catch(err => next(err));
}

function update(req, res, next) {
  userHelper
    .update(req.params.id, req.body)
    .then(() => res.json({}))
    .catch(err => next(err));
}

function _delete(req, res, next) {
  userHelper
    .delete(req.params.id)
    .then(() => res.json({}))
    .catch(err => next(err));
}
