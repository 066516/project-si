const Fournisseur = require("../modles/Fournisseur"); // Adjust the path as necessary

// Create a new fournisseur
exports.createFournisseur = async (req, res) => {
  try {
    const newFournisseur = new Fournisseur(req.body);
    await newFournisseur.save();
    res.status(201).send({
      message: "Fournisseur created successfully",
      data: newFournisseur,
    });
  } catch (error) {
    res.status(500).send(error);
  }
};

// Get a single fournisseur by ID
exports.getFournisseur = async (req, res) => {
  try {
    const fournisseur = await Fournisseur.findOne({
      Id_fournisseur: req.params.id,
    });
    if (!fournisseur) {
      return res.status(404).send({ message: "Fournisseur not found" });
    }
    res.status(200).send(fournisseur);
  } catch (error) {
    res.status(500).send(error);
  }
};

// Get all fournisseurs
exports.getAllFournisseurs = async (req, res) => {
  try {
    const fournisseurs = await Fournisseur.find({ trash: false });
    res.status(200).send(fournisseurs);
  } catch (error) {
    res.status(500).send(error);
  }
};

// Update a fournisseur by ID
// Assuming you have imported the necessary modules and set up your Fournisseur model.

exports.updateFournisseur = async (req, res) => {
  try {
    // Find the Fournisseur by its Id_fournisseur
    const updatedFournisseur = await Fournisseur.findOneAndUpdate(
      { Id_fournisseur: req.params.id },

      req.body,

      { new: true }
    );

    if (!updatedFournisseur) {
      return res.status(404).send({ message: "Fournisseur not found" });
    }

    res.status(200).send({
      message: "Fournisseur updated successfully",
      data: updatedFournisseur,
    });
  } catch (error) {
    res.status(500).send({ message: "Error updating Fournisseur", error });
  }
};

// Delete a fournisseur by ID
exports.deleteFournisseur = async (req, res) => {
  try {
    const fournisseur = await Fournisseur.findOneAndUpdate(
      {
        Id_fournisseur: req.params.id,
        trash: false,
      },
      {
        $set: { trash: true },
      },
      {
        new: true, // Returns the updated document
      }
    );
    if (!fournisseur) {
      return res.status(404).send({ message: "Fournisseur not found" });
    }
    res.status(200).send({ message: "Fournisseur deleted successfully" });
  } catch (error) {
    res.status(500).send(error);
  }
};
