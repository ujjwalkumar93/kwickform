const path = require("path");

const predefinedOnSaveOperation = async (data) => {
  data.processedByPredefined = true;
  data.timestamp = new Date();
  console.log("Predefined on_save logic completed:", data);
  return data;
};

const loadCustomOnSave = async () => {
  try {
    const customLogicPath = path.resolve(
      __dirname,
      "../../../apps/erp/src/index.js"
    );

    delete require.cache[require.resolve(customLogicPath)];
    const customModule = require(customLogicPath);

    if (typeof customModule.onSave === "function") {
      return customModule.onSave;
    } else {
      console.error("No valid onSave function found in custom logic.");
      return null;
    }
  } catch (err) {
    console.error("Error loading custom onSave logic:", err);
    return null;
  }
};

const onSaveController = async (req, res) => {
  const data = req.body;

  try {
    let modifiedData = data;
    const customOnSave = await loadCustomOnSave();

    if (customOnSave) {
      console.log("Running custom on_save logic...");
      modifiedData = await customOnSave(modifiedData);
    } else {
      console.log("No custom on_save logic available.");
    }
    await predefinedOnSaveOperation(modifiedData);
    res.status(200).json({ message: "on_save process completed", data: modifiedData });
  } catch (error) {
    console.error("Error in on_save process:", error);
    res.status(500).json({ message: "An error occurred during on_save" });
  }
};

module.exports = {onSaveController};
