const Employe = require("../modles/Employe");
const Shop = require("../modles/Shop");
exports.createEmploye = async (req, res) => {
  try {
    const shopExists = await Shop.findOne({ shopID: req.body.workIn });
    if (!shopExists) {
      return res.status(404).send({ message: "Shop not found" });
    }
    const employeExist = await Employe.findOne({ email: req.body.email });
    if(employeExist){
      return res.status(409).json({message:"Email already in use!"})
    }
    const newEmploye = new Employe(req.body);
    const savedEmploye = await newEmploye.save();
    console.log("Saved data:", savedEmploye);
    res.status(201).send({
      message: "Employee created successfully",
      data: savedEmploye,
    });
  } catch (error) {
    console.error("Error:", error);
    res.status(500).send(error);
  }
};

// Get a single employee by ID
exports.getEmploye = async (req, res) => {
  try {
    const employe = await Employe.findById(req.params.id);
    if (!employe) {
      return res.status(404).send({ message: "Employee not found" });
    }
    res.status(200).send(employe);
  } catch (error) {
    res.status(500).send(error);
  }
};

// Get all employees
exports.getAllEmployes = async (req, res) => {
  try {
    const employes = await Employe.find({
      workIn: req.params.id,
      trash: false,
    });
    res.status(200).send(employes);
  } catch (error) {
    res.status(500).send(error);
  }
};

// Update an employee by ID
exports.updateEmploye = async (req, res) => {
  try {
    const updatedEmploye = await Employe.findOneAndUpdate(
      { EmployeID: req.params.id },
      req.body,
      { new: true }
    );
    if (!updatedEmploye) {
      return res.status(404).send({ message: "Employee not found" });
    }
    res.status(200).send({
      message: "Employee updated successfully",
      data: updatedEmploye,
    });
  } catch (error) {
    res.status(500).send(error);
  }
};

// Delete an employee by ID
exports.deleteEmploye = async (req, res) => {
  try {
    const employe = await Employe.findOneAndUpdate(
      {
        EmployeID: req.params.id,
        trash: false,
      },
      {
        $set: { trash: true },
      },
      {
        new: true, // Returns the updated document
      }
    );
    if (!employe) {
      return res.status(404).send({ message: "Employee not found" });
    }
    res.status(200).send({ message: "Employee deleted successfully" });
  } catch (error) {
    res.status(500).send(error);
  }
};
exports.deleteAllEmploye = async (req, res) => {
  try {
    await Employe.deleteMany({});
    res.status(200).send({ message: "All Employee deleted successfully" });
  } catch (error) {
    res.status(500).send(error);
  }
};
