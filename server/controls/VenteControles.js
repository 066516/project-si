const Achat = require("../modles/Achat"); // Adjust the path as necessary
const Fournisseur = require("../modles/Fournisseur"); // Adjust path as necessary
const Product = require("../modles/product");

const ProduitStock = require("../modles/ProduitStock");

exports.createAchat = async (req, res) => {
  const {
    id_fournisseur,
    id_produit,
    quantite_achat,
    montant_total_achat,
    statut_paiement_achat,
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
        fournisseur.solde_fournisseur += newAchat.montant_total_achat;

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
    const achat = await Achat.findById(req.params.id);
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
    const achats = await Achat.find();
    res.status(200).send(achats);
  } catch (error) {
    res.status(500).send(error);
  }
};

// Update an achat by ID
exports.updateAchat = async (req, res) => {
  try {
    const updatedAchat = await Achat.findByIdAndUpdate(
      req.params.id,
      req.body,
      { new: true }
    );
    if (!updatedAchat) {
      return res.status(404).send({ message: "Achat not found" });
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
    const achat = await Achat.findByIdAndDelete(req.params.id);
    if (!achat) {
      return res.status(404).send({ message: "Achat not found" });
    }
    res.status(200).send({ message: "Achat deleted successfully" });
  } catch (error) {
    res.status(500).send(error);
  }
};
