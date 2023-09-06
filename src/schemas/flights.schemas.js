import DateExtension from '@joi/date';
import JoiImport from 'joi';
const Joi = JoiImport.extend(DateExtension);

export const flightsSchema = Joi.object({
    origin: Joi.number().required(),
    lastName: Joi.number().required(),
    date: Joi.date().format('dd-mm-yyyy').utc(),
});
