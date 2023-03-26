// Test server
const app = require('./server')
const port = 5689
app.listen(port,
    () => console.log(`Travel weather app listening on port ${port}!`)
)