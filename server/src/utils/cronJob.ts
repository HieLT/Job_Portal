import cron from 'node-cron';
import jobModel from '../models/job.model';

const cronJob = cron.schedule('0 0 * * *', async () => {
    try {
        const now = new Date();
        const jobs = await jobModel.find({
            status: 'Open',
            expired_at: { $lt: now }
        }).exec();

        for (const job of jobs) {
            try {
                await jobModel.findByIdAndUpdate(job._id, {
                    status: 'Closed'
                });
                console.log(`Job ${job._id} status updated to 'Closed'`);
            } catch (updateError) {
                console.error(`Error updating job ${job._id}:`, updateError);
            }
        }
    } catch (error) {
        console.error('Error fetching jobs:', error);
    }
});

export default cronJob;
