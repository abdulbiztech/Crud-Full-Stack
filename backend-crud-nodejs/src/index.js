const express = require('express');
const { default: mongoose } = require('mongoose');
const cors = require('cors')
const app = express();
const PORT = process.env.PORT || 3001
require('dotenv').config();
const userRoutes = require('./routes/user');

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cors(["http://localhost:3000"]))
mongoose.connect(process.env.MONGO_URL, {}).then(() => console.log("MongoDB is connected...")).catch((error) => console.log(error))

app.use('/users', userRoutes);
app.listen(PORT, () => {
    console.log(`Server is running on port: http://localhost:${PORT}`);
})