const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const schema = new Schema({
    date: { type: Date },
    balance: { type: Number},
    portfolio: {
        type: Schema.Types.ObjectID,
        ref: "Portfolio"
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

module.exports = mongoose.model('PortfolioBalance', schema);
