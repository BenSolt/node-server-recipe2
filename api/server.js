const express = require("express");
const cors = require('cors');
const Halo = require("../halo/haloModel");

const server = express();

server.use(cors())
server.use(express.json());

const multer = require('multer')
const Tesseract = require('tesseract.js')

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
      res.status(500).json({ message: 'failed to get recipe' });
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
        res.status(404).json({ message: 'Could not find recipe with given id.' })
      }
    })
    .catch(err => {
      res.status(500).json({ err, message: 'Failed to get recipe' });
    });
});

//POST (CREATE)
server.post('/char', (req, res) => {
  const data = req.body;

  Halo.add(data)
    .then(char => {
      // Halo.find()
      //   .then(halo => {
      //     res.status(200).json(halo);
      //   })
      res.status(201).json(char);
    })
    .catch(err => {
      res.status(500).json({ message: 'Failed to create new recipe' });
    });
});

//POST (CREATE) OCR ////////////////////////////////////////////

// server.get("/uploads/:id", (req, res) => {
//   console.log(__dirname)
//   res.send(fs.readFileSync(`${__dirname}\\uploads\\${req.params.id}`));
// });



// const fileUpload = require('express-fileupload');
// app.use(fileUpload({ debug: true }));

// // Upload Endpoint
server.post("/upload", (req, res) => {
  if (req.files === null) {
    return res.status(400).json({ msg: 'No file uploaded' });
  }

  const file = req.files.file;

  file.mv(`${__dirname}\\uploads\\${file.name}`, err => {
    if (err) {
      console.error(err);
      return res.status(500).send(err);
    }

    res.json({ fileName: file.name, filePath: `/uploads/${file.name}` });
  });
});

////////////////////////////////////////////////////////////////////
//NOT USING BELOW

// const storage=multer.diskStorage({
//   destination:(req,file,cb)=>{
//       cb(null,'./uploads/');
//   },
//   filename:(req,file,cb)=>{
//       cb(null,file.originalname);
//   }
// })

// const upload= multer({storage:storage});

// app.post('/upload', (req, res) => {
//   upload(req, res, err => {
//       console.log(req.file);
//       fs.readFile(`./uploads/${req.file.originalname}`, (err, data) => {
//           if (err) return console.log('error');
//           try {
//               Tesseract
//                   .recognize(
//                       'uploads/' + req.file.filename,
//                       'eng',
//                   { logger: m => console.log(m) }
//                   )
//                   .then(({ data: { text } }) => {
//                       return res.json(
//                           {
//                               text
//                           }
//                       )
//                   })
//           } catch (error) {
//               console.error(error)
//           }
//       });
//   });
// });

// EDIT RECIPE
server.put('/char/:id', (req, res) => {
  Halo.update(req.body, req.params.id)
    .then(char => {
      if (char) {
        res.json(char)
      } else {
        res.status(404).json({ message: "Recipe with specified ID does not exist" })
      }
    })
    .catch(err => {
      res.status(500).json({ message: "Could not update Recipe" })
    })
})


server.delete('/char/:id', (req, res) => {
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