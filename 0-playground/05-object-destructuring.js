// Object shorthand

const name = "Zukayu"
const userAge = 23

const userData = {
    name : name,
    age : userAge,
    location : "India"
}

// shorthand

// const userData = {
//     name,
//     age : userAge,
//     location : "India"
// }

// DeStructuring 

const product = {
    label : 'Red Notebook',
    price : 3,
    stock : 201,
    salePrice : undefined,
    // rating : 4.2
}

// const {label : productLabel, stock , rating = 5} = product
// console.log(productLabel)
// console.log(stock)
// console.log(rating)

const transaction = (type, { label , stock}) => {
   console.log(type)
   console.log(label)
   console.log(stock)
}


transaction('order', product)