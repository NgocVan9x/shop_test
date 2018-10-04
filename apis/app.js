require('dotenv').config();
const router = require('./routes');
const cors = require('./middleware/cors.middleware');

// call express
const _initExpress = () => {
  console.log('_initExpress initializing express application...');
  const myExpressApp = require('./initializer/Express')();
  myExpressApp.use(cors);
  router(myExpressApp);
};

_initExpress();
