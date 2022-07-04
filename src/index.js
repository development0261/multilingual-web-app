import React from "react"
import ReactDOM from "react-dom"
import App from "./views/App"
import "bootstrap/dist/css/bootstrap.min.css"
import './i18n';

ReactDOM.render(
  <React.StrictMode>
    <App />
  </React.StrictMode>,
  document.getElementById("root")
)
