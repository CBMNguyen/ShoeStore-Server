const Category = require("../model/category");

module.exports = {
  // handle get all categories
  category_getAll: async (req, res) => {
    try {
      const categories = await Category.find();
      res
        .status(200)
        .json({ message: "Fetch catelogy successfully.", categories });
    } catch (error) {
      res.status(500).json({ error });
    }
  }, 

  //handle create category
  category_create: async (req, res) => {
    const { name } = req.body;
    try {
      const isCurrentName = await Category.findOne({name});
      if(isCurrentName) return res.status(409).json({message: "Category already exists."});

      const newCategory = new Category({ name });
      await newCategory.save();
      res.status(200).json({ message: "Added a new category.", newCategory });
    } catch (error) {
      res.status(500).json({ error });
    }
  },

  // handle update category
  category_update: async (req, res) => {
    const { categoryId } = req.params;
    try {
      const category = await Category.findById({_id: categoryId});
      const isCurrentName = await Category.findOne({name: req.body.name});

      if(category.name === req.body.name || !isCurrentName){
          const categoryUpdated = await Category.updateOne(
          { _id: categoryId },
          {
            $set: {
              ...req.body,
            },
          }
        );
        res.status(200).json({ message: "Category updated.", categoryUpdated });
      }else{
        res.status(409).json({message: "Category already exists."});
      }
    } catch (error) {
      res.status(500).json({ error });
    }
  },
  // handle delete category
  category_delete: async (req, res) => {
    const { categoryId } = req.params;
    try {
      await Category.deleteOne({ _id: categoryId });
      res.status(200).json({ message: "Category deleted" });
    } catch (error) {
      res.status(500).json({ error });
    }
  },
};
