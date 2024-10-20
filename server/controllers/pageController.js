const Page = require("../models/pageModel");

const createPage = async (req, res) => {
  const { pageName, appName, creationDate, createdBy, componentList } = req.body;

  try {
    const newPage = new Page({
      pageName,
      appName,
      creationDate,
      createdBy,
      componentList,
    });
    await newPage.save();
    res.status(201).json({ message: "Page created successfully", data: newPage });
  } catch (error) {
    console.error("Error creating page:", error);
    res.status(500).json({ message: "An error occurred while creating the page." });
  }
};

module.exports = { createPage };
