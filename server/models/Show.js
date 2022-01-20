const { Schema, Types } = require('mongoose');

const showSchema = new Schema({
    showId: {
      type: Schema.Types.ObjectId,
      default: () => new Types.ObjectId(),  
    },
    title: {
        type: String,
        required: true,
    },
    address: {
        type: String,
    },
    image: {
        type: String,
    },

});

module.exports = showSchema;