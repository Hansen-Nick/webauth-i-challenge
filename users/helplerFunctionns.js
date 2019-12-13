const db = require('../data/dbConfig')

function find() {
  return db('users').select('id', 'username');
}

function add(data) {
  return db('users').insert(data, 'id')
          .then( ids => {
            const [id] = ids
            return findByID(id)
          })
}

function findByID(id) {
  return db('users').select('id', 'username').where({id})
}

function findBy(filter) {
  return db('users').select('id', 'username', 'password').where(filter)
}

module.exports = {
  find,
  add,
  findByID,
  findBy
}