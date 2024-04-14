const multiply = (multi1, multi2) => {
  if (typeof multi1 !== 'number' || typeof multi2 !== 'number') {
    return NaN
  }
  return multi1 * multi2
}

//Concat is a method of an array used to merge two or more arrays.
const concatOdds = (odds1, odds2) => {
  //! before an Array checks the opposite of a variable's variable.
  //!true is false, !false is true. Aka Opposites!
  // || is logical OR, in this 
  if (!Array.isArray(odds1) || !Array.isArray(odds2)) {
    return []
  }

  if (!odds1.every(input => typeof input === 'number') || !odds2.every(input => typeof input === 'number')) {
    return []
  }
  const OddNums = odds1.concat(odds2).filter(num => (num % 2 === 1) || num % 2 === -1).sort((a, b) => a - b)
  const result = []

  for (let num of OddNums) {
    if (!result.includes(num)) {
      result.push(num)
    }
  }
  return result
}

class OnlineCart {
  //constructor takes in everything that will pass in regarding the class
  constructor(signedOn) {
    //{} Shopping Cart is an Object
    this.shoppingcart = {};
    this.signedOn = signedOn
  }
//Item is Parameter
  addItemToCart(item) {
    const name = item.name;
    if (name in this.shoppingcart) {
        this.shoppingcart[name].quantity++;
    } else {
        this.shoppingcart[name] = { price: item.price, quantity: 1 };
    }
}

  removeItemFromCart(item) {
    const name = item.name
    if (name in this.shoppingcart) {
      if (this.shoppingcart[name].quantity > 1) {
        this.shoppingcart[name].quantity--
      } else {
        delete this.shoppingcart[name]
      }
    }
  }

  checkoutCart() {
    var checkingout = 0
    //.keys = list of different merch length = list of different merch
    if (Object.keys(this.shoppingcart).length > 0) {
      for (let item in this.shoppingcart) {
        checkingout += (this.shoppingcart[item].price * this.shoppingcart[item].quantity)
      }
//! in this case NOT signed on.
      if (!this.signedOn) {
        return 'Are you an existing customer? If not Create an Account'
      } else {
        return checkingout
      }
    } else {
      return 'Please add items prior to checkout'
    }
  }
}


module.exports = { multiply, concatOdds, OnlineCart }

