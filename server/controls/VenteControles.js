const Vente = require("../modles/Vente");
const Client = require("../modles/client"); // Adjust the path as necessary
const Product = require("../modles/product"); // Adjust the path as necessary
const ProduitStock = require("../modles/ProduitStock"); // Adjust the path as necessary
const Shop = require("../modles/Shop");
const Employe = require("../modles/Employe");
exports.createVente = async (req, res) => {
  const {
    id_client,
    id_produit,
    id_shop,
    date_vente,
    quantite_vendue,
    prix_unitaire_vente,
    montant_encaisse_vente,
    statut_paiement_vente,
  } = req.body;

  try {
    // Verify if the Client exists
    const clientExists = await Client.findOne({ clientId: id_client });
    if (!clientExists) {
      return res.status(404).send({ message: "Client not found" });
    }

    // Verify if the Product exists
    const productExists = await Product.findOne({ productId: id_produit });
    if (!productExists) {
      return res.status(404).send({ message: "Product not found" });
    }

    const stockItem = await ProduitStock.findOne({ id_produit, id_shop });
    if (!stockItem || stockItem.quantite_en_stock < quantite_vendue) {
      return res.status(400).send({
        message: "Insufficient stock for this product in the specified shop",
      });
    }
    // If all exist, create the Vente
    const newVente = new Vente({
      id_client,
      id_produit,
      id_shop,
      quantite_vendue,
      prix_unitaire_vente,
      montant_encaisse_vente,
      date_vente,
      statut_paiement_vente, // or based on your business logic
    });
    await newVente.save();
    if (!statut_paiement_vente) {
      const client = await Client.findOne({
        clientId: id_client,
      });

      if (client) {
        client.creditClient +=
          newVente.montant_total_vente - parseInt(montant_encaisse_vente);

        await client.save();
      } else {
        throw new Error("client not found");
      }
      newVente.reste =
        newVente.montant_total_vente - parseInt(montant_encaisse_vente);
      await newVente.save();
    }
    stockItem.quantite_en_stock -= parseInt(quantite_vendue);
    await stockItem.save();
    res.status(201).send({
      message: "Vente created successfully",
      data: newVente,
    });
  } catch (error) {
    console.log(error);
    res.status(500).send(error);
  }
};

// Get a single Vente entry by ID
exports.getVente = async (req, res) => {
  try {
    const vente = await Vente.findById(req.params.id);
    if (!vente) {
      return res.status(404).send({ message: "Vente not found" });
    }
    res.status(200).send(vente);
  } catch (error) {
    console.log(error);
    res.status(500).send(error);
  }
};

// Get all Vente entries
exports.getAllVentes = async (req, res) => {
  try {
    let ventes = await Vente.find({ id_shop: req.params.idShop });
    ventes = await Promise.all(
      ventes.map(async (vente) => {
        vente = vente.toObject(); // Convert Mongoose document to a plain JavaScript object

        // Fetch client details
        const client = await Client.findOne({
          clientId: vente.id_client,
        }).select("nomClient prenomClient");
        vente.clientDetails = client; // Add client details to vente

        // Fetch product details
        const product = await Product.findOne({
          productId: vente.id_produit,
        }).select("name"); // Replace 'idProduct' and 'name' with actual field names in your Product model
        vente.productDetails = product; // Add product details to vente

        return vente;
      })
    );

    res.status(200).send(ventes);
  } catch (error) {
    res.status(500).send(error);
  }
};

