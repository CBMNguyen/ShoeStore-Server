const Favourite = require("../model/favourite");

module.exports = {
  // handle get all by user
  favourite_getByUser: async (req, res) => {
    try {
      const favourites = await Favourite.find({
        userId: req.params.userId,
      }).populate([
        {
          path: "productId",
          populate: [{ path: "category" }],
        },
      ]);
      res
        .status(200)
        .json({ message: "Fetch favourites successfully.", favourites });
    } catch (error) {
      res.status(500).json({ error });
    }
  },

  // handle create favourite
  favourite_create: async (req, res) => {
    try {
      const newFavourite = new Favourite(req.body);
      await newFavourite.save();
      await newFavourite
        .populate([
          {
            path: "productId",
            populate: [{ path: "category" }],
          },
        ])
        .execPopulate();
      res.status(201).json({ message: "Added a new favourite.", newFavourite });
    } catch (error) {
      res.status(500).json({ error });
    }
  },

  // handle delete favourite
  favourite_delete: async (req, res) => {
    const { favouriteId } = req.params;
    try {
      await Favourite.deleteOne({ _id: favouriteId });
      res.status(200).json({ message: "Favourite deleted." });
    } catch (error) {
      res.status(500).json({ error });
    }
  },
};
