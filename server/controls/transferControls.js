const Transfert = require("../modles/Transfert"); // Adjust the path as necessary
const Product = require("../modles/product"); // Adjust the path as necessary
const ShopCenter = require("../modles/Shop"); // Adjust the path as necessary
const ProduitStock = require("../modles/ProduitStock"); // Adjust the path as necessary

exports.createTransfert = async (req, res) => {
  const { id_produit, id_centre, quantite_transfert } = req.body;
  const originShopId = 1;
  try {
    // Verify if the Product exists
    const productExists = await Product.findOne({ productId: id_produit });
    if (!productExists) {
      return res.status(404).send({ message: "Product not found" });
    }

    // Verify if the Shop Center exists
    const centreExists = await ShopCenter.findOne({ shopID: id_centre });
    if (!centreExists) {
      return res.status(404).send({ message: "Shop Center not found" });
    }

    // If both exist, create the Transfert

    // Create the Transfert

    // Update stock in ProduitStock for the originating shop
    const stockOrigin = await ProduitStock.findOne({
      id_produit: id_produit,
      id_shop: originShopId,
    });

    if (stockOrigin) {
      if (stockOrigin.quantite_en_stock < quantite_transfert)
        return res
          .status(400)
          .send({ message: "Insufficient stock for transfer" });
      stockOrigin.quantite_en_stock -= quantite_transfert;
      await stockOrigin.save();
    } else {
      return res
        .status(404)
        .send({ message: "Stock not found in originating shop" });
    }
    const newTransfert = new Transfert({
      id_produit,
      id_centre,
      quantite_transfert,
    });
    await newTransfert.save();
    // Update or create stock in ProduitStock for the destination shop
    const stockDestination = await ProduitStock.findOne({
      id_produit,
      id_shop: id_centre,
    });
    if (stockDestination) {
      stockDestination.quantite_en_stock += quantite_transfert;
      await stockDestination.save();
    } else {
      // Create new stock entry if it doesn't exist
      const newStock = new ProduitStock({
        id_produit,
        id_shop: id_centre,
        quantite_en_stock: quantite_transfert,
      });
      await newStock.save();
    }

    res.status(201).send({
      message: "Transfert created successfully",
      data: newTransfert,
    });
  } catch (error) {
    console.log(error);
    res.status(500).send(error);
  }
};

// Get a single Transfert entry by ID
exports.getTransfert = async (req, res) => {
  try {
    const transfert = await Transfert.findById(req.params.id);
    if (!transfert) {
      return res.status(404).send({ message: "Transfert not found" });
    }
    res.status(200).send(transfert);
  } catch (error) {
    res.status(500).send(error);
  }
};

// Get all Transfert entries
exports.getAllTransferts = async (req, res) => {
  try {
    let transferts = await Transfert.find({ id_centre: req.params.idShop });
    transferts = await Promise.all(
      transferts.map(async (transfer) => {
        transfer = transfer.toObject(); // Convert Mongoose document to a plain JavaScript object

        // Fetch product details
        const product = await Product.findOne({
          productId: transfer.id_produit,
        }).select("name categoryId"); // Replace 'idProduct' and 'name' with actual field names in your Product model
        transfer.productDetails = product || {
          name: "Unknown Product",
          categoryId: "not Found",
        }; // Add product details to transfer

        return transfer;
      })
    );

    res.status(200).send(transferts);
  } catch (error) {
    console.log(error);
    res.status(500).send(error);
  }
};

// Update a Transfert entry by ID
exports.updateTransfert = async (req, res) => {
  try {
    const updatedTransfert = await Transfert.findOneAndUpdate(
      { id_transfert: req.params.id },
      req.body,
      { new: true }
    );
    if (!updatedTransfert) {
      return res.status(404).send({ message: "Transfert not found" });
    }
    res.status(200).send({
      message: "Transfert updated successfully",
      data: updatedTransfert,
    });
  } catch (error) {
    res.status(500).send(error);
  }
};

// Delete a Transfert entry by ID
exports.deleteTransfert = async (req, res) => {
  try {
    const transfert = await Transfert.findOneAndDelete({
      id_transfert: req.params.id,
    });
    if (!transfert) {
      return res.status(404).send({ message: "Transfert not found" });
    }
    res.status(200).send({ message: "Transfert deleted successfully" });
  } catch (error) {
    res.status(500).send(error);
  }
};

exports.getRecentTransfers = async (req, res) => {
  try {
    // Retrieve the shop ID from the request parameters
    const shopId = req.params.shopId; // Make sure this matches the parameter name in your route

    // Find recent transfers for the specified shop
    let recentTransfers = await Transfert.find({ id_centre: shopId })
      .sort({ date_transfert: -1 })
      .limit(10);

    recentTransfers = await Promise.all(
      recentTransfers.map(async (transfer) => {
        transfer = transfer.toObject(); // Convert Mongoose document to a plain JavaScript object

        // Fetch product details
        const product = await Product.findOne({
          productId: transfer.id_produit,
        }).select("name"); // Replace 'idProduct' and 'name' with actual field names in your Product model
        transfer.productDetails = product || { name: "Unknown Product" }; // Add product details to transfer

        return transfer;
      })
    );

    res.status(200).send(recentTransfers);
  } catch (error) {
    console.error("Error fetching recent transfers:", error);
    res.status(500).send(error);
  }
};
