import 'dotenv/config';
import app from './app';

const PORT: string = process.env.PORT || '5000';

app.listen(PORT, () => {
  console.log(`App running on http://localhost:${PORT}`);
});
