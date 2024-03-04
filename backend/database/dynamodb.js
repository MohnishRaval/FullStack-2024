import AWS from 'aws-sdk';
import dotenv from 'dotenv';
dotenv.config();

// Configure AWS SDK
AWS.config.update({
  accessKeyId: process.env.accessKeyId,
  secretAccessKey: process.env.secretAccessKey,
  region: 'us-east-1',
});

// Create DynamoDB document client
const dynamoDB = new AWS.DynamoDB.DocumentClient();

// Example: Put Item into DynamoDB
const params = {
  TableName: 'tmp_table',
  Item: {
    users: '123',
  },
};

dynamoDB.put(params, (err, data) => {
  if (err) {
    console.error('Error putting item into DynamoDB:', err);
  } else {
    console.log('Item added successfully:', data);
  }
});
