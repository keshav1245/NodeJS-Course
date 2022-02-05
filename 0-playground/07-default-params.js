const greeter = (name='there') =>{
    console.log('Hello '+name)
}

greeter("Zukayu")
greeter()

const product = {
    label : 'Red Notebook',
    price : 3,
    stock : 201,
    salePrice : undefined,
    // rating : 4.2
}

const transaction = (type, { label , stock = 0} = {}) => {
    console.log(type)
    console.log(label)
    console.log(stock)
 }
 
 
 transaction('order', product)