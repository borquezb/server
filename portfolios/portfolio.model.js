const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const schema = new Schema({
    number: { type: Number, unique: true, required: true },
    createdDate: { type: Date, default: Date.now },
    balance: { type: Number},
    user: {
        type: Schema.Types.ObjectID,
        ref: "User"
    }
});

schema.set('toJSON', {
    virtuals: true,
    versionKey: false,
    transform: function (doc, ret) {
        delete ret._id;
        delete ret.hash;
    }
});

module.exports = mongoose.model('Portfolio', schema);
