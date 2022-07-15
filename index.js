const { createApp } = require('./src/app.js');

const app = createApp();
const PORT = 8080;

app.listen(PORT, () => console.log(`Server is listening on ${PORT}`));
