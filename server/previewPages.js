import express from 'express';
const app = express();

app.use('/trim', express.static('docs'));

app.listen(3000, () => console.log(
    'Preview app on http://localhost:3000/trim'
));
