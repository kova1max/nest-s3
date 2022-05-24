import { Injectable } from '@nestjs/common';
import { Response } from 'express';
import { S3 } from 'aws-sdk';
import { ServerResponse } from 'http';
import { ConfigService } from '@nestjs/config';

@Injectable()
export class S3Service {
  constructor(private readonly configService: ConfigService) {}

  private readonly BUCKET = this.configService.get<string>('aws.bucket');

  private s3 = new S3({
    accessKeyId: this.configService.get<string>('aws.accessKeyId'),
    secretAccessKey: this.configService.get<string>('aws.secretAccessKey'),
    region: this.configService.get<string>('aws.region'),
  });

  public async upload(file: Express.Multer.File): Promise<any> {
    return this.s3
      .upload({
        Bucket: this.BUCKET,
        Key: file.originalname,
        Body: file.buffer,
        ACL: 'public-read',
        ContentType: file.mimetype,
      })
      .promise();
  }

  public async download(
    filename: string,
    res: Response,
  ): Promise<ServerResponse> {
    const stream = this.s3
      .getObject({
        Bucket: this.BUCKET,
        Key: filename,
      })
      .createReadStream();

    res.attachment(filename);

    return stream.pipe(res);
  }
}
