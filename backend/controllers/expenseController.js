const Budget = require("../models/Budget");
const Expense = require("../models/Expense");

const createExpense = async(req, res) => {
    const{amount, note, userId = req.user._id, category} = req.body;

    if(!amount||!category){
        return res.status(400).json({error: "amount and category are required"});
    }

    try {
        const existingCategory = await Budget.findOne({category});

        if(!existingCategory){
            return res.status(404).json({error: "category doesn't exist."});
        }

        const newExpense = new Expense({
            amount,
            note,
            userId,
            category
        });

        const savedExpense = await newExpense.save();

        res.status(201).json({message: "Expense created successfully", expenseId: savedExpense._id});

    } catch (error) {
        console.error({Error_creating_Expense: error.message});
        res.status(500).json({error: "Internal server error"});
    }
}

module.exports = {createExpense};