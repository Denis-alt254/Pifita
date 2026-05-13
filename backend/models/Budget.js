const {default: mongoose} = require("mongoose");

const BudgetSchema = new mongoose.Schema({
    userId:[{type: mongoose.Schema.Types.ObjectId, ref: 'User'}],
    category: String,
    to_spent: Number
}, {timestamps: true});

module.exports = mongoose.model('Budget', BudgetSchema);