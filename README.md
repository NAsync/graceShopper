# JAR

_A Grace Shopper group project by Josh, Andres, and Robert._

JAR is a toy e-commerce website where visitors can browse essential goods during the stay-at-home period.

## Getting Started

You must have postgreslq installed before running the application locally. Setup for psql can be found [here](https://postgresapp.com/).<br>
In your terminal, enter the following and go to [localhost:8080](http://localhost:8080/) to begin interacting with JAR.

```
npm i
npm run seed
npm run start-dev
```

Alternatively, you can view a deployed version on heroku [here](https://gs-jar.herokuapp.com/).

## Using JAR

When browsing throughout the site, users can view goods altogether, separated by brands, or separated by departments by clicking the hamburger icon at the top left.
![dropdown](./readme_images/dropdown.png)

![4M](./readme_images/4M.png)

When logged in as an admin user, an Admin link appears in the nav bar on the top. Through this link, admin users will have the ability to perform POST and PUT requests for products.
![productUpdate](./readme_images/adminProductUpdate.png)

![productCreate](./readme_images/adminProductCreate.png)

## For Developers

Instead of viewing the site through our beautiful user interface, one can also access certain parts of the site through our API.<br />
For reference, we currently allow GET requests through our API endpoints for brands, credit cards, departments, images, merchants, products, reviews, and users.

```javascript
// View all brands
;`/api/brands`// View a single brand, including its products
`/api/brands/:id`// View all credit cards
`api/creditCards`// View all departments
`/api/departments`// View a single department, including its products
`/api/departments/:id`// View all images
`/api/images`// View all merchants
`/api/merchants`// View all products
`/api/products`// View a single product, and its reviews
`/api/products/:id`// View all reviews
`/api/reviews`// View all users
`/api/users`
```

For example, provided is a sample of `/api/products`:
![productsAPI](./readme_images/productsAPI.png)

## External Resources

favicon from https://favicon.io/emoji-favicons/shopping-cart/

_More to come_
