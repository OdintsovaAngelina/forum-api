import 'dotenv/config';
import { app } from './app.js';

const port = Number(process.env.PORT ?? 8000);
app.listen(port, () => console.log(`Forum API is running at http://localhost:${port}`));