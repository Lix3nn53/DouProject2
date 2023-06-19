const main = {};

main.registerController = require("../http/controllers/auth/registerController");
main.loginController = require("../http/controllers/auth/loginController");
main.resetPasswordController = require("../http/controllers/auth/resetPasswordController");
main.openaiController = require("../http/controllers/openai/openaiController");
main.documentsController = require("../http/controllers/auth/documentsController");

module.exports = main;
