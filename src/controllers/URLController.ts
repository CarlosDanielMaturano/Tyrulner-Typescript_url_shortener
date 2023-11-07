import { Request, Response } from 'express';
import Controller from '../decorators/Controller';
import Get from '../decorators/routes/Get';
import { Service } from 'typedi';

@Controller('/url')
@Service()
export class UrlController {
  @Get('/oi')
  public async getUrls(req: Request, res: Response): Promise<void> {
    const statusCode = 201;
    const message = 'Hello world';
    res.status(statusCode).send({
      statusCode,
      message,
    });
  }
  @Get('/other')
  public async getOtherThing(req: Request, res: Response): Promise<void> {
    const statusCode = 404;
    const message = 'Thats another route :D';
    res.status(statusCode).send({
      statusCode,
      message,
    });
  }
}
