const Reglement = require("../modles/ReglementVente"); // Adjust path as necessary

const Fournisseur = require("../modles/Fournisseur"); // Adjust the path as necessary
const Vente = require("../modles/Vente"); // Adjust the path as necessary

exports.createReglement = async (req, res) => {
  const { id_fournisseur, id_vente, montant_reglement } = req.body;

  try {
    // Check if the Fournisseur exists
    const fournisseurExists = await Fournisseur.findOne({
      Id_fournisseur: id_fournisseur,
    });
    if (!fournisseurExists) {
      return res.status(404).send({ message: "Fournisseur not found" });
    }

    // Check if the Vente exists
    const venteExists = await Vente.findOne({ id_achat: id_vente });
    if (!venteExists) {
      return res.status(404).send({ message: "Vente not found" });
    }

    // If both exist, create the Reglement
    const newReglement = new Reglement({
      id_fournisseur,
      id_vente,
      montant_reglement,
      date_reglement: new Date(), // Set the date here, or it will be set by default
    });
    await newReglement.save();
    fournisseurExists.solde_fournisseur -= montant_reglement;
    await fournisseurExists.save();

    // Update Vente's reste
    venteExists.reste -= montant_reglement;
    await venteExists.save();

    res.status(201).send({
      message: "Reglement created successfully",
      data: newReglement,
    });
  } catch (error) {
    res.status(500).send(error);
  }
};

// Get a single Reglement entry by ID
exports.getReglement = async (req, res) => {
  try {
    const reglement = await Reglement.findById(req.params.id);
    if (!reglement) {
      return res.status(404).send({ message: "Reglement not found" });
    }
    res.status(200).send(reglement);
  } catch (error) {
    res.status(500).send(error);
  }
};

// Get all Reglement entries
exports.getAllReglements = async (req, res) => {
  try {
    const reglements = await Reglement.find();
    res.status(200).send(reglements);
  } catch (error) {
    res.status(500).send(error);
  }
};

// Update a Reglement entry by ID
exports.updateReglement = async (req, res) => {
  try {
    const updatedReglement = await Reglement.findByIdAndUpdate(
      req.params.id,
      req.body,
      { new: true }
    );
    if (!updatedReglement) {
      return res.status(404).send({ message: "Reglement not found" });
    }
    res.status(200).send({
      message: "Reglement updated successfully",
      data: updatedReglement,
    });
  } catch (error) {
    res.status(500).send(error);
  }
};

// Delete a Reglement entry by ID
exports.deleteReglement = async (req, res) => {
  try {
    const reglement = await Reglement.findByIdAndDelete(req.params.id);
    if (!reglement) {
      return res.status(404).send({ message: "Reglement not found" });
    }
    res.status(200).send({ message: "Reglement deleted successfully" });
  } catch (error) {
    res.status(500).send(error);
  }
};
