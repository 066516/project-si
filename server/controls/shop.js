const Shop = require("../modles/Shop");
const Employe = require("../modles/Employe");
// Create a new shop
exports.createShop = async (req, res) => {
  const responsableId = req.body.responsable_centre;

  try {
    if (responsableId) {
      const employeExists = await Employe.findOne({ EmployeID: responsableId });
      if (!employeExists) {
        return res.status(404).send({ message: "Employe does not exist" });
      }
    }
    const newShop = new Shop(req.body);
    await newShop.save();
    res.status(201).send({
      message: "Shop created successfully",
      data: newShop,
    });
  } catch (error) {
    res.status(500).send(error);
  }
};

// Get all shops
exports.getAllShops = async (req, res) => {
  try {
    const shops = await Shop.find();
    res.status(200).json(shops);
  } catch (error) {
    res.status(500).send(error);
  }
};
exports.updateShopByShopID = async (req, res) => {
  try {
    const updatedShop = await Shop.findOneAndUpdate(
      { shopID: req.params.shopID },
      req.body,
      { new: true }
    );
    if (!updatedShop) {
      return res.status(404).send({ message: "Shop not found" });
    }
    res.status(200).send({
      message: "Shop updated successfully",
      data: updatedShop,
    });
  } catch (error) {
    res.status(500).send(error);
  }
};

// Delete a shop by shopID
exports.deleteShopByShopID = async (req, res) => {
  try {
    const shop = await Shop.findOneAndDelete({ shopID: req.params.shopID });
    if (!shop) {
      return res.status(404).send({ message: "Shop not found" });
    }
    res.status(200).send({ message: "Shop deleted successfully" });
  } catch (error) {
    res.status(500).send(error);
  }
};

// Find a single shop by shopID
exports.findShopByShopID = async (req, res) => {
  try {
    const shop = await Shop.findOne({ shopID: req.params.shopID });
    if (!shop) {
      return res.status(404).send({ message: "Shop not found" });
    }
    res.status(200).send(shop);
  } catch (error) {
    res.status(500).send(error);
  }
};
exports.deleteAllShops = async (req, res) => {
  try {
    await Shop.deleteMany({});
    res
      .status(200)
      .send({ message: "All shops have been successfully deleted" });
  } catch (error) {
    res.status(500).send(error);
  }
};
