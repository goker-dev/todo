const app = require('express')()
const cors = require('cors')

app.use(cors())

app.get('/api', (req, res) => {
    const path = `/api/todo`;
    res.setHeader('Content-Type', 'text/html');
    res.setHeader('Cache-Control', 's-max-age=1, stale-while-revalidate');
    res.end(`Hello! Go to item: <a href="${path}">${path}</a>`);
});

app.get('/api/todo', (req, res) => {
    res.setHeader('Content-Type', 'application/json');
    res.setHeader('Cache-Control', 's-max-age=1, stale-while-revalidate');
    res.json([{
        id: '12',
        name: 'post 1',
        priority: 'urgent',
    },
        {
            id: '13',
            name: "first task name",
            priority: 'urgent'
        },
        {
            id: '14',
            name: "second task name",
            priority: 'regular'
        },
        {
            id: '15',
            name: "4th task name",
            priority: 'regular'
        }])
})

module.exports = app;

// const port = 8000
// app.listen(port, () => {
//     console.log(`Example app listening on port ${port}
//     http://localhost:${port}`)
// })
