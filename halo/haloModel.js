const db = require('../data/dbConfig');

module.exports = {
  add,
  update,
  remove,
  find,
  findById,
};

//post (create)
async function add(character) {
  return db('halo').insert(character, "id");
}

//update (edit)
async function update(user, id) {
  return db("halo").update(user).where("id",id)
}

//get
function find() {
  return db('halo');
}

//get by id
function findById(id) {
    return db('halo')
    .select('id', 'username')
    .where({ id })
    .first();
}

//delete
function remove(id) {
    return db("halo").where("id",id).delete()
    
}