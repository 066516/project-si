const Achat = require("../modles/Achat"); // Adjust the path as necessary
const Fournisseur = require("../modles/Fournisseur"); // Adjust path as necessary
const Product = require("../modles/product");

const ProduitStock = require("../modles/ProduitStock");

exports.createAchat = async (req, res) => {
  const {
    id_fournisseur,
    id_produit,
    quantite_achat,
    statut_paiement_achat,
    montant_encaisse_achat,
  } = req.body;

  try {
    // Check if the Fournisseur exists
    const fournisseurExists = await Fournisseur.findOne({
      Id_fournisseur: id_fournisseur,
    });
    if (!fournisseurExists) {
      return res.status(404).send({ message: "Fournisseur not found" });
    }

    // Check if the Product exists
    const productExists = await Product.findOne({ productId: id_produit });
    if (!productExists) {
      return res.status(404).send({ message: "Product not found" });
    }

    // Create the Achat
    const newAchat = new Achat(req.body);
    await newAchat.save();

    // Update or create a new entry in ProduitStock
    const produitStockEntry = await ProduitStock.findOne({
      id_produit: id_produit,
    });
    if (produitStockEntry) {
      produitStockEntry.quantite_en_stock += quantite_achat;
      await produitStockEntry.save();
    } else {
      const newProduitStockEntry = new ProduitStock({
        id_produit: id_produit,
        quantite_en_stock: quantite_achat,
      });
      await newProduitStockEntry.save();
    }
    if (!statut_paiement_achat) {
      const fournisseur = await Fournisseur.findOne({
        Id_fournisseur: id_fournisseur,
      });

      if (fournisseur) {
        fournisseur.solde_fournisseur +=
          newAchat.montant_total_achat - montant_encaisse_achat;

        await fournisseur.save();
      } else {
        throw new Error("Fournisseur not found");
      }
      newAchat.reste = newAchat.montant_total_achat;
      await newAchat.save();
    }
    res.status(201).send({
      message: "Achat created and stock updated successfully",
      data: newAchat,
    });
  } catch (error) {
    res.status(500).send(error);
  }
};

// Get a single achat by ID
exports.getAchat = async (req, res) => {
  try {
    const achat = await Achat.findById({ id_achat: req.params.id });
    if (!achat) {
      return res.status(404).send({ message: "Achat not found" });
    }
    res.status(200).send(achat);
  } catch (error) {
    res.status(500).send(error);
  }
};

// Get all achats
exports.getAllAchats = async (req, res) => {
  try {
    let achats = await Achat.find();
    achats = await Promise.all(
      achats.map(async (achat) => {
        achat = achat.toObject(); // Convert Mongoose document to a plain JavaScript object

        // Fetch fournisseur details
        const fournisseur = await Fournisseur.findOne({
          Id_fournisseur: achat.id_fournisseur,
        }).select("Nom_fournisseur Prenom_fournisseur"); // Adjust the field name as per your Fournisseur model
        achat.fournisseurDetails = fournisseur; // Add fournisseur details to achat

        // Fetch product details
        const product = await Product.findOne({
          productId: achat.id_produit,
        }).select("name"); // Replace 'productId' and 'name' with actual field names in your Product model
        achat.productDetails = product; // Add product details to achat

        return achat;
      })
    );

    res.status(200).send(achats);
  } catch (error) {
    res.status(500).send(error);
  }
};

// Update an achat by ID
exports.updateAchat = async (req, res) => {
  try {
    // Find the existing Achat
    const existingAchat = await Achat.findOne({ id_achat: req.params.id });
    if (!existingAchat) {
      return res.status(404).send({ message: "Achat not found" });
    }

    const oldQuantiteAchat = existingAchat.quantite_achat;
    const oldMontantEncaisse = existingAchat.montant_encaisse_achat;

    // Update the Achat
    const updatedAchat = await Achat.findOneAndUpdate(
      { id_achat: req.params.id },
      req.body,
      { new: true }
    );

    if (!updatedAchat) {
      return res.status(404).send({ message: "Achat not found" });
    }

    const newQuantiteAchat = updatedAchat.quantite_achat;
    const newMontantEncaisse = updatedAchat.montant_encaisse_achat;

    // Adjust the stock if the quantity purchased has changed
    if (oldQuantiteAchat !== newQuantiteAchat) {
      const stockItem = await ProduitStock.findOne({
        id_produit: updatedAchat.id_produit,
      });
      if (stockItem) {
        stockItem.quantite_en_stock -= newQuantiteAchat - oldQuantiteAchat;
        await stockItem.save();
      }
    }

    // Update the solde_fournisseur if montant_encaisse_achat has changed
    if (oldMontantEncaisse !== newMontantEncaisse) {
      // Assuming you have a model for Fournisseur and a reference in Achat
      const fournisseur = await Fournisseur.findOne({
        Id_fournisseur: updatedAchat.id_fournisseur,
      });
      if (fournisseur) {
        // Adjust the solde_fournisseur based on the difference in montant_encaisse_achat
        fournisseur.solde_fournisseur +=
          newMontantEncaisse - oldMontantEncaisse;
        await fournisseur.save();
      } else {
        // Handle cases where the fournisseur is not found
      }
    }

    res
      .status(200)
      .send({ message: "Achat updated successfully", data: updatedAchat });
  } catch (error) {
    res.status(500).send(error);
  }
};

// Delete an achat by ID
exports.deleteAchat = async (req, res) => {
  try {
    // Retrieve the achat to get its details before deletion
    const achat = await Achat.findOne({ id_achat: req.params.id });
    if (!achat) {
      return res.status(404).send({ message: "Achat not found" });
    }

    // Store the quantity purchased, product ID, and montant_encaisse_achat before deleting the achat
    const { quantite_achat, id_produit, montant_encaisse_achat } = achat;

    // Update the stock
    const stockItem = await ProduitStock.findOne({ id_produit });
    if (stockItem) {
      stockItem.quantite_en_stock += quantite_achat; // Add back the quantity to the stock
      await stockItem.save();
    }

    // Update the sold fournisseur (supplier's balance)
    // Assuming you have a model to represent suppliers, for example Fournisseur
    const fournisseur = await Fournisseur.findOne({
      /* appropriate query to find the supplier */
    });
    if (fournisseur) {
      // Adjust the supplier's balance
      fournisseur.sold -= montant_encaisse_achat;
      await fournisseur.save();
    }

    // Delete the achat
    await Achat.findOneAndDelete({ id_achat: req.params.id });

    res.status(200).send({ message: "Achat deleted successfully" });
  } catch (error) {
    res.status(500).send(error);
  }
};
