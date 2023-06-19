const mongoose = require("mongoose");
const DocumentsObject = require("../../database/migrations/create_Documents_model");
const Documents = mongoose.model(
  "Documents",
  new mongoose.Schema(DocumentsObject)
);

module.exports = Documents;
