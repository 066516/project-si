const Masrouf = require("../modles/Masrouf"); // Adjust the path as necessary

// Create
const Employe = require("../modles/Employe");

exports.createMasrouf = async (req, res) => {
  const { id_employe, montant_masrouf } = req.body;

  try {
    // Verify if the Employe exists
    const employe = await Employe.findOne({ EmployeID: id_employe });
    if (!employe) {
      return res.status(404).send({ message: "Employe not found" });
    }

    // Check if employe's salary is sufficient for the deduction


    // Deduct montant_masrouf from the employe's salary
    employe.salary -= montant_masrouf;
    await employe.save();

    // Create the Masrouf
    const newMasrouf = new Masrouf(req.body);
    await newMasrouf.save();
    res.status(201).send(newMasrouf);
  } catch (error) {
    res.status(500).send(error);
  }
};

// Read (one)
exports.getMasrouf = async (req, res) => {
  try {
    const masrouf = await Masrouf.findById(req.params.id);
    if (!masrouf) {
      return res.status(404).send({ message: "Masrouf not found" });
    }
    res.status(200).send(masrouf);
  } catch (error) {
    res.status(500).send(error);
  }
};

// Read (all)
exports.getAllMasroufs = async (req, res) => {
  try {
    const masroufs = await Masrouf.find();
    res.status(200).send(masroufs);
  } catch (error) {
    res.status(500).send(error);
  }
};

// Update
exports.updateMasrouf = async (req, res) => {
  try {
    const updatedMasrouf = await Masrouf.findByIdAndUpdate(
      req.params.id,
      req.body,
      { new: true }
    );
    if (!updatedMasrouf) {
      return res.status(404).send({ message: "Masrouf not found" });
    }
    res.status(200).send(updatedMasrouf);
  } catch (error) {
    res.status(500).send(error);
  }
};

// Delete
exports.deleteMasrouf = async (req, res) => {
  try {
    const masrouf = await Masrouf.findByIdAndDelete(req.params.id);
    if (!masrouf) {
      return res.status(404).send({ message: "Masrouf not found" });
    }
    res.status(200).send({ message: "Masrouf deleted successfully" });
  } catch (error) {
    res.status(500).send(error);
  }
};
