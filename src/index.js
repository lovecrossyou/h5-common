import dva from 'dva';
import createLoading from 'dva-loading';
import { createBrowserHistory as createHistory } from 'history';

import './index.css';

// 1. Initialize
const app = dva({
  history: createHistory()
});

// 2. Plugins
app.use(createLoading());
// app.use({});

// 3. Model
app.model(require('./models/shoppingcart').default);
app.model(require('./models/address').default);

// 4. Router
app.router(require('./router').default);

// 5. Start
app.start('#root');
