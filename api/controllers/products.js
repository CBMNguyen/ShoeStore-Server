const Product = require("../model/product");
const Category = require("../model/category");
const Color = require("../model/color");
const Size = require("../model/size"); // add validate size for product then

module.exports = {
  // handle get all Product
  product_getAll: async (req, res) => {
    try {
      const products = await Product.find()
        .populate("color")
        .populate("category")
        .populate("size");

      res.status(200).json({
        message: "Fetch product successfully.",
        products,
      });
    } catch (error) {
      res.status(500).json({ error });
    }
  }, 

  // handle get product by Id
  product_getById: async (req, res) => {
    const { productId } = req.params;
    try {
      const product = await Product.findById({ _id: productId });
      if (product) res.status(200).json({ product });
      else
        res
          .status(404)
          .json({ message: "No valid entry found for provided Id." });
    } catch (error) {
      res.status(500).json({ error });
    }
  }, 

  // handle create Product
  product_create: async (req, res) => {
    const {
      category,
      name,
      originalPrice,
      isFreeShip,
      promotionPercent,
      color,
      size,
      description,
      quantityStock,
    } = req.body;

    if (req.files) {
      const files = req.files.map((file) => {
        return file.path;
      });
      req.body.images = files;
    }

    try {
      const isCategory = await Category.findById({ _id: category });
      const isCurrentName = await Product.findOne({ name });
      if (!isCategory) {
        return res
          .status(404)
          .json({ message: "No valid entry found for provided CategoryId." });
      }

      if (isCurrentName) {
        return res.status(409).json({ message: "Product already exists." });
      }

      console.log(req.body);

      const newProduct = new Product({
        category,
        name,
        originalPrice: parseFloat(originalPrice),
        promotionPercent: parseInt(promotionPercent),
        salePrice: Math.ceil(
          originalPrice * (1 - parseInt(promotionPercent) / 100)
        ),
        isFreeShip,
        images: req.body.images,
        color,
        size,
        description,
        quantityStock: parseInt(quantityStock),
      });

     let product = await newProduct.save();
     productCreated = await Product.findById({ _id: product._id })
      .populate("color")
      .populate("category")
      .populate("size");
     res.status(201).json({ message: "Added a new product.", productCreated });
     } catch (error) {
       res.status(500).json({ error });
     }
  }, 

  // handle update Product
  product_update: async (req, res) => {
    const { productId } = req.params;
    if (req.files) {
      const files = req.files.map((file) => {
        return file.path;
      });
      req.body.images = files;
    }
    try {
      const {name} = await Product.findById({ _id: productId });
      const isCurrentProduct = await Product.findOne({ name: req.body.name });

      if (name === req.body.name || !isCurrentProduct) {
        await Product.updateOne(
          { _id: productId },
          {
            $set: {
              ...req.body,
            },
          }
        );
        const productUpdated = await Product.findById({ _id: productId })
          .populate("color")
          .populate("category")
          .populate("size");
        res.status(200).json({ message: "Product updated.", productUpdated });
      } else {
        return res.status(409).json({ message: "Product already exist." });
      }
    } catch (error) {
      res.status(500).json({ error });
    }
  }, 

  // handle delete Product
  product_delete: async (req, res) => {
    const { productId } = req.params;
    try {
      const product = await Product.deleteOne({ _id: productId });
      res.status(200).json({ message: "Product deleted.", product });
    } catch (error) {
      res.status(500).json({ error });
    }
  },
};
