const {default: mongoose} = require("mongoose");

const ExpenseSchema = new mongoose.Schema({
    amount: Number,
    category: [{type: mongoose.Schema.Types.ObjectId, ref: 'Budget'}],
    note: String
}, {timestamps: true});

module.exports = mongoose.model('Expense', ExpenseSchema);