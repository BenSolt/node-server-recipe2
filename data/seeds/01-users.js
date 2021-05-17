  
exports.seed = function(knex, Promise) {
    // Deletes ALL existing entries and resets ids
    return knex('halo')
      .truncate()
      .then(function() {
        return knex('halo').insert([
          { id: 1,
            name: 'Chicken Casserole',
            ingredients: 'ingreds 1'
        },
          { 
            id: 2,
            name: 'Fish Baked in Parchment',
            ingredients: 'ingreds 2'
        },
          { 
            id: 3,
            name: 'Mexican Pizza',
            ingredients: 'ingreds 3'
         },
          { 
            id: 4,
            name: 'captain keys',
            ingredients: 'ingreds 4'
         },
          { 
            id: 5,
            name: 'dr halsey',
            ingredients: 'ingreds 5' }
        ]);
      });
  };