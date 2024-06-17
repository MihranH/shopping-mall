const express = require('express');
const cors = require('cors');
const app = express();
const PORT = process.env.PORT || 3001;

app.use(express.json());
app.use(cors());
app.use(require('./routes'));

require('./models');

app.listen(PORT, () => {
    console.log(`Server is listening to port ${PORT}`)
});
