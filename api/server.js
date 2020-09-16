const express = require("express");

const Halo = require("../halo/haloModel");

const server = express();

server.use(express.json());

server.get("/", (req, res) => {
  res.status(200).json({ api: "up" });
});

//GET CHARACTERS
server.get("/char", (req, res) => {
    Halo.find()
    .then(halo => {
      res.status(200).json(halo);
    })
    .catch(error => {
      res.status(500).json(error);
    });
});

//GET CHARACTERS BY ID
server.get('/char/:id', (req, res) => {
    const { id } = req.params;
  
    Halo.findById(id)
    .then(char => {
      if (char) {
        res.json(char);
      } else {
        res.status(404).json({ message: 'Could not find character with given id.' })
      }
    })
    .catch(err => {
      res.status(500).json({ message: 'Failed to get characters' });
    });
  });

//POST (CREATE)
server.post('/char', (req, res) => {
    const data = req.body;
  
    Halo.add(data)
    .then(char => {
      res.status(201).json(char);
    })
    .catch (err => {
      res.status(500).json({ message: 'Failed to create new character' });
    });
  });


// UPDATE (EDIT)  
server.put('/:id', (req, res) => {
  const { id } = req.params;
  const changes = req.body;

  Halo.findById(id)
  .then(char => {
    if (char) {
      Halo.update(changes, id)
      .then(updatedchar => {
        res.json(updatedchar);
      });
    } else {
      res.status(404).json({ message: 'Could not find char with given id' });
    }
  })
  .catch (err => {
    res.status(500).json({ message: 'Failed to update charcter' });
  });
});

server.delete('/:id', (req, res) => {
  const { id } = req.params;

  Halo.remove(id)
  .then(deleted => {
    if (deleted) {
      res.json({ removed: deleted });
    } else {
      res.status(404).json({ message: 'Could not find character with given id' });
    }
  })
  .catch(err => {
    res.status(500).json({ message: 'Failed to delete character' });
  });
});


module.exports = server;