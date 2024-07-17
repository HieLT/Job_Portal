const mongoose = require('mongoose');
mongoose.set('strictQuery', true);

async function connect() {
    try {
        await mongoose.connect("mongodb://127.0.0.1:27017/job_portal");
        console.log("Successfully connected to database!");
    }
    catch(err:any) {
        console.error('Error connecting to MongoDB:', err.message);
    }
}

export default connect;