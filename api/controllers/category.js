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
      res.status(200).json({ message: "Created category sucessfully" });
    } catch (error) {
      res.status(500).json({ error });
    }
  }, // handle delete category
  category_delete: async (req, res) => {
    const { categoryId } = req.params;
    try {
      await Category.remove({ _id: categoryId });
      res.status(200).json({ message: "Category deleted" });
    } catch (error) {
      res.status(500).json({ error });
    }
  },
};
