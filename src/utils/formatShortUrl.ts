import { Request } from 'express';

export default function formatShortUrl(
  req: Request,
  apiPath: string,
  shortenUrlId: string,
): string {
  const { protocol } = req;
  const hostname = req.headers.host;
  const url = `${protocol}://${hostname}${apiPath}/${shortenUrlId}`;
  return url;
}
