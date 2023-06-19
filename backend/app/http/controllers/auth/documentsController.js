const documents = require("../../../models/Documents");

exports.createDocument = async (req, res) => {
  // existingUser = await user.findOne({ name: req.body.name });
  // if (existingUser) {
  //   // Name already exists
  //   return res.status(422).json({ message: "Name already exists" });
  // }
  const user = req.user;

  const document = new documents({
    created_by: user.id,
    title: req.body.title,
    value: req.body.value,
  });

  document
    .save()
    .then((document) =>
      res.json({
        success: true,
      })
    )
    .catch((err) => console.log(err));
};

exports.getDocuments = async (req, res) => {
  const user = req.user;
  documents
    .find({ created_by: user.id })
    .then((documents) => {
      res.json({
        success: true,
        documents: documents,
      });
    })
    .catch((err) => console.log(err));
};

exports.deleteDocument = async (req, res) => {
  const user = req.user;
  documents
    .findOneAndDelete({ _id: req.params.id, created_by: user.id })
    .then((document) => {
      res.json({
        success: true,
      });
    })
    .catch((err) => console.log(err));
};

exports.updateDocument = async (req, res) => {
  const user = req.user;
  documents
    .findOneAndUpdate(
      { _id: req.params.id, created_by: user.id },
      { title: req.body.title, value: req.body.value }
    )
    .then((document) => {
      res.json({
        success: true,
      });
    })
    .catch((err) => console.log(err));
};

exports.getDocument = async (req, res) => {
  const user = req.user;
  documents
    .findOne({ _id: req.params.id, created_by: user.id })
    .then((document) => {
      res.json({
        success: true,
        document: document,
      });
    })
    .catch((err) => console.log(err));
};
