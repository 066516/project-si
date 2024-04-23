const express = require("express");
const router = express.Router();
const analyseController = require("../controls/Analyse"); // Adjust the path as necessary

router.get("/analyse/totalMontantAchat", analyseController.analyseTotalMontant);

router.get(
  "/analyse/allProduct/:id",
  analyseController.getAllProductsAndQuantities
);
router.get(
  "/analyse/totalMontantVente/:idShop",
  analyseController.calculateMonthlyTotalSales
);
router.get("/analyse/top", analyseController.findTopFournisseurForMonth);
router.get("/analyse/topClient", analyseController.findTopClientForMonth);
router.get(
  "/analyse/bestSellingProducts",
  analyseController.findTopSellingProduct
);
router.get(
  "/analyse/bestSellingProduct",
  analyseController.findTopSellingProductForMonthAndYear
);
router.get(
  "/analyse/benefice/:idShop",
  analyseController.calculateProfitEvolution
);
router.get("/analyse/tops/:idShop", analyseController.findTopInOneShop);

module.exports = router;
