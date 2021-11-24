const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const schema = new Schema({
    symbol: {type: String},
    openPrice: { type: Number},
    closePrice: { type: Number, required: false},
    openCost: { type: Number},
    closeCost: { type: Number, required: false},
    quantity: { type: Number},
    openDate: { type: Date, default: Date.now},
    closeDate: { type: Date, required: false},
    portfolio: {
        type: Schema.Types.ObjectID,
        ref: "Portfolio"
    },
    status: {type: String}

});

schema.set('toJSON', {
    virtuals: true,
    versionKey: false,
    transform: function (doc, ret) {
        delete ret._id;
        delete ret.hash;
    }
});


module.exports = mongoose.model('Transaction', schema);
