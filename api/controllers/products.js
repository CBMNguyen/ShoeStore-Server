const Product = require("../model/product");
const Category = require("../model/category");
const Color = require("../model/color");
const Size = require("../model/size"); // add validate size for product then

module.exports = {
  // handle get all Product
  product_getAll: async (req, res) => {
    try {
      const products = await Product.find()
        .populate("color", "color")
        .populate("category", "name")
        .populate("size", "size");
      const page = req.query.page || 1;
      const limit = req.query.limit || products.length;

      const start = (page - 1) * limit;
      const end = page * limit;

      filterProducts = products.slice(start, end);

      res.status(200).json({
        products: filterProducts,
        pagination: {
          page,
          limit,
          totalRow: products.length,
        },
      });
    } catch (error) {
      res.status(500).json({ error });
    }
  }, // handle get product by Id
  product_getById: async (req, res) => {
    const { productId } = req.params;
    try {
      const product = await Product.findById({ _id: productId });
      if (product) res.status(200).json({ product });
      else
        res
          .status(404)
          .json({ message: "No valid entry found for provided Id" });
    } catch (error) {
      res.status(500).json({ error });
    }
  }, // handle create Product
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
      const isColor = await Color.findById({ _id: color });
      const isName = await Product.findOne({name});
      if (!isCategory) {
        return res
          .status(404)
          .json({ message: "No valid entry found for provided CategoryId" });
      }

      if (!isColor) {
        return res
          .status(404)
          .json({ message: "No valid entry found for provided ColorId" });
      }

      if(isName){
        return res
          .status(409)
          .json({ message: "Product exist" });
      }

      console.log(req.body);

      const newProduct = new Product({
        category,
        name,
        originalPrice: parseInt(originalPrice),
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
      })
     let product = await newProduct.save();
      productCreated = await Product.findById({ _id: product._id }).populate("color", "color")
        .populate("category", "name")
        .populate("size", "size");
      res.status(201).json({ message: "Product created", productCreated });
    } catch (error) {
      res.status(500).json({ error });
    }
  }, // handle update Product
  product_update: async (req, res) => {
    const { productId } = req.params;
    if (req.files) {
      const files = req.files.map((file) => {
        return file.path;
      });
      req.body.images = files;
    }
    try {
      await Product.updateOne(
        { _id: productId },
        {
          $set: {
            ...req.body,
          },
        }
      );
      const productUpdated = await Product.findById({ _id: productId }).populate("color", "color")
        .populate("category", "name")
        .populate("size", "size");
      res.status(200).json({ message: "Product updated", productUpdated });
    } catch (error) {
      res.status(500).json({ error });
    }
  }, // handle delete Product
  product_delete: async (req, res) => {
    const { productId } = req.params;
    try {
      const product = await Product.deleteOne({ _id: productId });
      res.status(200).json({ message: "Product deleted", product });
    } catch (error) {
      res.status(500).json({ error });
    }
  },
};
