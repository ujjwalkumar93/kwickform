const validatePage = (req, res, next) => {
    const { pageName, appName, creationDate, createdBy, componentList } = req.body;
    if (!pageName || !appName || !creationDate || !createdBy || !Array.isArray(componentList)) {
      return res.status(400).json({ message: "Invalid input data." });
    }
    next();
  };
  
  module.exports = validatePage;
  