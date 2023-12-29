const Salary = require("../modles/PaySalary"); // Adjust the path as necessary
const Employe = require("../modles/Employe"); // Adjust the path as necessary

// Create
exports.createSalary = async (req, res) => {
  const { id_centre, id_employe, amount } = req.body;

  try {
    const currentYear = new Date().getFullYear();
    const currentMonth = new Date().getMonth(); // January is 0, December is 11

    // Check if the employee exists
    const employeExists = await Employe.findOne({ EmployeID: id_employe });
    if (!employeExists) {
      return res.status(404).send({ message: "Employe not found" });
    }

    // Define the start and end of the month
    const startDate = new Date(currentYear, currentMonth, 1);
    const endDate = new Date(currentYear, currentMonth + 1, 1);

    // Check for existing salary entry for the same month and year
    const existingSalary = await Salary.findOne({
      id_employe: id_employe,
      date: {
        $gte: startDate,
        $lt: endDate,
      },
    });

    if (existingSalary) {
      return res.status(400).send({
        message: "Salary for this month already exists for this employee",
      });
    }

    // Update the employee's salary only if no salary for this month exists
    employeExists.salary += amount; // Ensure this logic aligns with your application's requirements
    await employeExists.save();

    // Create the new salary entry
    const newSalary = new Salary({
      id_centre,
      id_employe,
      amount,
      date: new Date(),
    }); // Add the current date
    await newSalary.save();

    res.status(201).send(newSalary);
  } catch (error) {
    res.status(500).send(error);
  }
};
// Read (one)
exports.getSalary = async (req, res) => {
  try {
    const salary = await Salary.findById(req.params.id);
    if (!salary) {
      return res.status(404).send({ message: "Salary not found" });
    }
    res.status(200).send(salary);
  } catch (error) {
    res.status(500).send(error);
  }
};

// Read (all)
exports.getAllSalaries = async (req, res) => {
  try {
    const salaries = await Salary.find();
    res.status(200).send(salaries);
  } catch (error) {
    res.status(500).send(error);
  }
};

// Update
exports.updateSalary = async (req, res) => {
  try {
    const updatedSalary = await Salary.findByIdAndUpdate(
      req.params.id,
      req.body,
      { new: true }
    );
    if (!updatedSalary) {
      return res.status(404).send({ message: "Salary not found" });
    }
    res.status(200).send(updatedSalary);
  } catch (error) {
    res.status(500).send(error);
  }
};

// Delete
exports.deleteSalary = async (req, res) => {
  try {
    const salary = await Salary.findByIdAndDelete(req.params.id);
    if (!salary) {
      return res.status(404).send({ message: "Salary not found" });
    }
    res.status(200).send({ message: "Salary deleted successfully" });
  } catch (error) {
    res.status(500).send(error);
  }
};
exports.calculateTotalSalaries = async (req, res) => {
  try {
    const result = await Salary.aggregate([
      {
        $group: {
          _id: null, // Grouping without specific field to calculate total
          totalAmount: { $sum: "$amount" },
        },
      },
    ]);

    const totalSalaries = result[0] ? result[0].totalAmount : 0;
    res.status(200).send({ totalSalaries }); // to  send salary all centres replace totalSalaries with result
  } catch (error) {
    res.status(500).send(error);
  }
};
