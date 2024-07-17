const mongoose = require('mongoose');
mongoose.set('strictQuery', true);

async function connect() {
    try {
        await mongoose.connect(process.env.MONGO_URI);
        console.log("Successfully connected to database!");
    }
    catch(err:any) {
        console.error('Error connecting to MongoDB:', err.message);
    }
}

export default connect;