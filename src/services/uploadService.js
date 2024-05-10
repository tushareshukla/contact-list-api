// uploadService.js

const path = require("path");

// Upload image for a contact
exports.uploadImage = async (contactId, imageFile) => {
  // Save image to disk
  const imagePath = path.join(
    __dirname,
    "..",
    "uploads",
    `${contactId}-${imageFile.originalname}`
  );
  await imageFile.mv(imagePath);

  return imagePath; // Return the path to the saved image
};
