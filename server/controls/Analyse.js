const Achat = require("../modles/Achat"); // Adjust the path as necessary
const Vente = require("../modles/Vente");
const Transfert = require("../modles/Transfert");
const ProduitStock = require("../modles/ProduitStock");
const Product = require("../modles/product"); // Adjust the path as necessary
const Client = require("../modles/client");

// Adjust the path as necessary
exports.analyseTotalMontant = async (req, res) => {
  try {
    const currentYear = new Date().getFullYear(); // Get the current year

    const totalPerMonth = await Achat.aggregate([
      {
        $match: {
          date_achat: {
            $gte: new Date(`${currentYear}-01-01`), // Greater than or equal to the first day of the current year
            $lt: new Date(`${currentYear + 1}-01-01`), // Less than the first day of the next year
          },
        },
      },
      {
        $group: {
          _id: { month: { $month: "$date_achat" } }, // Group by month
          totalMontant: { $sum: "$montant_total_achat" }, // Sum the 'montant_total_achat' for each group
        },
      },
      {
        $sort: { "_id.month": 1 }, // Sort by month in ascending order
      },
    ]);

    // Map the results to an array of numbers representing the total amount for each month
    const montantArray = totalPerMonth.map((group) => group.totalMontant);

    res.status(200).send(montantArray);
  } catch (error) {
    console.error("Error in analyseTotalMontant:", error);
    res.status(500).send(error);
  }
};


exports.getAllProductsAndQuantities = async (req, res) => {
  const id = parseInt(req.params.id);
  try {
    console.log(id);
    const result = await ProduitStock.aggregate([
      { $match: { trash: false, id_shop: id } },
      {
        $lookup: {
          from: "products", // Assuming 'products' is the collection name for Product model
          localField: "id_produit",
          foreignField: "productId",
          as: "productDetails",
        },
      },
      {
        $unwind: {
          path: "$productDetails",
          preserveNullAndEmptyArrays: true,
        },
      },
      {
        $project: {
          _id: 0,
          productName: "$productDetails.name",
          quantite_en_stock: 1,
        },
      },
    ]);

    // Extracting product names and quantities into separate arrays
    const productNames = result.map((p) => p.productName);
    const quantities = result.map((p) => p.quantite_en_stock);

    res.status(200).send({ productNames, quantities });
  } catch (error) {
    console.error("Error fetching product stock data:", error);
    res.status(500).send(error);
  }
};

exports.findTopFournisseurForMonth = async (req, res) => {
  const year = parseInt(req.query.year);
  const month = parseInt(req.query.month);

  if (!year || !month) {
    return res.status(400).send({ message: "Year and month are required" });
  }

  try {
    const startOfMonth = new Date(year, month - 1, 1);
    const endOfMonth = new Date(year, month, 0, 23, 59, 59, 999);

    const result = await Achat.aggregate([
      {
        $match: {
          date_achat: {
            $gte: startOfMonth,
            $lte: endOfMonth,
          },
        },
      },
      {
        $group: {
          _id: "$id_fournisseur",
          totalMontant: { $sum: "$montant_total_achat" },
        },
      },
      { $sort: { totalMontant: -1 } },
      { $limit: 1 },
    ]);

    if (!result.length || !result[0]._id) {
      return res
        .status(404)
        .send({ message: "No fournisseur data found for the specified month" });
    }

    const topFournisseur = {
      id_fournisseur: result[0]._id,
      totalMontant: result[0].totalMontant,
    };

    res.status(200).send({ topFournisseur });
  } catch (error) {
    res.status(500).send(error);
  }
};

exports.calculateMonthlyTotalSales = async (req, res) => {
  const idShop = parseInt(req.params.idShop); // Extract idShop from request parameters
  const currentYear = new Date().getFullYear(); // Get the current year

  try {
    const monthlyTotals = await Vente.aggregate([
      {
        $match: {
          id_shop: idShop,
          date_vente: {
            $gte: new Date(`${currentYear}-01-01`),
            $lt: new Date(`${currentYear + 1}-01-01`),
          },
        },
      },
      {
        $group: {
          _id: { month: { $month: "$date_vente" } },
          totalMontantVente: { $sum: "$montant_total_vente" },
        },
      },
      { $sort: { "_id.month": 1 } },
    ]);

    // Map the results to an array of numbers representing total sales amount for each month
    const salesAmounts = monthlyTotals.map((group) => group.totalMontantVente);

    res.status(200).send(salesAmounts);
  } catch (error) {
    res.status(500).send(error);
  }
};

