const Fournisseur = require('../modles/Fournisseur'); // Adjust the path as necessary

// Create a new fournisseur
exports.createFournisseur = async (req, res) => {
    try {
        const newFournisseur = new Fournisseur(req.body);
        await newFournisseur.save();
        res.status(201).send({ message: "Fournisseur created successfully", data: newFournisseur });
    } catch (error) {
        res.status(500).send(error);
    }
};

// Get a single fournisseur by ID
exports.getFournisseur = async (req, res) => {
    try {
        const fournisseur = await Fournisseur.findById(req.params.id);
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
        const fournisseurs = await Fournisseur.find();
        res.status(200).send(fournisseurs);
    } catch (error) {
        res.status(500).send(error);
    }
};

// Update a fournisseur by ID
exports.updateFournisseur = async (req, res) => {
    try {
        const updatedFournisseur = await Fournisseur.findByIdAndUpdate(
            req.params.id,
            req.body,
            { new: true }
        );
        if (!updatedFournisseur) {
            return res.status(404).send({ message: "Fournisseur not found" });
        }
        res.status(200).send({ message: "Fournisseur updated successfully", data: updatedFournisseur });
    } catch (error) {
        res.status(500).send(error);
    }
};

// Delete a fournisseur by ID
exports.deleteFournisseur = async (req, res) => {
    try {
        const fournisseur = await Fournisseur.findByIdAndDelete(req.params.id);
        if (!fournisseur) {
            return res.status(404).send({ message: "Fournisseur not found" });
        }
        res.status(200).send({ message: "Fournisseur deleted successfully" });
    } catch (error) {
        res.status(500).send(error);
    }
};