const Achat = require("../modles/Achat"); // Adjust the path as necessary
const Vente = require("../modles/Vente");
const Transfert = require("../modles/Transfert"); // Adjust the path as necessary
exports.analyseTotalMontant = async (req, res) => {
  try {
    const totalPerMonth = await Achat.aggregate([
      {
        $group: {
          _id: {
            year: { $year: "$date_achat" },
            month: { $month: "$date_achat" },
          },
          totalMontant: { $sum: "$montant_total_achat" },
        },
      },
      {
        $sort: { "_id.year": 1, "_id.month": 1 },
      },
    ]);

    // Formatting the result for better readability
    const formattedResult = totalPerMonth.map((group) => ({
      year: group._id.year,
      month: group._id.month,
      totalMontant: group.totalMontant,
    }));

    res.status(200).send(formattedResult);
  } catch (error) {
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

  try {
    const monthlyTotals = await Vente.aggregate([
      { $match: { id_shop: idShop } },
      {
        $group: {
          _id: {
            year: { $year: "$date_vente" },
            month: { $month: "$date_vente" },
          },
          totalMontantVente: { $sum: "$montant_total_vente" },
        },
      },
      { $sort: { "_id.year": 1, "_id.month": 1 } },
    ]);

    const formattedResult = monthlyTotals.map((group) => ({
      year: group._id.year,
      month: group._id.month,
      totalMontantVente: group.totalMontantVente,
    }));

    res.status(200).send(formattedResult);
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
  const year = parseInt(req.query.year);
  const month = parseInt(req.query.month);

  if (!year || !month || !idShop) {
    return res
      .status(400)
      .send({ message: "Shop ID, year, and month are required" });
  }

  try {
    const startOfMonth = new Date(year, month - 1, 1);
    const endOfMonth = new Date(year, month, 0, 23, 59, 59, 999);

    // Calculate total sales for the shop
    const totalSales = await Vente.aggregate([
      {
        $match: {
          id_shop: idShop,
          date_vente: { $gte: startOfMonth, $lte: endOfMonth },
        },
      },
      { $group: { _id: null, totalRevenue: { $sum: "$montant_total_vente" } } },
    ]);

    // Calculate total transfers for the shop
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

    // Calculate profit
    const profit = revenue - cost;

    res.status(200).send({ idShop, year, month, profit });
  } catch (error) {
    res.status(500).send(error);
  }
};