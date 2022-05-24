import {
  Controller,
  Get,
  Post,
  UploadedFile,
  UseInterceptors,
  Param,
  Res,
} from '@nestjs/common';
import { FileInterceptor } from '@nestjs/platform-express';
import { Response } from 'express';
import { ServerResponse } from 'http';
import { UploadFileResponse } from './responses/upload-file.response';
import { S3Service } from './s3.service';

@Controller('s3')
export class S3Controller {
  constructor(private s3Service: S3Service) {}

  @Post('upload')
  @UseInterceptors(FileInterceptor('file'))
  async uploadFile(
    @UploadedFile() file: Express.Multer.File,
  ): Promise<UploadFileResponse> {
    return this.s3Service.upload(file);
  }

  @Get('download/:filename')
  async downloadFile(
    @Param('filename') filename: string,
    @Res() res: Response,
  ): Promise<ServerResponse> {
    return this.s3Service.download(filename, res);
  }
}
