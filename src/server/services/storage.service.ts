import {Storage} from "@google-cloud/storage";

const storage = new Storage({
    credentials: {
        client_email: process.env.client_email,
        client_id: process.env.client_id,
        private_key: process.env.private_key,
    },
    projectId: process.env.project_id
});
const bucket = process.env.BUCKET_NAME;

export default storage.bucket(bucket)
