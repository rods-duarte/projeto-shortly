import Joi from 'joi';

const UrlSchema = Joi.object({
  url: Joi.string().uri().required(),
});

export default UrlSchema;
