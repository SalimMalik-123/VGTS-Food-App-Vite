
import * as React from 'react'
import * as ReactDOM from 'react-dom'
import { Provider } from 'react-redux'
import { BrowserRouter } from 'react-router-dom'
import 'bootstrap/dist/css/bootstrap.min.css'
import './Styles/bootstrap-overwrite.css'
import './Styles/antd-overwrite.css'
import './Styles/scss/custom.scss'
import './Styles/height-width.css'

import App from './App'
import './index.css'
import store from './Store/store'
import { QueryClient, QueryClientProvider } from 'react-query';

const queryClient = new QueryClient();

ReactDOM.createRoot(document.getElementById('root')!).render(
  <React.StrictMode>
    <Provider store={store} >
    <QueryClientProvider client={queryClient}>
      <BrowserRouter>
          <App />
      </BrowserRouter>
    </QueryClientProvider>
    </Provider> 
  </React.StrictMode>,
)