exports.findTopClientForMonth = async (req, res) => {
  const year = parseInt(req.query.year);
  const month = parseInt(req.query.month);

  if (!year || !month) {
    return res.status(400).send({ message: "Year and month are required" });
  }

  try {
    const startOfMonth = new Date(year, month - 1, 1);
    const endOfMonth = new Date(year, month, 0, 23, 59, 59, 999);

    const result = await Vente.aggregate([
      {
        $match: {
          date_vente: {
            $gte: startOfMonth,
            $lte: endOfMonth,
          },
        },
      },
      {
        $group: {
          _id: "$id_client",
          totalMontantVente: { $sum: "$montant_total_vente" },
        },
      },
      { $sort: { totalMontantVente: -1 } },
      { $limit: 1 },
    ]);

    if (!result.length || !result[0]._id) {
      return res
        .status(404)
        .send({ message: "No client data found for the specified month" });
    }

    const topClient = {
      id_client: result[0]._id,
      totalMontantVente: result[0].totalMontantVente,
    };

    res.status(200).send({ topClient });
  } catch (error) {
    res.status(500).send(error);
  }
};
exports.findTopClient = async (req, res) => {
  try {
    const result = await Vente.aggregate([
      {
        $group: {
          _id: "$id_client", // Grouping by 'id_client'
          totalMontantVente: { $sum: "$montant_total_vente" },
        },
      },
      { $sort: { totalMontantVente: -1 } }, // Sort by total sales in descending order
      { $limit: 1 }, // Get the top result
    ]);

    if (!result.length || !result[0]._id) {
      return res.status(404).send({ message: "No client data found" });
    }

    const topClient = {
      id_client: result[0]._id,
      totalMontantVente: result[0].totalMontantVente,
    };

    res.status(200).send({ topClient });
  } catch (error) {
    res.status(500).send(error);
  }
};
exports.findTopInOneShop = async (req, res) => {
  const id = parseInt(req.params.idShop);

  try {
    // Find Top Client
    const topClient = await Vente.aggregate([
      { $match: { id_shop: id } },
      {
        $group: {
          _id: "$id_client",
          totalPurchases: { $sum: "$montant_total_vente" }, // Corrected to reference field value
        },
      },
      { $sort: { totalPurchases: -1 } },
      { $limit: 1 },
    ]);

    // Find Top Employee
    // const topEmployee = await Employe.aggregate([
    //   { $match: { workIn: id } },
    //   {
    //     $group: {
    //       _id: "$EmployeID",
    //       totalSales: { $sum: "$salesAmount" }, // Assuming you have a salesAmount field
    //     },
    //   },
    //   { $sort: { totalSales: -1 } },
    //   { $limit: 1 },
    // ]);

    // Find Top Product
    const topProduct = await Vente.aggregate([
      { $match: { id_shop: id } },
      {
        $group: {
          _id: "$id_produit",
          totalSold: { $sum: "$quantite_vendue" }, // Corrected to reference field value
        },
      },
      { $sort: { totalSold: -1 } },
      { $limit: 1 },
    ]);
    const totalSales = await Vente.aggregate([
      { $match: { id_shop: id } },
      {
        $group: {
          _id: null, // Grouping by null aggregates over the entire result set
          totalAmount: { $sum: "$montant_total_vente" },
        },
      },
    ]);
    const totalAmount = totalSales.length > 0 ? totalSales[0].totalAmount : 0;

    // Calculate total expenses
    const totalExpensesResult = await Transfert.aggregate([
      { $match: { id_shop: id } },
      {
        $group: {
          _id: null,
          totalExpenses: { $sum: "$cout_transfert" },
        },
      },
    ]);
    const totalExpenses = totalExpensesResult[0]
      ? totalExpensesResult[0].totalExpenses
      : 0;

    // Calculate profit
    const profit = totalAmount - totalExpenses;
    // Additional details for topClient
    let clientDetails = { nom: "Unknown", prenom: "Unknown" };
    if (topClient.length > 0 && topClient[0]._id) {
      const client = await Client.findOne({
        clientId: topClient[0]._id,
      }).select("nomClient prenomClient");
      if (client) {
        clientDetails = { nom: client.nomClient, prenom: client.prenomClient };
      }
    }

    // Additional details for topEmployee
    // let employeeName = "Unknown";
    // if (topEmployee.length > 0 && topEmployee[0]._id) {
    //   const employee = await Employe.findOne({
    //     EmployeID: topEmployee[0]._id,
    //   }).select("name");
    //   if (employee) employeeName = employee.name;
    // }

    // Additional details for topProduct
    let productName = "Unknown";
    if (topProduct.length > 0 && topProduct[0]._id) {
      const product = await Product.findOne({
        productId: topProduct[0]._id,
      }).select("name");
      if (product) productName = product.name;
    }

    // Send response
    res.status(200.0).send({
      topClient: { client: clientDetails },
      // topEmployee: { id: topEmployee[0]?._id, name: employeeName },
      topProduct: { id: topProduct[0]?._id, name: productName },
      totalAmount,
      profit,
    });
  } catch (error) {
    console.error("Error fetching top entities:", error);
    res.status(500).send(error);
  }
};

