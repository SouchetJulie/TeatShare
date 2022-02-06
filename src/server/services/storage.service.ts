import {Storage} from "@google-cloud/storage";

if (!process.env.gcs_credentials) {
  throw new Error('gcs_credentials must be defined in environment');
}
if (!process.env.BUCKET_NAME) {
  throw new Error('BUCKET_NAME must be defined in environment');
}

const credentials = JSON.parse(process.env.gcs_credentials);

const storage = new Storage({
  credentials: {
    client_email: credentials.client_email,
    client_id: credentials.client_id,
    private_key: credentials.private_key,
  },
  projectId: credentials.project_id,
});
const bucket = process.env.BUCKET_NAME;

export default storage.bucket(bucket);
