import { Router } from 'express';
import { Request, Response } from 'express';
const AppRouter = Router();

AppRouter.get('/', (req: Request, res: Response) => {
  res.redirect('/static/index.html');
});

export default AppRouter;
