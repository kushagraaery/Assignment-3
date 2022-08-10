const BookModel = require('../models/book')

// Create and Save a new book
exports.create = async (req, res) => {
    if (!req.body.name && !req.body.author && !req.body.price && !req.body.quantity) {
        res.status(400).send({ message: "Content can not be empty!" });
    }
    //console.log(req.body);
    
    const book = new BookModel({
        name: req.body.name,
        author: req.body.author,
        price: req.body.price,
        quantity: req.body.quantity
    });
    
    await book.save().then(data => {
        res.send({
            message:"Book created successfully!!",
            book:data
        });
    }).catch(err => {
        res.status(500).send({
            message: err.message || "Some error occurred while creating book"
        });
    });
};

// Retrieve all books from the database.
exports.findAll = async (req, res) => {
    try {
        const book = await BookModel.find();
        res.status(200).json(book);
    } catch(error) {
        res.status(404).json({message: error.message});
    }
};

// Find a single book with an id
exports.findOne = async (req, res) => {
    try {
        const book = await BookModel.findById(req.params.id);
        res.status(200).json(book);
    } catch(error) {
        res.status(404).json({ message: error.message});
    }
};

// Update a book by the id in the request
exports.update = async (req, res) => {
    if(!req.body) {
        res.status(400).send({
            message: "Data to update can not be empty!"
        });
    }
    
    const id = req.params.id;
    
    await BookModel.findByIdAndUpdate(id, req.body, { useFindAndModify: false }).then(data => {
        if (!data) {
            res.status(404).send({
                message: `Book not found.`
            });
        }else{
            res.send({ message: "Book updated successfully." })
        }
    }).catch(err => {
        res.status(500).send({
            message: err.message
        });
    });
};

// Delete a book with the specified id in the request
exports.destroy = async (req, res) => {
    await BookModel.findByIdAndRemove(req.params.id).then(data => {
        if (!data) {
          res.status(404).send({
            message: `Book not found.`
          });
        } else {
          res.send({
            message: "Book deleted successfully!"
          });
        }
    }).catch(err => {
        res.status(500).send({
          message: err.message
        });
    });
};