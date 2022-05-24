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

  public async upload(file: Express.Multer.File): Promise<any> {
  	return this.s3.upload({
  		Bucket: this.BUCKET,
        Key: file.originalname,
        Body: file,
        ACL: "public-read",
        ContentType: file.mimetype,
  	})
  }
  
  public async download(filename: string, res: Response): Promise<any> {
    const stream = this.s3.getObject({
    	Bucket: this.BUCKET,
        Key: filename
    }).createReadStream();

    res.attachment(filename);

    return stream.pipe(res);
  }
}