// Update a Vente entry by ID
exports.updateVente = async (req, res) => {
  try {
    // Find the existing vente
    const existingVente = await Vente.findOne({ id_vente: req.params.id });
    if (!existingVente) {
      return res.status(404).send({ message: "Vente not found" });
    }

    const oldQuantiteVendue = existingVente.quantite_vendue;

    // Update the vente
    const updatedVente = await Vente.findOneAndUpdate(
      { id_vente: req.params.id },
      req.body,
      { new: true }
    );

    const newQuantiteVendue = updatedVente.quantite_vendue;

    // Adjust the stock if the sold quantity has changed
    if (oldQuantiteVendue !== newQuantiteVendue) {
      const stockItem = await ProduitStock.findOne({
        id_produit: updatedVente.id_produit,
        id_shop: updatedVente.id_shop,
      });
      if (stockItem) {
        // Adjust the stock based on the difference in quantities
        stockItem.quantite_en_stock += oldQuantiteVendue - newQuantiteVendue;
        await stockItem.save();
      }
    }

    res
      .status(200)
      .send({ message: "Vente updated successfully", data: updatedVente });
  } catch (error) {
    res.status(500).send(error);
  }
};

// Delete a Vente entry by ID
exports.deleteVente = async (req, res) => {
  try {
    const vente = await Vente.findOneAndDelete({ id_vente: req.params.id });
    if (!vente) {
      return res.status(404).send({ message: "Vente not found" });
    }

    // Retrieve the quantity sold
    const { id_produit, id_shop, quantite_vendue } = vente;

    // Update the stock
    const stockItem = await ProduitStock.findOne({ id_produit, id_shop });
    if (stockItem) {
      stockItem.quantite_en_stock += quantite_vendue; // Return the quantity to stock
      await stockItem.save();
    }

    res.status(200).send({ message: "Vente deleted successfully" });
  } catch (error) {
    res.status(500).send(error);
  }
};

exports.deleteAllVente = async (req, res) => {
  try {
    const Ventes = await Vente.deleteMany({});
    res.status(200).send({ message: "Vente deleted successfully" });
  } catch (error) {
    res.status(500).send(error);
  }
};
exports.VentesRecente = async (req, res) => {
  try {
    // Get the shop ID from request parameters
    const shopId = req.params.shopId; // Make sure this matches the parameter name in your route

    let recentVentes = await Vente.find({ id_shop: shopId })
      .sort({ date_vente: -1 })
      .limit(10);

    recentVentes = await Promise.all(
      recentVentes.map(async (vente) => {
        vente = vente.toObject();

        // Fetch product details
        const product = await Product.findOne({
          productId: vente.id_produit,
        }).select("name");
        vente.productDetails = product || { name: "Unknown Product" };

        // Fetch shop details
        // const shop = await Shop.findOne({ shopID: vente.id_shop }).select(
        //   "name"
        // );
        // vente.shopDetails = shop || { name: "Unknown Shop" };

        return vente;
      })
    );

    res.status(200).send(recentVentes);
  } catch (error) {
    console.error("Error fetching recent ventes:", error);
    res.status(500).send(error);
  }
};

