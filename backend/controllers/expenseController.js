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

const updateExpense = async(req, res => {
    const {amount, note, category} = req.body;

    if(!category){
        return res.status(404).json({error: "category not found"});
    }

    try {
        const userId = req.user._id;
        const expenseId = req.params.id;
        
        const expense = await Expense.findById(expenseId);

        if(!expense){
            return res.status(404).json({error: "Expense doesn't exist"});
        }

        if(expense.userId !== userId){
            return res.status(403).json({error: "You are only allowed to update your expenses."});
        }

        const fieldsToUpdate = ["amount", "note", "category"];

        fieldsToUpdate.forEach(field => {
            if(req.body[field]){
                expense[field] = req.body[field];
            }
        });

        const updatedFields = await expense.save();
        res.status(200).json(updatedFields);
    } catch (error) {
        console.error({Error_Updating_Expenses: error.message});
        res.status(500).json({error: "Internal server error"});
    }
})

module.exports = {createExpense, updateExpense};