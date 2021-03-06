import React from 'react'
import ReactDOM from 'react-dom'
import App from './App'
import reportWebVitals from './reportWebVitals'
import { loadServer, DevTools } from 'jira-dev-tool'
import 'antd/dist/antd.less'
import { AppAuthProvider } from 'context'
import { BrowserRouter as Router } from 'react-router-dom'
import { Profiler } from 'components/common/profiler'

loadServer(() =>
  ReactDOM.render(
    <React.StrictMode>
      <Profiler id={'Root App'} phases={['mount']}>
        <Router>
          <AppAuthProvider>
            <DevTools />
            <App />
          </AppAuthProvider>
        </Router>
      </Profiler>
    </React.StrictMode>,
    document.getElementById('root'),
  ),
)

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals()
