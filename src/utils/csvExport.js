
// csvExport.js

const fs = require('fs');
const { parse } = require('json2csv');

// Export contacts to CSV
exports.exportContactsToCSV = async (contacts) => {
  try {
    const fields = ['name', 'emails', 'phoneNumbers']; // Define fields to include in CSV

    const json2csvParser = new parse({ fields });
    const csv = json2csvParser.parse(contacts);

    const filePath = 'contacts.csv'; // Define file path for CSV

    // Write CSV to file
    fs.writeFileSync(filePath, csv);

    return filePath; // Return path to CSV file
  } catch (err) {
    console.error('Error exporting contacts to CSV:', err);
    throw new Error('Error exporting contacts to CSV');
  }
};
