var mode = process.env.REACT_APP_MY_VAR
var API_SERVER ='http://sjhx.online'

if (mode === 'development') {
  API_SERVER = 'http://127.0.0.1'
  // API_SERVER = 'http://192.168.50.192'
}

if (mode === 'production') {
  API_SERVER = 'http://sjhx.online'
}



export { API_SERVER }