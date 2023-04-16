const express = require('express')
const app = express()
const exphbs = require('express-handlebars')
const port = 3000
const restaurantList = require('./restaurant.json')

app.engine('handlebars', exphbs({
    defaultLayout: 'main'
}))

app.set('view engine', 'handlebars')

app.get('/', (req, res) => {
    res.render('index', {restaurants: restaurantList.results})
})

app.get('/restaurants/:id', (req, res) => {
    const restaurant = restaurantList.results.filter(item => {
       return item.id.toString() === req.params.id
    })
    
    res.render('show', {restaurant: restaurant[0]})
})

app.get('/search', (req, res) => {
    const keyword = req.query.keyword
    const searchRestaurants = restaurantList.results.filter( item => {
        if(item.name.toLowerCase().includes(keyword.toLowerCase()) || item.category.toLowerCase().includes(keyword.toLowerCase())) {
            return item
        }
    })
    res.render('index', {restaurants: searchRestaurants, keyword: keyword})
})

app.listen(port, () => {
    console.log(`Express running on http://localhost:${port}`)
})

app.use(express.static('public'))