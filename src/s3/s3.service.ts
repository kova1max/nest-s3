import { Injectable } from '@nestjs/common';
import { Response } from 'express';
import { S3 } from 'aws-sdk';
import { ServerResponse } from 'http';

@Injectable()
export class S3Service {
  private readonly BUCKET = 'elasticbeanstalk-us-east-2-695649667796';

  private s3 = new S3({
    accessKeyId: 'AKIA2D57TRLKLMOPDDFI',
    secretAccessKey: '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',
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