exports.getTopEntities = async (req, res) => {
  try {
    // Top Client
    const topClient = await Vente.aggregate([
      { $match: { id_shop: 1 } },
      {
        $group: {
          _id: "$id_client",
          totalPurchases: { $sum: "montant_total_vente" },
        },
      },
      { $sort: { totalPurchases: -1 } },
      { $limit: 1 },
    ]);

    // Top Employee
    const topEmployee = await Employe.aggregate([
      { $match: { workIn: 1, trash: false } },
      { $group: { _id: "$EmployeID", totalSales: { $sum: "$salary" } } },
      { $sort: { totalSales: -1 } },
      { $limit: 1 },
    ]);

    // Top Product
    const topProduct = await Vente.aggregate([
      { $match: { id_shop: { $ne: 1 } } },
      {
        $group: { _id: "$id_produit", totalSold: { $sum: "$quantite_vendue" } },
      },
      { $sort: { totalSold: -1 } },
      { $limit: 1 },
    ]);
    console.log(topProduct);
    // Top Shops (excluding shop 1)
    const resultArray = await Vente.aggregate([
      { $match: { id_shop: { $ne: 1, $ne: null } } }, // Exclude shop 1 and null shop IDs
      {
        $group: {
          _id: "$id_shop",
          totalRevenue: { $sum: "$montant_total_vente" },
        },
      },
      { $sort: { totalRevenue: -1 } },
      { $limit: 1 },
    ]);

    // Convert the array result to an object
    const topShop = resultArray.length > 0 ? resultArray[0] : 0;
    let clientDetails = { nom: "Unknown", prenom: "Unknown" };
    if (topClient.length > 0 && topClient[0]._id) {
      const client = await Client.findOne({
        clientId: topClient[0]._id,
      }).select("nomClient prenomClient");
      if (client) {
        clientDetails = { nom: client.nomClient, prenom: client.prenomClient };
      }
    }

    // Fetch additional details for topEmployee
    let employeeName = "Unknown";
    if (topEmployee.length > 0 && topEmployee[0]._id) {
      const employee = await Employe.findOne({
        EmployeID: topEmployee[0]._id,
      }).select("name");
      if (employee) employeeName = employee.name;
    }

    // Fetch additional details for topProduct
    let productName = "Unknown";
    if (topProduct.length > 0 && topProduct[0]._id) {
      const product = await Product.findOne({
        productId: topProduct[0]._id,
      }).select("name");
      if (product) productName = product.name;
    }
    res.status(200).send({
      topClient: { client: clientDetails },
      topEmployee: { id: topEmployee[0]?._id, name: employeeName },
      topProduct: { id: topProduct[0]?._id, name: productName },
      topShop,
    });
  } catch (error) {
    console.error("Error fetching top entities:", error);
    res.status(500).send(error);
  }
};
exports.getTops = async (req, res) => {
  try {
    // Top Client
    const topClient = await Vente.aggregate([
      { $match: { id_shop: 1 } },
      {
        $group: {
          _id: "$id_client",
          totalPurchases: { $sum: "montant_total_vente" },
        },
      },
      { $sort: { totalPurchases: -1 } },
      { $limit: 1 },
    ]);

    // Top Employee
    const topEmployee = await Employe.aggregate([
      { $match: { workIn: 1, trash: false } },
      { $group: { _id: "$EmployeID", totalSales: { $sum: "$salary" } } },
      { $sort: { totalSales: -1 } },
      { $limit: 1 },
    ]);

    // Top Product
    const topProduct = await Vente.aggregate([
      { $match: { id_shop: 1 } },
      {
        $group: { _id: "$id_produit", totalSold: { $sum: "$quantite_vendue" } },
      },
      { $sort: { totalSold: -1 } },
      { $limit: 1 },
    ]);

    // Top Shops (excluding shop 1)

    // Convert the array result to an object

    let clientDetails = { nom: "Unknown", prenom: "Unknown" };
    if (topClient.length > 0 && topClient[0]._id) {
      const client = await Client.findOne({
        clientId: topClient[0]._id,
      }).select("nomClient prenomClient");
      if (client) {
        clientDetails = { nom: client.nomClient, prenom: client.prenomClient };
      }
    }

    // Fetch additional details for topEmployee
    let employeeName = "Unknown";
    if (topEmployee.length > 0 && topEmployee[0]._id) {
      const employee = await Employe.findOne({
        EmployeID: topEmployee[0]._id,
      }).select("name");
      if (employee) employeeName = employee.name;
    }

    // Fetch additional details for topProduct
    let productName = "Unknown";
    if (topProduct.length > 0 && topProduct[0]._id) {
      const product = await Product.findOne({
        productId: topProduct[0]._id,
      }).select("name");
      if (product) productName = product.name;
    }
    res.status(200).send({
      topClient: { client: clientDetails },
      topEmployee: { id: topEmployee[0]?._id, name: employeeName },
      topProduct: { id: topProduct[0]?._id, name: productName },
    });
  } catch (error) {
    console.error("Error fetching top entities:", error);
    res.status(500).send(error);
  }
};
