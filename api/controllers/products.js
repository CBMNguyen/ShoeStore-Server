const Product = require("../model/product");
const Category = require("../model/category");
const Color = require("../model/color");
const Size = require("../model/size"); // add validate size for product then
const cloudinary = require("../utils/cloudinary.config");

module.exports = {
  // handle get all Product
  product_getAll: async (req, res) => {
    try {
      const products = await Product.find().populate([
        { path: "category" },
        {
          path: "productDetail",
          populate: [{ path: "color" }, { path: "sizeAndQuantity.size" }],
        },
      ]);

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
      const product = await Product.findById({ _id: productId }).populate([
        { path: "category" },
        {
          path: "productDetail",
          populate: [{ path: "color" }, { path: "sizeAndQuantity.size" }],
        },
      ]);
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
      material,
      promotionPercent,
      description,
      quantityStock,
    } = req.body;

    req.body.images = [];

    if (req.files) {
      // Upload to cloud
      for (let i = 0; i < req.files.length; i++) {
        try {
          req.body.images[i] = await cloudinary.upload(
            req.files[i].path,
            process.env.CLOUD_FOLDER_UPLOAD
          );
        } catch (error) {
          return res.status(500).json({ error });
        }
      }
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

      let productDetail = JSON.parse(req.body.productDetail);
      // get images when upload on cloudinary
      productDetail = productDetail.map((item) => {
        const length = Object.keys(item.images).length;
        const images = req.body.images.slice(0, length);
        req.body.images.splice(0, length);
        return { ...item, images: images };
      });

      const newProduct = new Product({
        category,
        name,
        originalPrice: parseFloat(originalPrice),
        promotionPercent: parseInt(promotionPercent),
        salePrice: parseFloat(originalPrice) + parseFloat(originalPrice * 0.1),
        material,
        description,
        quantityStock: parseInt(quantityStock),
        productDetail,
      });

      let productCreated = await newProduct.save();

      await productCreated
        .populate([
          { path: "category" },
          {
            path: "productDetail",
            populate: [{ path: "color" }, { path: "sizeAndQuantity.size" }],
          },
        ])
        .execPopulate();

      res.status(201).json({ message: "Added a new product.", productCreated });
    } catch (error) {
      console.log(error);
      res.status(500).json({ error });
    }
  },

  // handle update Product
  product_update: async (req, res) => {
    const {
      category,
      name,
      originalPrice,
      isFreeShip,
      promotionPercent,
      description,
      quantityStock,
    } = req.body;

    const { productId } = req.params;
    req.body.images = [];
    if (req.files) {
      // Upload to cloud
      for (let i = 0; i < req.files.length; i++)
        req.body.images[i] = await cloudinary.upload(
          req.files[i].path,
          process.env.CLOUD_FOLDER_UPLOAD
        );
    }

    try {
      const { name } = await Product.findById({ _id: productId });
      const isCurrentProduct = await Product.findOne({ name: req.body.name });

      if (name === req.body.name || !isCurrentProduct) {
        let productDetail = JSON.parse(req.body.productDetail);
        // get images when upload on cloudinary
        productDetail = productDetail.map((item) => {
          const length = Object.keys(item.images).length;
          const images = req.body.images.slice(0, length);
          req.body.images.splice(0, length);
          return { ...item, images: images };
        });

        await Product.updateOne(
          { _id: productId },
          {
            $set: {
              category,
              name,
              promotionPercent: parseInt(promotionPercent),
              originalPrice: parseFloat(originalPrice),
              salePrice:
                parseFloat(originalPrice) + parseFloat(originalPrice * 0.1),
              isFreeShip,
              description,
              quantityStock: parseInt(quantityStock),
              productDetail,
            },
          }
        );

        const productUpdated = await Product.findById({
          _id: productId,
        }).populate([
          { path: "category" },
          {
            path: "productDetail",
            populate: [{ path: "color" }, { path: "sizeAndQuantity.size" }],
          },
        ]);

        res.status(200).json({ message: "Product updated.", productUpdated });
      } else {
        return res.status(409).json({ message: "Product already exist." });
      }
    } catch (error) {
      res.status(500).json({ error });
    }
  },

  product_updateState: async (req, res) => {
    try {
      await Product.updateOne(
        { _id: req.params.productId },
        { $set: { state: req.body.state } }
      );
      res
        .status(200)
        .json({ message: "Product updated.", state: req.body.state });
    } catch (error) {
      console.log(error);
      res.status(500).json({ error });
    }
  },

  product_updateQuantity: async (req, res) => {
    try {
      await Product.updateOne(
        { _id: req.params.productId },
        { $set: { ...req.body } }
      );
      res.status(200).json({ message: "Product updated." });
    } catch (error) {
      console.log(error);
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
