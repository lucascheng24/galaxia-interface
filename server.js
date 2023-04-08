const express = require('express');
const app = express();
const port = process.env.PORT || 8080;

app.listen(port, () => {
    console.log(`Server running on port ${port}`);
});

const cors = require('cors');

app.use(cors());