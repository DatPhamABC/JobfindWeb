const express = require("express");
const router = express.Router();
const company = require("../models/company");

router.get("/", async (req, res) => {
  try {
    const comp = await company.find();
    res.json(comp);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

router.get("/:id", getCompany, (req, res) => {
  res.json(res.comp);
});

router.post("/", async (req, res) => {
  const comp = new company({
    img: req.body.img,
    title: req.body.title,
    address: req.body.address,
    logo: req.body.logo,
    overviews: req.body.overviews,
    keySkills: req.body.keySkills,
    whyYouLoveWorkingHere: req.body.whyYouLoveWorkingHere,
    url: req.body.url,
  });
  try {
    const newcomp = await comp.save();
    res.status(200).json({ newcomp });
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
});

router.patch("/:id", getCompany, async (req, res) => {
  try {
    if (req.body.img != null) {
      res.comp.img = req.body.img;
    }
    if (req.body.title != null) {
      res.comp.title = req.body.title;
    }
    if (req.body.address != null) {
      res.comp.address = req.body.address;
    }
    if (req.body.logo != null) {
      res.comp.logo = req.body.logo;
    }
    if (req.body.overviews != null) {
      res.comp.overviews = req.body.overviews;
    }
    if (req.body.keySkills != null) {
      res.comp.keySkills = req.body.keySkills;
    }
    if (req.body.whyYouLoveWorkingHere != null) {
      res.comp.whyYouLoveWorkingHere = req.body.whyYouLoveWorkingHere;
    }
    if (req.body.url != null) {
      res.comp.url = req.body.url;
    }
    res.json(await res.comp.save());
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
});

router.delete("/:id", getCompany, async (req, res) => {
  try {
    await res.comp.remove();
    res.send("Deleted");
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

async function getCompany(req, res, next) {
  let comp;
  try {
    comp = await company.findById(req.params.id);
    if (comp == null) {
      return res.status(404).json({ message: "Not found" });
    }
  } catch (error) {
    return res.status(500).json({ message: error.message });
  }
  res.comp = comp;
  next();
}

module.exports = router;
