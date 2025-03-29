import app from './app';
import { appConfig } from './config/env';

const PORT = appConfig.port;

app.listen(PORT, () => {
    console.log(`Server is running on http://localhost:${PORT}`);
});
