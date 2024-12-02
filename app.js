const express = require("express");
const app = express();
const PORT = 3000;
const morgan = require("morgan");
const { errorHandler } = require('./middleware/errorHandler');

app.use(morgan('dev'));
app.use(express.json());

const router = require('./routes');

app.use('/', router);

app.use(handleNotFound);
app.use(errorHandler);

process.on('unhandledRejection', logUnhandledRejection);

function handleNotFound(req, res) {
  res.status(404).json({ error: `Not found. ${req.url}` });
}
function logUnhandledRejection(reason, promise) {
  console.error('Unhandled Rejection:', reason);
}

app.listen(PORT, () => {
  console.log(`Servidor corriendo en puerto ${PORT}`);
});
