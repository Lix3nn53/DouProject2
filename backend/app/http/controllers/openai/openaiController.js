const mail = require("../../../../email");
const user = require("../../../models/Users");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const key = require("../../../../config/application").key;

const { Configuration, OpenAIApi } = require("openai");
const config = require("../../../../config/openai");

const openai = new OpenAIApi(
  new Configuration({
    apiKey: config.apiKey,
  })
);

exports.grammerCorrection = async (req, res) => {
  let prompt = req.body.prompt;

  try {
    const response = await openai.createCompletion({
      model: "text-davinci-003",
      prompt: `Correct this to standard English:${prompt}`,
      temperature: 0,
      max_tokens: 120,
      top_p: 1.0,
      frequency_penalty: 0.0,
      presence_penalty: 0.0,
    });

    const text = response.data.choices[0].text;

    return res.json({
      success: true,
      text,
    });
  } catch (err) {
    console.log(err);
    return res.status(400).json(err);
  }
};

exports.improveWriting = async (req, res) => {
  let prompt = req.body.prompt;

  try {
    const response = await openai.createCompletion({
      model: "davinci",
      prompt: `Improve this writing:${prompt}`,
      temperature: 0,
      max_tokens: 120,
      top_p: 1.0,
      frequency_penalty: 0.0,
      presence_penalty: 0.0,
    });

    const text = response.data.choices[0].text;

    return res.json({
      success: true,
      text,
    });
  } catch (err) {
    console.log(err);
    return res.status(400).json(err);
  }
};

exports.makeShorter = async (req, res) => {
  let prompt = req.body.prompt;

  try {
    const response = await openai.createCompletion({
      model: "davinci",
      prompt: `Make this writing shorter:${prompt}`,
      temperature: 0,
      max_tokens: 120,
      top_p: 1.0,
      frequency_penalty: 0.0,
      presence_penalty: 0.0,
    });

    const text = response.data.choices[0].text;

    return res.json({
      success: true,
      text,
    });
  } catch (err) {
    console.log(err);
    return res.status(400).json(err);
  }
};

exports.makeLonger = async (req, res) => {
  let prompt = req.body.prompt;

  try {
    const response = await openai.createCompletion({
      model: "davinci",
      prompt: `Make this writing longer:${prompt}`,
      temperature: 0,
      max_tokens: 120,
      top_p: 1.0,
      frequency_penalty: 0.0,
      presence_penalty: 0.0,
    });

    const text = response.data.choices[0].text;

    return res.json({
      success: true,
      text,
    });
  } catch (err) {
    console.log(err);
    return res.status(400).json(err);
  }
};

exports.changeTone = async (req, res) => {
  let prompt = req.body.prompt;
  let tone = req.body.tone;

  try {
    const response = await openai.createCompletion({
      model: "davinci",
      prompt: `Change tone to ${tone}:${prompt}`,
      temperature: 0,
      max_tokens: 120,
      top_p: 1.0,
      frequency_penalty: 0.0,
      presence_penalty: 0.0,
    });

    const text = response.data.choices[0].text;

    return res.json({
      success: true,
      text,
    });
  } catch (err) {
    console.log(err);
    return res.status(400).json(err);
  }
};

exports.simplifyLanguage = async (req, res) => {
  let prompt = req.body.prompt;

  try {
    const response = await openai.createCompletion({
      model: "davinci",
      prompt: `Simplify this writing:${prompt}`,
      temperature: 0,
      max_tokens: 120,
      top_p: 1.0,
      frequency_penalty: 0.0,
      presence_penalty: 0.0,
    });

    const text = response.data.choices[0].text;

    return res.json({
      success: true,
      text,
    });
  } catch (err) {
    console.log(err);
    return res.status(400).json(err);
  }
};

exports.continueWriting = async (req, res) => {
  let prompt = req.body.prompt;

  try {
    const response = await openai.createCompletion({
      model: "davinci",
      prompt: `Continue writing:${prompt}`,
      temperature: 0,
      max_tokens: 120,
      top_p: 1.0,
      frequency_penalty: 0.0,
      presence_penalty: 0.0,
    });

    const text = response.data.choices[0].text;

    return res.json({
      success: true,
      text,
    });
  } catch (err) {
    console.log(err);
    return res.status(400).json(err);
  }
};
