const router = require("express").Router();
const { isValidObjectId } = require("mongoose");
let Contact = require("../models/contact");

router.post("/contact", async (req, res, next) => {
  try {
    const { name, lastname, phone, company, notes } = req.body;
    console.log(name, lastname, phone, company, notes);

    const contact = new Contact();

    if (name) contact.name = name;
    if (lastname) contact.lastname = lastname;
    if (phone) contact.phone = phone;
    if (company) contact.company = company;
    if (notes) contact.notes = notes;

    return res.json({
      contact: await contact.save(),
    });
  } catch (error) {
    console.log(error);
  }
});

router.delete("/contact/:id", async (req, res, next) => {
  try {
    res.json({
      contact: await Contact.deleteOne({ _id: req.params.id }),
    });
  } catch (error) {
    console.log(error);
  }
});

router.put("/contact/:id", async (req, res, next) => {
  try {
    const contact = await Contact.findById(req.params.id);

    const { name, lastname, phone, company, notes } = req.body;

    if (name) contact.name = name;
    if (lastname) contact.lastname = lastname;
    if (phone) contact.phone = phone;
    if (company) contact.company = company;
    if (notes) contact.notes = notes;

    return res.json({
      contact: await contact.save(),
    });
  } catch (error) {}
});
router.get("/contact", async (req, res, next) => {
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

module.exports = router;
