
const { Schema, model } = require('mongoose');

const pictureSchema = new Schema(

    {
        pictureData: String,
        username: String,
    },
);


const File = model('Picture', pictureSchema);

module.exports = File;
