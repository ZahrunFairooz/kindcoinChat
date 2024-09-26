
const express = require('express');
const router = express.Router();
const requireBeneficiaryAuth = require('../Middleware/Beneficiary/requireBeneficiaryAuth');

const accountController = require("../Controllers/Beneficiary/accountController");
// const uploader = require("../Middleware/Beneficiary/uploader");
const announcementController = require("../Controllers/Beneficiary/annoucementController");
const requestController = require("../Controllers/Beneficiary/requestController");
const ticketController = require('../Controllers/Beneficiary/ticketController');


// router.put("/update_account", requireBeneficiaryAuth, uploader.single("profileImage"), accountController.updateBeneficiary);
router.get("/get_account", requireBeneficiaryAuth, accountController.get_account);
router.get("/get_announcements", requireBeneficiaryAuth, announcementController.get_announcements);
router.post("/post_request", requireBeneficiaryAuth, requestController.createRequest)
router.post("/get_my_requests", requireBeneficiaryAuth, requestController.getMyRequests)

router.get("/get_tickets", requireBeneficiaryAuth, ticketController.getTickets)
router.post("/raise_ticket", requireBeneficiaryAuth, ticketController.raiseTicket)
router.put("/update_ticket", requireBeneficiaryAuth, ticketController.updateTicket)
router.post("/delete_ticket", requireBeneficiaryAuth, ticketController.deleteTicket)




module.exports = router;

const express = require('express');
const router = express.Router();
const requireBeneficiaryAuth = require('../Middleware/Beneficiary/requireBeneficiaryAuth');

const accountController = require("../Controllers/Beneficiary/accountController");
// const uploader = require("../Middleware/Beneficiary/uploader");
const announcementController = require("../Controllers/Beneficiary/annoucementController");
const requestController = require("../Controllers/Beneficiary/requestController");
const ticketController = require('../Controllers/Beneficiary/ticketController');


// router.put("/update_account", requireBeneficiaryAuth, uploader.single("profileImage"), accountController.updateBeneficiary);
router.get("/get_account", requireBeneficiaryAuth, accountController.get_account);
router.get("/get_announcements", requireBeneficiaryAuth, announcementController.get_announcements);
router.post("/post_request", requireBeneficiaryAuth, requestController.createRequest)
router.post("/get_my_requests", requireBeneficiaryAuth, requestController.getMyRequests)

router.get("/get_tickets", requireBeneficiaryAuth, ticketController.getTickets)
router.post("/raise_ticket", requireBeneficiaryAuth, ticketController.raiseTicket)
router.put("/update_ticket", requireBeneficiaryAuth, ticketController.updateTicket)
router.post("/delete_ticket", requireBeneficiaryAuth, ticketController.deleteTicket)




module.exports = router;
