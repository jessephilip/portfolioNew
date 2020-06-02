import { Firestore } from '@google-cloud/firestore';
import { join } from 'path';

const secretsPath = join(
  __dirname,
  '..',
  '..',
  '..',
  '..',
  '..',
  'secrets',
  'jessematherne-5355483b7aea.json',
);

console.log(__dirname);
console.log(secretsPath);

const DatabaseConnection = new Firestore({
  projectId: 'jessematherne',
  keyFilename: secretsPath,
});

new Firestore();

export default DatabaseConnection;
