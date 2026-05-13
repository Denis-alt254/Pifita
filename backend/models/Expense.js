const {default: mongoose} = require("mongoose");

const ExpenseSchema = new mongoose.Schema({
    amount: Number,
    category: [{type: mongoose.Schema.Types.ObjectId, ref: 'Budget'}],
    userId:[{type: mongoose.Schema.Types.ObjectId, ref: 'User'}],
    note: String
}, {timestamps: true});

module.exports = mongoose.model('Expense', ExpenseSchema);