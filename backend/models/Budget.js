const {default: mongoose} = require("mongoose");

const BudgetSchema = new mongoose.Schema({
    category: String,
    to_spent: Number
}, {timestamps: true});

module.exports = mongoose.model('Budget', BudgetSchema);