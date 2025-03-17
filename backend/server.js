const app = require('./app');
const connectDatabase = require('./config/database');

// Connect to database
connectDatabase();

const PORT = process.env.PORT || 8000;

app.listen(PORT, () => {
    console.log(`Server running in ${process.env.NODE_ENV} mode on port ${PORT}`);
});