exports.findTopFournisseur = async (req, res) => {
  try {
    const result = await Achat.aggregate([
      {
        $group: {
          _id: "$id_fournisseur", // Grouping by 'id_fournisseur'
          totalMontant: { $sum: "$montant_total_achat" },
        },
      },
      { $sort: { totalMontant: -1 } },
      { $limit: 1 },
    ]);

    // Check if the result is empty or the grouped id is null
    if (!result.length || !result[0]._id) {
      return res.status(404).send({ message: "No fournisseur data found" });
    }

    const topFournisseur = {
      id_fournisseur: result[0]._id,
      totalMontant: result[0].totalMontant,
    };

    res.status(200).send({ topFournisseur });
  } catch (error) {
    res.status(500).send(error);
  }
};

exports.findTopSellingProduct = async (req, res) => {
  try {
    const topSellingProduct = await Vente.aggregate([
      {
        $group: {
          _id: "$id_produit", // Group by product ID
          totalQuantitySold: { $sum: "$quantite_vendue" }, // Sum the quantity sold for each product
        },
      },
      { $sort: { totalQuantitySold: -1 } }, // Sort by total quantity sold in descending order
      { $limit: 1 }, // Limit to only the top product
    ]);

    if (!topSellingProduct.length) {
      return res.status(404).send({ message: "No sales data found" });
    }

    res.status(200).send(topSellingProduct[0]);
  } catch (error) {
    res.status(500).send(error);
  }
};

exports.findTopSellingProductForMonthAndYear = async (req, res) => {
  const year = parseInt(req.query.year);
  const month = parseInt(req.query.month);

  if (!year || !month) {
    return res.status(400).send({ message: "Year and month are required" });
  }

  try {
    const startOfMonth = new Date(year, month - 1, 1);
    const endOfMonth = new Date(year, month, 0, 23, 59, 59, 999);

    const topSellingProduct = await Vente.aggregate([
      {
        $match: {
          date_vente: {
            $gte: startOfMonth,
            $lte: endOfMonth,
          },
        },
      },
      {
        $group: {
          _id: "$id_produit",
          totalQuantitySold: { $sum: "$quantite_vendue" },
        },
      },
      { $sort: { totalQuantitySold: -1 } },
      { $limit: 1 },
    ]);

    if (!topSellingProduct.length) {
      return res.status(404).send({
        message: "No sales data found for the specified month and year",
      });
    }

    res.status(200).send(topSellingProduct[0]);
  } catch (error) {
    res.status(500).send(error);
  }
};
exports.calculateProfitEvolution = async (req, res) => {
  const idShop = parseInt(req.params.idShop);
  const year = new Date().getFullYear(); // Utiliser l'année actuelle

  if (!idShop) {
    return res
      .status(400)
      .send({ message: "Shop ID is required" });
  }

  try {
    let monthlyProfits = [];

    for (let month = 1; month <= 12; month++) {
      const startOfMonth = new Date(year, month - 1, 1);
      const endOfMonth = new Date(year, month, 0, 23, 59, 59, 999);

      // Calculer les ventes totales pour le mois
      const totalSales = await Vente.aggregate([
        {
          $match: {
            id_shop: idShop,
            date_vente: { $gte: startOfMonth, $lte: endOfMonth },
          },
        },
        { $group: { _id: null, totalRevenue: { $sum: "$montant_total_vente" } } },
      ]);

      // Calculer les transferts totaux pour le mois
      const totalTransfers = await Transfert.aggregate([
        {
          $match: {
            id_shop: idShop,
            date_transfert: { $gte: startOfMonth, $lte: endOfMonth },
          },
        },
        { $group: { _id: null, totalCost: { $sum: "$cout_transfert" } } },
      ]);

      const revenue = totalSales[0] ? totalSales[0].totalRevenue : 0;
      const cost = totalTransfers[0] ? totalTransfers[0].totalCost : 0;

      // Calculer le profit pour le mois et l'ajouter au tableau
      monthlyProfits.push(revenue - cost);
    }

    res.status(200).send(monthlyProfits);
  } catch (error) {
    res.status(500).send(error);
  }
};

