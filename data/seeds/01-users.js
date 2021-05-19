  
exports.seed = function(knex, Promise) {
    // Deletes ALL existing entries and resets ids
    return knex('halo')
      .truncate()
      .then(function() {
        return knex('halo').insert([
          { id: 1,
            name: 'Chicken Casserole',
            ingredients: 'ingredients 1'
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
         }
        ]);
      });
  };