const router = require("express").Router();
const { isValidObjectId } = require("mongoose");
const multer = require("multer");
let Contact = require("../models/contact");
var storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, "public");
  },
  filename: function (req, file, cb) {
    cb(null, file.fieldname + "-" + Date.now());
  },
});

var upload = multer({ storage: storage });

router.post("/contacts", async (req, res, next) => {
  try {
    const { name, lastname, phone, company, notes, image } = req.body;
    console.log(name, lastname, phone, company, notes);

    const contact = new Contact();

    if (name) contact.name = name;
    if (lastname) contact.lastname = lastname;
    if (phone) contact.phone = phone;
    if (company) contact.company = company;
    if (notes) contact.notes = notes;
    if (image) contact.image = image;

    return res.json({
      contact: await contact.save(),
    });
  } catch (error) {
    console.log(error);
  }
});

router.delete("/contacts/:id", async (req, res, next) => {
  try {
    res.json({
      contact: await Contact.deleteOne({ _id: req.params.id }),
    });
  } catch (error) {
    console.log(error);
  }
});

router.put("/contacts/:id", async (req, res, next) => {
  try {
    const contact = await Contact.findById(req.params.id);

    const { name, lastname, phone, company, notes, image } = req.body;

    if (name) contact.name = name;
    if (lastname) contact.lastname = lastname;
    if (phone) contact.phone = phone;
    if (company) contact.company = company;
    if (notes) contact.notes = notes;
    if (image) contact.image = image;

    return res.json({
      contact: await contact.save(),
    });
  } catch (error) {}
});
router.get("/contacts", async (req, res, next) => {
  console.log("asas");
  try {
    const searchField = req.query.name;
    console.log(searchField);

    let mongoQuery = {};
    if (searchField) {
      mongoQuery.name = new RegExp(searchField, "i");
    }
    const results = await Contact.find(mongoQuery);

    return res.json({
      contacts: results,
    });
  } catch (error) {}
});

router.get("/contacts/:id", async (req, res, next) => {
  console.log("asas");
  try {
    return res.json({
      contact: await Contact.findById(req.params.id),
    });
  } catch (error) {}
});

router.post("/upload", upload.single("image"), async (req, res, next) => {
  console.log("ye start hua", req.body);
  return res.json({
    path: req.file.filename,
  });
});

module.exports = router;
