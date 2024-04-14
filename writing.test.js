const { multiply, concatOdds, OnlineCart } = require('./writing');
//Describe is a function within the library
//Test is what is being tested
//expect is the outcome expected

//Test Pass
describe('multiply', ()=>{
    test('it multiples the numbers correctly', () => {
        expect(multiply(1,2)).toEqual(2)
    })

    test('it will return NaN if input does not contain numbers', () => {
        expect(multiply(1)).toEqual(NaN)
        expect(multiply(1, 'a')).toEqual(NaN)
        expect(multiply('a', 1)).toEqual(NaN)
        expect(multiply('a', 'b')).toEqual(NaN)
        expect(multiply()).toEqual(NaN)
    })
});

//fail @ .toEqual, failed when numbers weren't sequential
describe ('concatOdds', ()=>{
test('The numbers filtered/returned will be odd numbers', ()=> {
    expect(concatOdds([1, 4, 7], [-2, 6, -9])).toEqual([-9, 1, 7])
    expect(concatOdds([3], [9])).toEqual([3, 9])
})
//fail @ .toEqual, failed when numbers weren't sequential
test('The numbers returned wont be duplicates', ()=> {
    expect(concatOdds([1, 3, 5, 7], [-1, 3, -5])).toEqual([-5, -1, 1, 3, 5, 7])
    expect(concatOdds([3], [3])).toEqual([3])
    expect(concatOdds([9, 9, 9], [1, 9])).toEqual([1, 9])
})
//Test Pass
test('It returns nothing/empty if there are not 2 arrays OR if either has input that isnt an interger', () => {
    expect(concatOdds([1, 3])).toEqual([])
    expect(concatOdds()).toEqual([])
    expect(concatOdds(['a', 1, 3], [1])).toEqual([])
    expect(concatOdds([1, 3], ['a', 3])).toEqual([])
})
});


describe ('OnlineCart', ()=> {
//Creates a User Signed On or Not
const onlineCartSignedOn = new OnlineCart(true)
const onlineCartNotSignedOn = new OnlineCart(false)
//Test to see if the user is logged in or not
test('Is the user logged in', () => {
    expect(onlineCartSignedOn.signedOn).toEqual(true)
    expect(onlineCartNotSignedOn.signedOn).toEqual(false)
    expect(onlineCartSignedOn.shoppingcart).toEqual({})
    expect(onlineCartNotSignedOn.shoppingcart).toEqual({})

})
//Test to increase quantities of items in the cart
test('Adding an item to cart increases the item to x', () => {
    onlineCartSignedOn.addItemToCart({ name: `Videogame`, price: 70}) 
    expect(onlineCartSignedOn.shoppingcart).toEqual({ Videogame: {price: 70, quantity: 1 }})
    onlineCartSignedOn.addItemToCart({ name: `Videogame`, price: 70}) 
    expect(onlineCartSignedOn.shoppingcart).toEqual({ Videogame: {price: 70, quantity: 2 }})

    onlineCartNotSignedOn.addItemToCart({ name: `Videogame`, price: 70}) 
    expect(onlineCartNotSignedOn.shoppingcart).toEqual({ Videogame: {price: 70, quantity: 1 }})
    onlineCartNotSignedOn.addItemToCart({ name: `Videogame`, price: 70}) 
    expect(onlineCartNotSignedOn.shoppingcart).toEqual({ Videogame: {price: 70, quantity: 2 }})    
})
//Test to reduce quantities of an item 
//Test to empty cart completely
test('Removing an item from cart reduces the contents', () => {
   onlineCartSignedOn.removeItemFromCart({ name: `Videogame`, price: 70})
    expect(onlineCartSignedOn.shoppingcart).toEqual({ Videogame: {price: 70, quantity: 1}})
    onlineCartSignedOn.removeItemFromCart({ name: `Videogame`, price: 70})
    expect(onlineCartSignedOn.shoppingcart).toEqual({})
    onlineCartNotSignedOn.removeItemFromCart({ name: `Videogame`, price: 70})
    expect(onlineCartNotSignedOn.shoppingcart).toEqual({ Videogame: {price: 70, quantity: 1}})
    onlineCartNotSignedOn.removeItemFromCart({ name: `Videogame`, price: 70})
    expect(onlineCartNotSignedOn.shoppingcart).toEqual({})
})
//Checks to see if they are a customer
//Prompts to become a customer
//Prompts an error if nothing is in the cart to checkout
test('Checking Out', () => {
expect(onlineCartSignedOn.checkoutCart()).toEqual('Please add items prior to checkout')
expect(onlineCartNotSignedOn.checkoutCart()).toEqual('Please add items prior to checkout')
//Adding to cart to test checkout
onlineCartSignedOn.addItemToCart({ name: `Videogame`, price: 70}) 
var resultOne = onlineCartSignedOn.checkoutCart()
expect(resultOne).toEqual(70)
onlineCartNotSignedOn.addItemToCart({ name: `Videogame`, price: 70}) 
var result = onlineCartNotSignedOn.checkoutCart()
expect(result).toEqual('Are you an existing customer? If not Create an Account')
})

});