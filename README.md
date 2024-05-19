# IMY 210 Project

# Routes on the server side

## /stores

- Fetches all stores 
- http://localhost:3002/stores

## /stores/:storeId

- Fetches a specific store
- http://localhost:3002/stores/3


## /login

- Grabs the userId and places it in local storage
- http://localhost:3002/login

- Body Example
{
    "email": "idk@gmail.com",
    "password": "Michael53816!@"
}

## /register

- Generates a userId and stores it in local storage, so I can have user specific interactions in Phase 3
- http://localhost:3002/register

- Body Example
{
    "email": "idk@gmail.com",
    "password": "Michael53816!@",
    "name": "Michael",
    "surname": "Soap",
    "storeOwner": true
}

## /create

- Creates a new store and places it in a new xml file
- http://localhost:3002/create

- Body Example
{
    "name": "John's Textbooks",
    "description": "John's Textbooks is a small store that sells textbooks."
}



## /add-to-cart

- Adds a product to a specifc users cart 
- http://localhost:3002/cart/:productId

{
    "userId": "87bf1cc8-ae2f-4f64-8bbb-15708087c565"
}

## /cart/:userId

- Allows a user to check their own specific cart items
- http://localhost:3002/cart/87bf1cc8-ae2f-4f64-8bbb-15708087c565


## /product POST

- Allows only store owners to add products to a store
- http://localhost:3002/product

- Body Example, note the middleware - must check if this userId is a store owner

{
    "userId": "87bf1cc8-ae2f-4f64-8bbb-15708087c565",
    "language": "English",
    "edition": "1st",
    "title": "Introduction to Algorithms",
    "author": "Thomas H. Cormen",
    "isbn": "978-0262033848",
    "description": "The latest edition of the essential text and professional reference, with substantial new material on such topics as vEB trees, multithreaded algorithms, dynamic programming, and edge-based flow.",
    "price": {
        "value": "100.00",
        "currency": "USD"
    },
    "department": "Books",
    "modules": [
        {
            "id": "1",
            "name": "Module 1"
        },
        {
            "id": "2",
            "name": "Module 2"
        }
    ],
    "availability": "In stock",
    "condition": "New",
    "image": "https://example.com/image.jpg"
}

## /product/:productId GET

- Fectches a specific product using its ID
- http://localhost:3002/product/feccd285-bc37-44d0-bec0-e00257260f2e

## /product/:productId DELETE

- Deletes a specific product using its ID and store it belongs to
- http://localhost:3002/product/feccd285-bc37-44d0-bec0-e00257260f2e

## /product/:productId PUT

- Updates a product, only changing what is changed in the body
- http://localhost:3002/product/feccd285-bc37-44d0-bec0-e00257260f2e


## Developer Notes

- If port is taken on machine

- pid=$(lsof -t -i:3002)
- kill -9 $pid