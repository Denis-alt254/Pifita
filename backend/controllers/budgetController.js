const Budget = require("../models/Budget");

const createBudget = async(req, res) => {
    const userId = req.user._id;
    const {userId ,category, to_spent} = req.body;
    
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

module.exports = {createBudget};