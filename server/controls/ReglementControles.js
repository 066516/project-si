const Reglement = require("../modles/ReglementVente"); // Adjust path as necessary

const Fournisseur = require("../modles/Fournisseur"); // Adjust the path as necessary
const Vente = require("../modles/Vente"); // Adjust the path as necessary
const Client = require("../modles/client");
const Achat = require("../modles/Achat");
const ReglementClient = require("../modles/ReglementClient");
exports.createReglement = async (req, res) => {
  const { id_fournisseur, id_Achat, montant_reglement } = req.body;

  try {
    // Check if the Fournisseur exists
    const fournisseurExists = await Fournisseur.findOne({
      Id_fournisseur: id_fournisseur,
    });
    if (!fournisseurExists) {
      return res.status(404).send({ message: "Fournisseur not found" });
    }

    // Check if the Vente exists
    // const AchatExists = await Achat.findOne({ id_achat: id_Achat });
    // if (!AchatExists) {
    //   return res.status(404).send({ message: "Vente not found" });
    // }

    // If both exist, create the Reglement
    const newReglement = await Reglement.create({
      id_fournisseur,
      montant_reglement,
    
      // Set the date here, or it will be set by default
    });

    fournisseurExists.solde_fournisseur -= montant_reglement;
    await fournisseurExists.save();

    // Update Vente's reste
    // AchatExists.reste -= montant_reglement;
    // await AchatExists.save();

    res.status(201).send({
      message: "Reglement created successfully",
      data: newReglement,
    });
  } catch (error) {
    console.log(error);
    res.status(500).send(error);
  }
};
exports.createReglementClient = async (req, res) => {
  const { id_client, montant_reglement } = req.body;

  try {
    // Check if the Client exists
    const clientExists = await Client.findOne({ clientId: id_client });
    if (!clientExists) {
      return res.status(404).send({ message: "Client not found" });
    }

    // Check if the Vente exists
    // const venteExists = await Vente.findOne({ id_vente: id_vente });
    // if (!venteExists) {
    //   return res.status(404).send({ message: "Vente not found" });
    // }

    // If both exist, create the ReglementClient
    const newReglementClient = await ReglementClient.create({
      id_client,
      montant_reglement,
      // The date will be set automatically to the current date by default
    });

    // Here you might want to update the client's account or the vente's status
    // depending on your business logic
    // For example, updating client's balance or vente's remaining amount
    clientExists.creditClient -= montant_reglement;
    await clientExists.save();

    // venteExists.reste -= montant_reglement;
    // await venteExists.save();

    res.status(201).send({
      message: "Reglement Client created successfully",
      data: newReglementClient,
    });
  } catch (error) {
    console.log(error);
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
  const id = req.params.id;
  try {
    const reglements = await Reglement.find({ id_fournisseur: id });
    res.status(200).send(reglements);
  } catch (error) {
    res.status(500).send(error);
  }
};
exports.getAllReglementsClient = async (req, res) => {
  const id = req.params.id;
  console.log(id);
  try {
    const reglements = await ReglementClient.find({ id_client: id });
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
