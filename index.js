
import * as fs from 'fs';
import { GetObjectCommand,PutObjectCommand, S3Client } from "@aws-sdk/client-s3";

const client = new S3Client({});

const command = new GetObjectCommand({
    Bucket: 'relarcha-input-bucket', Key: 'csvExemple.csv'
  });

  const command2 = new PutObjectCommand({
    Bucket: 'relarcha-output-bucket', Key: 'sample.csv'
  });

  try {
    const response = await client.send(command);
    

    // The Body object also has 'transformToByteArray' and 'transformToWebStream' methods.
    //console.log(response.Body.transformToString());
    const str = await response.Body.transformToString();

    const command2 = new PutObjectCommand({
        Bucket: 'relarcha-output-bucket', Key: 'sample.csv', Body:str
      });

    await client.send(command2);


  } catch (err) {
    console.error(err);
  }