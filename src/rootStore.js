import { types } from 'mobx-state-tree'
import { onSnapshot } from 'mobx-state-tree'

const Topping = types.model('Topping', {
  name: types.string,
  price: types.number,
  defaultSelected: types.boolean
})

const Pizza = types
  .model('Pizza', {
    size: types.optional(types.string, ''),
    maxToppings: types.optional(types.maybeNull(types.number), 0),
    toppings: types.map(Topping),
    basePrice: types.optional(types.number, 0)
  })
  .views(self => ({
    isToppingDisabled(name) {
      return self.hasMaxToppings && !self.toppings.has(name)
    },
    get hasMaxToppings() {
      return self.toppings.size >= self.maxToppings && self.maxToppings !== null
    },
    get totalPrice() {
      return Array.from(self.toppings.values()).reduce((acc, t) => acc + t.price, self.basePrice)
    }
  }))
  .actions(self => ({
    setPizza(pizza) {
      self.size = pizza.name
      self.maxToppings = pizza.maxToppings
      self.basePrice = pizza.basePrice
      // set default toppings
      self.toppings.clear()
      pizza.toppings
        .filter(t => t.defaultSelected)
        .map(t => ({
          name: t.topping.name,
          price: t.topping.price,
          defaultSelected: t.defaultSelected
        }))
        .forEach(element => {
          self.addTopping(element)
        })
    },
    addTopping(topping) {
      self.toppings.set(topping.name, topping)
    },
    removeTopping(topping) {
      self.toppings.delete(topping.name)
    },
    setBasePrice(basePrice) {
      self.basePrice = basePrice
    }
  }))

const Cart = types
  .model('Cart', { cart: types.array(Pizza) })
  .views(self => ({
    get isEmpty() {
      return self.cart.length === 0
    },
    get total() {
      return self.cart.reduce((acc, pizzaOrder) => acc + pizzaOrder.totalPrice, 0)
    }
  }))
  .actions(self => ({
    clear() {
      self.cart = []
    }
  }))

export const RootStore = types
  .model('RootStore', {
    cartStore: Cart,
    pizzaForm: Pizza
  })
  .actions(self => ({
    addToCart() {
      self.cartStore.cart.push(self.pizzaForm.toJSON())
    },
    removerItemFromCart(index) {
      self.cartStore.cart.splice(index, 1)
    },
    checkout() {
      window.alert('Your order is being delivered.')
      self.cartStore.clear()
    }
  }))

const initialSnapshot = {
  pizzaForm: {
    size: '',
    maxToppings: 0,
    basePrice: 0
  },
  cartStore: { cart: [] }
}
const storeInstance = RootStore.create(initialSnapshot)
// logs every state update for debug
onSnapshot(storeInstance, newSnapshot => {
  console.dir(newSnapshot)
})

export default storeInstance
