const mongoose = require("mongoose");

const pageSchema = new mongoose.Schema({
  pageName: { type: String, required: true },
  appName: { type: String, required: true },
  creationDate: { type: Date, default: Date.now },
  createdBy: { type: String, required: true },
  componentList: [
    {
      name: { type: String, required: true },
      label: { type: String, required: true },
      type: { type: String, required: true },
      isMandatory: { type: Boolean, default: false },
      options: { type: [String], default: [] }, // for checkbox/radio options
    },
  ],
});

const Page = mongoose.model("Page", pageSchema);

module.exports = Page;
