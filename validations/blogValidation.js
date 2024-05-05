const Joi = require("joi");

function postValidation(req, res, next) {
  const postSchema = Joi.object({
    title: Joi.string().required(),
    content: Joi.string().required(),
  });

  const { error } = postSchema.validate(req.body);
  if (error) {
    return res.status(400).json({ message: error.details[0].message });
  }
  next();
}

module.exports = { postValidation };
