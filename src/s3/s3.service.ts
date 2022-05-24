import { Injectable } from '@nestjs/common';
import { Response } from 'express';
import { S3 } from 'aws-sdk';

@Injectable()
export class S3Service {
  private readonly BUCKET = '';

  private s3 = new S3({
    accessKeyId: '',
    secretAccessKey: '',
  });

  public upload() {}
  
  public download(filename: string, res: Response) {
    const stream = this.s3.getObject({
    	Bucket: this.BUCKET,
        Key: filename
    }).createReadStream();

    res.attachment(filename);

    return stream.pipe(res);
  }
}
