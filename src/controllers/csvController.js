// csvController.js

const { exportContactsToCSV } = require('../utils/csvExport');
const { getAllContacts } = require('../services/contactService');

// Export all contacts to CSV
exports.exportContacts = async (req, res) => {
  try {
    // Fetch all contacts
    const contacts = await getAllContacts();

    // Export contacts to CSV
    const filePath = await exportContactsToCSV(contacts);

    // Send the CSV file as a response
    res.download(filePath, 'contacts.csv');
  } catch (err) {
    console.error('Error exporting contacts to CSV:', err);
    res.status(500).json({ msg: 'Error exporting contacts to CSV' });
  }
};
