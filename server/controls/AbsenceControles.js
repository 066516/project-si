const AbsenceEmploye = require("../modles/absence");

// Create
const Employe = require("../modles/Employe"); // Adjust the path as necessary

exports.createAbsence = async (req, res) => {
  const { id_employe } = req.body;
  const date_absence = Date.now();

  try {
    // Verify if the Employe exists
    const employeExists = await Employe.findOne({ EmployeID: id_employe });
    if (!employeExists) {
      return res.status(404).send({ message: "Employe not found" });
    }

    // Check if an absence for this employe already exists on the given date
    const existingAbsence = await AbsenceEmploye.findOne({
      id_employe: id_employe,
      date_absence: {
        $gte: new Date(new Date(date_absence).setHours(0, 0, 0, 0)),
        $lt: new Date(new Date(date_absence).setHours(23, 59, 59, 999)),
      },
    });
    if (existingAbsence) {
      return res.status(400).send({
        message: "Absence for this employe already recorded on this date",
      });
    }

    // Create the Absence
    const newAbsence = new AbsenceEmploye({ id_employe, date_absence });
    await newAbsence.save();
    res.status(201).send(newAbsence);
  } catch (error) {
    res.status(500).send(error);
  }
};

exports.getAbsence = async (req, res) => {
  try {
    const absence = await AbsenceEmploye.findById(req.params.id);
    if (!absence) {
      return res.status(404).send({ message: "Absence not found" });
    }
    res.status(200).send(absence);
  } catch (error) {
    res.status(500).send(error);
  }
};

// Read (all)
exports.getAllAbsences = async (req, res) => {
  try {
    const absences = await AbsenceEmploye.find();
    res.status(200).send(absences);
  } catch (error) {
    res.status(500).send(error);
  }
};

// Update
exports.updateAbsence = async (req, res) => {
  try {
    const updatedAbsence = await AbsenceEmploye.findByIdAndUpdate(
      req.params.id,
      req.body,
      { new: true }
    );
    if (!updatedAbsence) {
      return res.status(404).send({ message: "Absence not found" });
    }
    res.status(200).send(updatedAbsence);
  } catch (error) {
    res.status(500).send(error);
  }
};

// Delete
exports.deleteAbsence = async (req, res) => {
  try {
    const absence = await AbsenceEmploye.findByIdAndDelete(req.params.id);
    if (!absence) {
      return res.status(404).send({ message: "Absence not found" });
    }
    res.status(200).send({ message: "Absence deleted successfully" });
  } catch (error) {
    res.status(500).send(error);
  }
};
exports.countAbsences = async (req, res) => {
  try {
    const employeId = req.params.id; // Assuming the employee ID is passed in the URL
    const count = await AbsenceEmploye.countDocuments({
      id_employe: employeId,
    });
    res.status(200).send({ employeId: employeId, absenceCount: count });
  } catch (error) {
    res.status(500).send(error);
  }
};
