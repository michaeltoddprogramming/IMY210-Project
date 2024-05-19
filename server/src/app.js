// Michael Todd u23540223

const express = require('express');
const cors = require('cors');
const fs = require('node:fs');
const xml2js = require('xml2js');
const path = require('path');
const xmlbuilder = require('xmlbuilder');
const { v4: uuidv4 } = require('uuid');
const usersFilePath = path.join(__dirname, '..', 'db', 'users.xml'); // USERS DATABASE
const builder = new xml2js.Builder();



const app = express();
const port = 3002;
const corsOptions = {
    origin: 'http://localhost:5173', 
    credentials: true,        
    optionSuccessStatus: 200,
}

app.use(cors(corsOptions));
app.use(express.json());
const parser = new xml2js.Parser();

app.get('/stores', (req, res) => {
    const dirPath = path.join(__dirname, '../db/stores'); 

    fs.readdir(dirPath, (err, files) => {
        if (err) {
            res.status(500).send(err);
            return;
        }

        let stores = [];
        let filesRead = 0;

        files.forEach((file) => {
            const filePath = path.join(dirPath, file);

            fs.readFile(filePath, (err, data) => {
                if (err) {
                    res.status(500).send(err);
                    return;
                }

                parser.parseString(data, (err, result) => {
                    if (err) {
                        res.status(500).send(err);
                        return;
                    }

                    stores.push(result);
                    filesRead++;

                    if (filesRead === files.length) {
                        const storeId = req.query.id;
                        if (storeId) {
                            const filteredStores = stores.filter(store => store.store.information[0].$.id === storeId);
                            res.json(filteredStores);
                        } else {
                            res.json(stores);
                        }
                    }
                });
            });
        });
    });
});

app.get('/stores/:storeId', (req, res) => {
    const { storeId } = req.params;
    const dirPath = path.join(__dirname, '../db/stores');

    fs.readdir(dirPath, (err, files) => {
        if (err) {
            res.status(500).send(err);
            return;
        }

        let filesRead = 0;
        let storeFound = false;

        files.forEach((file) => {
            const filePath = path.join(dirPath, file);

            fs.readFile(filePath, (err, data) => {
                if (err) {
                    res.status(500).send(err);
                    return;
                }

                parser.parseString(data, (err, result) => {
                    if (err) {
                        res.status(500).send(err);
                        return;
                    }

                    filesRead++;

                    if (result.store.information[0].$.id === storeId) {
                        storeFound = true;
                        res.json(result);
                        return;
                    }

                    if (filesRead === files.length && !storeFound) {
                        res.status(404).send('Store not found');
                    }
                });
            });
        });
    });
});

app.post('/register', (req, res) => {
    const { email, password, name, surname, storeOwner } = req.body;

    fs.readFile(usersFilePath, (err, data) => {
        if (err) {
            res.status(500).send(err);
        } else {
            parser.parseString(data, (err, result) => {
                if (err) {
                    res.status(500).send(err);
                } else {
                    let users = result.users.user;
                    if (!Array.isArray(users)) {
                        users = [users];
                    }
                    const userId = uuidv4();
                    users.push({ userId: [userId], email: [email], password: [password], name: [name], surname: [surname], storeOwner: [storeOwner]});
                    const xml = new xml2js.Builder().buildObject({ users: { user: users } });

                    fs.writeFile(usersFilePath, xml, (err) => {
                        if (err) {
                            res.status(500).send(err);
                        } else {
                            res.json({ success: true, userId: userId });
                        }
                    });
                }
            });
        }
    });
});

app.post('/login', (req, res) => {
    const { email, password } = req.body;

    fs.readFile(usersFilePath, (err, data) => {
        if (err) {
            res.status(500).send(err);
        } else {
            parser.parseString(data, (err, result) => {
                if (err) {
                    res.status(500).send(err);
                } else {
                    let users = result.users.user;
                    if (!Array.isArray(users)) {
                        users = [users];
                    }

                    const user = users.find(user => user.email[0] === email && user.password[0] === password);

                    if (user) {
                        res.json({ success: true, name: user.name[0], surname: user.surname[0], userId: user.userId[0] });
                    } else {
                        res.status(401).json({ success: false, message: 'Invalid credentials' });
                    }
                }
            });
        }
    });
});

let carts = {};

app.post('/add-to-cart/:productId', (req, res) => {
    const { userId } = req.body;
    const { productId } = req.params;

    fs.readFile(usersFilePath, (err, data) => {
        if (err) {
            res.status(500).send(err);
        } else {
            parser.parseString(data, (err, result) => {
                if (err) {
                    res.status(500).send(err);
                } else {
                    let users = result.users.user;
                    if (!Array.isArray(users)) {
                        users = [users];
                    }

                    const user = users.find(user => user.userId[0] === userId);
                    if (!user) {
                        return res.status(401).json({ message: 'User not registered' });
                    }

                    if (!carts[userId]) {
                        carts[userId] = [];
                    }

                    carts[userId].push(productId);

                    res.status(200).json({ message: 'Product added to cart successfully', cart: carts[userId]});
                }
            });
        }
    });
});

app.get('/cart/:userId', (req, res) => {
    const { userId } = req.params;

    if (!carts[userId]) {
        carts[userId] = [];
    }

    res.json({ cart: carts[userId] });
});

const uuid = require('uuid');

