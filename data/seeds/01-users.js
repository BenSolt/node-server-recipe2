  
exports.seed = function(knex, Promise) {
    // Deletes ALL existing entries and resets ids
    return knex('halo')
      .truncate()
      .then(function() {
        return knex('halo').insert([
          { 
            name: 'master chief',
            ingredients: 'ingreds 1'
        },
          { 
            name: 'cortana',
            ingredients: 'ingreds 2'
        },
          { 
            name: 'arbiter',
            ingredients: 'ingreds 3'
         },
          { 
            name: 'captain keys',
            ingredients: 'ingreds 4'
         },
          { 
            name: 'dr halsey',
            ingredients: 'ingreds 5' }
        ]);
      });
  };