const Budget = require("../models/Budget");
const Expense = require("../models/Expense");

const getExpensesByUser = async(req, res) => {
    try {
        const userId = req.user.userId;
        const expenses = await Expense.find({userId: userId});

        if(expenses == []){
            return res.status(404).json({error: "Expenses not found"});
        }
        res.status(200).json(expenses);
    } catch (error) {
        console.error({Error_Getting_Epenses_PerUser: error.message});
        res.status(500).json({error: "Internal server error"});
    }
}

const createExpense = async(req, res) => {
    const{amount, note, userId = req.user.userId, category} = req.body;

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

const updateExpense = async(req, res) => {
    const {amount, note, category} = req.body;

    if(!category){
        return res.status(404).json({error: "category not found"});
    }

    try {
        const userId = req.user.userId;
        const expenseId = req.params.id;
        
        const expense = await Expense.findById(expenseId);

        if(!expense){
            return res.status(404).json({error: "Expense doesn't exist"});
        }

        if(expense.userId != userId){
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
}

const deleteExpense = async(req, res) => {
    try {
        const userId = req.user.userId;
        const expenseId = req.params.id;

        const expense = await Expense.findById(expenseId);

        if(!expense){
            return res.status(404).json({error: "Expense not found"});
        }

        //verify ownership
        if(expense.userId != userId){
            return res.status(403).json({error: "You can only delete your expenses."});
        }

        await expense.deleteOne();
        res.status(204).json({message: "Expense deleted successfully"});
    } catch (error) {
        console.error({Error_deleting_Expense: error.message});
        res.status(500).json({error: "Internal server error"});
    }
}

module.exports = {createExpense, updateExpense, getExpensesByUser, deleteExpense};