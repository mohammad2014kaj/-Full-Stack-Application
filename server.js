const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');
const fs = require('fs');

const app = express();
const port = process.env.PORT || 3001; //

app.use(bodyParser.json());
app.use(cors());

app.post('/submitForm', (req, res) => {
  try {
    if (!req.body.name || !req.body.email || !req.body.address || !req.body.phone) {
      return res.status(400).json({ success: false, message: 'All fields are required.' });
    }
    
    const sanitize = (str) => str.replace(/[,"]/g, ""); 
    const formData = {
      name: sanitize(req.body.name),
      email: sanitize(req.body.email)
    };

    const csvData = `${formData.name},${formData.email},${formData.address},${formData.phone}\n`;
    fs.appendFileSync('formData.csv', csvData);
    return res.json({ success: true, message: 'Form submitted successfully' });
    
  } catch (error) {
    console.error('Error processing form:', error);
    return res.status(500).json({ success: false, message: 'Error processing the form' });
  }
});

app.listen(port, () => {
  console.log(`Server is listening on port ${port}`);
});
