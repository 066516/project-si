const PvQuotidien = require("../modles/PvCenter");
const Employe = require("../modles/Employe"); // Adjust the path as necessary
const Centre = require("../modles/Shop"); // Adjust the path as necessary
const sendEmail = require("../middalware/SendEmail");
const generatePDF = require("../middalware/generatePdf");
exports.createPvQuotidien = async (req, res) => {
  const { id_centre, Pv_content } = req.body;
  // const date_pv = Date.now();
  try {
    // Verify if the Employe exists
    // const employeExists = await Employe.findOne({ EmployeID: id_employe });
    // if (!employeExists) {
    //   return res.status(404).send({ message: "Employe not found" });
    // }

    // Verify if the Centre exists
    const centreExists = await Centre.findOne({ shopID: id_centre });
    if (!centreExists) {
      return res.status(404).send({ message: "Centre not found" });
    }

    // Check if a PvQuotidien has already been created for the centre on the specified date
    const existingPv = await PvQuotidien.findOne({
      id_centre: id_centre,
      date_pv: {
        $gte: new Date(Date.now()).setHours(0, 0, 0, 0),
        $lt: new Date(Date.now()).setHours(23, 59, 59, 999),
      },
    });
    if (existingPv) {
      return res.status(400).send({
        message:
          "A PvQuotidien has already been created for this centre on the this date",
      });
    }

    // Create the PvQuotidien
    const newPvQuotidien = new PvQuotidien(req.body);
    await newPvQuotidien.save();
    const title = "pv" + newPvQuotidien.id_pv;
    generatePDF(title, Pv_content);

    sendEmail(title);
    res.status(201).send({
      message: "PvQuotidien created successfully",
      data: newPvQuotidien,
    });
  } catch (error) {
    console.log("====================================");
    console.log(error);
    console.log("====================================");
    res.status(500).send(error);
  }
};

// Get a single Pv_quotidien entry by ID
exports.getPvQuotidien = async (req, res) => {
  try {
    const pvQuotidien = await PvQuotidien.findById(req.params.id);
    if (!pvQuotidien) {
      return res.status(404).send({ message: "Pv_quotidien not found" });
    }
    res.status(200).send(pvQuotidien);
  } catch (error) {
    res.status(500).send(error);
  }
};

// Get all Pv_quotidien entries
exports.getAllpvs = async (req, res) => {
  try {
    const pvQuotidiens = await PvQuotidien.find({ id_centre: req.params.id });
    res.status(200).send(pvQuotidiens);
  } catch (error) {
    res.status(500).send(error);
  }
};

// Update a Pv_quotidien entry by ID
exports.updatePvQuotidien = async (req, res) => {
  try {
    const updatedPvQuotidien = await PvQuotidien.findOneAndUpdate(
      { id_pv: req.params.id },
      req.body,
      { new: true }
    );
    if (!updatedPvQuotidien) {
      return res.status(404).send({ message: "Pv_quotidien not found" });
    }
    res.status(200).send({
      message: "Pv_quotidien updated successfully",
      data: updatedPvQuotidien,
    });
  } catch (error) {
    res.status(500).send(error);
  }
};

// Delete a Pv_quotidien entry by ID
exports.deletePvQuotidien = async (req, res) => {
  try {
    const pvQuotidien = await PvQuotidien.findOneAndDelete({
      id_pv: req.params.id,
    });
    if (!pvQuotidien) {
      return res.status(404).send({ message: "Pv_quotidien not found" });
    }
    res.status(200).send({ message: "Pv_quotidien deleted successfully" });
  } catch (error) {
    res.status(500).send(error);
  }
};
