import DateExtension from '@joi/date';
import JoiImport from 'joi';
const Joi = JoiImport.extend(DateExtension);

export const flightsSchema = Joi.object({
    origin: Joi.number().required(),
    destination: Joi.number().required(),
    date: Joi.date().format('DD-MM-YYYY').utc(),
});

export const flightDate = Joi.object({
    biggerDate: Joi.date().format('DD-MM-YYYY').utc(),
    smallerDate: Joi.date().format('DD-MM-YYYY').utc(),
})