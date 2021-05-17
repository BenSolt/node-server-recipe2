exports.up = function(knex) {
    return knex.schema.createTable('halo', tbl => {
        tbl.increments();
    
        tbl.string('name', 255).notNullable();
        tbl.string('ingredients', 255).notNullable();
      })
};

exports.down = function(knex) {
    return knex.schema
    .dropTableIfExists('halo')
};