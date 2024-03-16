const path = require('path');

const downloadFile = (req, res) => {
    const fileName = req.params.fileName;
    const filePath = path.join(__dirname, '../uploads', fileName);

    res.download(filePath, fileName);
};

module.exports = downloadFile;
