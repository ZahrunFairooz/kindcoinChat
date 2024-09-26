const express = require('express');
const maintenanceController = require("../Controllers/Donor/maintenanceController");
const requireDonorAuth = require("../Middleware/Donor/requireDonorAuth");
const router = express.Router();
const accountController = require("../Controllers/Donor/accountController");
const uploader = require("../middleware/Donor/uploader");
const announcementController = require("../Controllers/Donor/annoucementController");
const requestController = require("../Controllers/Donor/requestController");
const donationController = require("../Controllers/Donor/DonationController");

router.post("/maintenance_done", requireDonorAuth, maintenanceController.maintenance_done);
router.post("/get_maintenance", requireDonorAuth, maintenanceController.get_maintenance);
router.put("/update_account", requireDonorAuth, uploader.single("profileImage"), accountController.updateDonor);
router.get("/get_account", requireDonorAuth, accountController.get_account);
router.get("/get_announcements", requireDonorAuth, announcementController.get_announcements);
router.post("/get_requests", requireDonorAuth, requestController.getRequests)
router.post("/getrequest", requireDonorAuth, requestController.getRequestyo)
router.post("/create_donation", requireDonorAuth, donationController.createDonation);

const express = require('express');
const maintenanceController = require("../Controllers/Donor/maintenanceController");
const requireDonorAuth = require("../Middleware/Donor/requireDonorAuth");
const router = express.Router();
const accountController = require("../Controllers/Donor/accountController");
const uploader = require("../middleware/Donor/uploader");
const announcementController = require("../Controllers/Donor/annoucementController");
const requestController = require("../Controllers/Donor/requestController");
const donationController = require("../Controllers/Donor/DonationController");

router.post("/maintenance_done", requireDonorAuth, maintenanceController.maintenance_done);
router.post("/get_maintenance", requireDonorAuth, maintenanceController.get_maintenance);
router.put("/update_account", requireDonorAuth, uploader.single("profileImage"), accountController.updateDonor);
router.get("/get_account", requireDonorAuth, accountController.get_account);
router.get("/get_announcements", requireDonorAuth, announcementController.get_announcements);
router.post("/get_requests", requireDonorAuth, requestController.getRequests)
router.post("/getrequest", requireDonorAuth, requestController.getRequestyo)
router.post("/create_donation", requireDonorAuth, donationController.createDonation);


module.exports = router;
