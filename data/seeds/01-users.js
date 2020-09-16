  
exports.seed = function(knex, Promise) {
    // Deletes ALL existing entries and resets ids
    return knex('halo')
      .truncate()
      .then(function() {
        return knex('halo').insert([
          { name: 'master chief' },
          { name: 'cortana' },
          { name: 'arbiter' },
          { name: 'captain keys' },
          { name: 'dr halsey' }
        ]);
      });
  };