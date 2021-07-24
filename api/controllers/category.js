const Category = require("../model/category");

module.exports = {
  // handle get all categories
  category_getAll: async (req, res) => {
    try {
      const categories = await Category.find();
      res.status(200).json({ categories });
    } catch (error) {
      res.status(500).json({ error });
    }
  }, //handle create category
  category_create: async (req, res) => {
    const { name } = req.body;
    try {
      const newCategory = new Category({ name });
      await newCategory.save();
      res.status(200).json({ message: "Created category sucessfully", newCategory });
    } catch (error) {
      res.status(500).json({ error });
    }
  },
   // handle update category
  category_update: async (req, res) => {
    const { categoryId } = req.params;
    try {
      const categoryUpdated = await Category.updateOne(
        { _id: categoryId },
        {
          $set: {
            ...req.body,
          },
        })
      res.status(200).json({ message: "Updated Category", categoryUpdated });
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
