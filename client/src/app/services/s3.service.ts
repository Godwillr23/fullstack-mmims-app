// s3.service.ts
import { Injectable } from '@angular/core';
import { S3Client, PutObjectCommand } from '@aws-sdk/client-s3';

@Injectable({
  providedIn: 'root'
})
export class S3Service {
  private s3: S3Client;

  constructor() {
    this.s3 = new S3Client({
      region: 'AFSouth1',
      credentials: {
        accessKeyId: 'AKIA4SRJN733CMFZHIA7',
        secretAccessKey: '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'
      }
    });
  }

  async uploadFile(file: File, key: string): Promise<void> {
    const uploadCommand = new PutObjectCommand({
      Bucket: 'bread-app-bucket',
      Key: key,
      Body: file,
      ContentType: file.type
    });

    await this.s3.send(uploadCommand);
  }
}
