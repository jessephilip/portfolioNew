import { Firestore } from '@google-cloud/firestore';
import { join } from 'path';

const secretsPath = join(__dirname, '..', '..', '..', '..', 'secrets', 'jessematherne-5355483b7aea.json')

const DatabaseConnection = new Firestore({
  projectId: 'jessematherne',
  keyFilename: secretsPath,
});

export default DatabaseConnection;
