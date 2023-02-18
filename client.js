import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './shared/App'

ReactDOM.hydrateRoot(
    document.querySelector('#root'),
    <App data={window.__initialData__} />
)