app.post('/create', (req, res) => {
    const { name, description } = req.body;

    const id = uuid.v4(); 

    const xml = xmlbuilder.create('store')
        .ele('information')
        .att('id', id)
        .ele('name', name)
        .up()
        .ele('description', description)
        .up()
        .end({ pretty: true });

    let filename = '../db/stores/' + name + '.xml';
    fs.writeFile(filename, xml, (err) => {
        if (err) {
            res.status(500).send(err);
        } else {
            res.status(200).json({ status: 'Created store successfully!', id: id});
        }
    });
});

function checkStoreOwner(req, res, next) {
    const { userId } = req.body;

    fs.readFile(usersFilePath, (err, data) => {
        if (err) {
            return res.status(500).send('Server error');
        }

        parser.parseString(data, (err, result) => {
            if (err) {
                return res.status(500).send('Server error');
            }

            let users = result.users.user;
            if (!Array.isArray(users)) {
                users = [users];
            }

            const user = users.find(user => user.userId[0] === userId);

            if (!user) {
                return res.status(401).json({status:'Unauthorized - You are not a registered user or you are not a store owner!'});
            }

            req.isStoreOwner = user.storeOwner[0] === "true";
            next();
        });
    });
}

app.get('/product/:productId', (req, res) => {
    const { productId } = req.params;
    const filename = '../db/stores/John\'s Textbooks.xml';

    fs.readFile(filename, (err, data) => {
        if (err) {
            return res.status(500).send('Server error');
        }

        xml2js.parseString(data, (err, result) => {
            if (err) {
                return res.status(500).send('Server error');
            }

            const product = result.store.products[0].product.find(p => p.$.id === productId);

            if (!product) {
                return res.status(404).send('Product not found');
            }

            res.status(200).json({status: "Successfully fetched the product!", product});
        });
    });
});

let skuCounter = 0;
app.post('/product', checkStoreOwner, (req, res) => {
    if (!req.isStoreOwner) {
        return res.status(403).send('Only store owners can add products');
    } else {

        const { language, edition, title, author, isbn, description, price, department, modules, availability, condition, image } = req.body;
        
        const id = uuid.v4();
        const sku = 'PRODUCT-' + skuCounter++; 
        
        const filename = '../db/stores/John\'s Textbooks.xml';
        fs.readFile(filename, (err, data) => {
            if (err) {
                return res.status(500).send('Server error');
            }
            
            xml2js.parseString(data, (err, result) => {
                if (err) {
                    return res.status(500).send('Server error');
                }
                
                const newProduct = {
                    $: {
                        id,
                        language,
                        edition
                    },
                    title: [title],
                    author: [author],
                    isbn: [isbn],
                    sku: [sku],
                    description: [description],
                    price: [{
                        _: price.value,
                        $: {
                            currency: price.currency
                        }
                    }],
                    department: [department],
                    modules: [{
                        module: modules.map(module => ({
                            $: {
                                id: module.id,
                                name: module.name
                            }
                        }))
                    }],
                    availability: [availability],
                    condition: [condition],
                    image: [image]
                };
                
                if (!result.store.products) {
                    result.store.products = [{}];
                }
                
                result.store.products[0].product = (result.store.products[0].product || []).concat(newProduct);
                
            const xml = builder.buildObject(result);

            fs.writeFile(filename, xml, (err) => {
                if (err) {
                    return res.status(500).send('Server error');
                }
                
                res.status(201).json({status:"Successfully added new Product!", productId: id});
            });
        });
    });
    }
});

app.put('/product/:productId', checkStoreOwner, (req, res) => {
    if (!req.isStoreOwner) {
        return res.status(403).send('Only store owners can edit products');
    }

    const { productId } = req.params;
    const filename = '../db/stores/John\'s Textbooks.xml';

    fs.readFile(filename, (err, data) => {
        if (err) {
            return res.status(500).send('Server error');
        }

        xml2js.parseString(data, (err, result) => {
            if (err) {
                return res.status(500).send('Server error');
            }

            const product = result.store.products[0].product.find(p => p.$.id === productId);

            if (!product) {
                return res.status(404).send('Product not found');
            }

            Object.keys(req.body).forEach(key => {
                if (product[key]) {
                    product[key][0] = req.body[key];
                }
            });

            const xml = builder.buildObject(result);

            fs.writeFile(filename, xml, (err) => {
                if (err) {
                    return res.status(500).send('Server error');
                }

                res.status(200).json({status:"Updated product successfully!"});
            });
        });
    });
});

app.delete('/product/:productId', checkStoreOwner, (req, res) => {
    if (!req.isStoreOwner) {
        return res.status(403).send('Only store owners can delete products');
    }

    const { productId } = req.params;
    const filename = '../db/stores/John\'s Textbooks.xml';

    fs.readFile(filename, (err, data) => {
        if (err) {
            return res.status(500).send('Server error');
        }

        xml2js.parseString(data, (err, result) => {
            if (err) {
                return res.status(500).send('Server error');
            }

            const productIndex = result.store.products[0].product.findIndex(p => p.$.id === productId);

            if (productIndex === -1) {
                return res.status(404).json({status:'No product with the given ID - ' + productId + ' was found!'});
            }

            result.store.products[0].product.splice(productIndex, 1);

            if (result.store.products[0].product.length === 0) {
                delete result.store.products[0].product;
                delete result.store.products[0].products;
                delete result.store.products[0];
            }


            const xml = builder.buildObject(result);

            fs.writeFile(filename, xml, (err) => {
                if (err) {
                    return res.status(500).send('Server error');
                }

                res.status(200).json({status:'Product deleted successfully!'});
            });
        });
    });
});

app.listen(port, (err) => {
  if (err) {
    return console.error('Error occurred while starting the server: ', err);
  }
  console.log(`Server is running on http://localhost:${port}`);
});