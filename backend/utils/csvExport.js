const { Parser } = require('json2csv');

const exportToCSV = (posts) => {
  try {
    const fields = [
      { label: 'ID', value: '_id' },
      { label: 'Title', value: 'title' },
      { label: 'Author', value: 'authorName' },
      { label: 'Email', value: 'email' },
      { label: 'Category', value: 'category' },
      { label: 'Status', value: 'status' },
      { label: 'Tags', value: (row) => row.tags.join(', ') },
      { label: 'Short Description', value: 'shortDescription' },
      { label: 'Created At', value: (row) => new Date(row.createdAt).toLocaleString() },
      { label: 'Updated At', value: (row) => new Date(row.updatedAt).toLocaleString() },
    ];

    const json2csvParser = new Parser({ fields });
    const csv = json2csvParser.parse(posts);
    
    return csv;
  } catch (error) {
    throw new Error('Error generating CSV: ' + error.message);
  }
};

module.exports = exportToCSV;
