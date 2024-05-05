const Joi = require("joi");

function commentValidation(req, res, next) {
  const commentSchema = Joi.object({
    content: Joi.string().required(),
  });

  const { error } = commentSchema.validate(req.body);
  if (error) {
    return res.status(400).json({ message: error.details[0].message });
  }
  next();
}

module.exports = { commentValidation };
