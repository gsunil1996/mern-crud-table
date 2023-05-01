const express = require('express')
const router = express.Router()
const companiesController = require("../controllers/companiesController");

router.get("/companiesTable", companiesController.getCompaniesTable);
router.get("/companiesTable/:id", companiesController.getSingleCompanyDetails);
router.post("/addCompany", companiesController.addNewCompany);
router.patch("/updateCompanyDetails/:id", companiesController.updateCompanyDetails);
router.delete("/deleteCompany/:id", companiesController.deleteCompany);

module.exports = router;