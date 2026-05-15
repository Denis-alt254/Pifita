const Budget = require("../models/Budget");

const createBudget = async(req, res) => {
    const {userId = req.user._id ,category, to_spent} = req.body;
    
    if(!category){
        return res.status(400).json({erro: "category is required"});
    }

    try {
        //check if budget exist
        const existingBudget = await Budget.findOne({category});

        if(existingBudget){
            return res.status(409).json({error: "Budget already exist"});
        }

        const newBudget = new Budget({
            userId,
            category,
            to_spent
        });

        const savedBudget = await newBudget.save();

        res.status(201).json({message: "Budget created successfully", budgetId: (await savedBudget)._id});
    } catch (error) {
        console.error({Error_Creating_Budget: error.message});
        res.status(500).json({error: "Internal server error"});
    }
}

const updateBudget = async(req, res) => {
    try {
        const userId = req.user._id;
        const budgetId = req.params.id;
        const {category, to_spent} = req.body;

        const budget =  await Budget.findById(budgetId);

        if(!budget){
            return res.status(404).json({error: "Budget not found"});
        }

        //verify ownership
        if(budget.userId !== userId){
            return res.status(403).json({error: "You can only edit your own budgets"});
        }

        const fieldsToUpdate = ["category", "to_spent"];

        fieldsToUpdate.forEach(field => {
            if(req.body[field]){
                budget[field] = req.body[field];
            }
        });

        const updatedFields = await budget.save();
        res.status(200).json(updatedFields);
    } catch (error) {
        console.error({Updating_Budget_Error: error.message});
        res.status(500).json({error: "Internal server error"});
    }
}

const deleteBudget = async(req, res) => {
    try {
        const userId = req.user._id;
        const budgetId = req.params.id;

        const budget = await Budget.findById(budgetId);

        if(!budget){
            return res.status(404).json({error: "Project not found"});
        }

        //check the ownership
        if(budget.userId !== userId){
            return res.status(403).json({error: "You can only delete your own budgets"});
        }

        await budget.deleteOne();
        res.status(204).json({message: "Budget deleted successfully"});
    } catch (error) {
        console.error({Error_Deleting_Budget: error.message});
        res.status(500).json({error: "Internal server error"});
    }
}

module.exports = {createBudget, updateBudget, deleteBudget};