import { types } from 'mobx-state-tree'

const Topping = types.model({
  name: types.string,
  price: types.number,
  defaultSelected: types.boolean,
})

const Pizza = types
  .model({
    size: types.string,
    maxToppings: types.maybeNull(types.number),
    toppings: types.array(Topping),
    basePrice: types.number,
  })
  .views(self => ({
    get totalPrice() {
      console.log(self.basePrice)
      return self.basePrice + self.toppings.reduce((acc, t) => acc + t.price, 0)
    },
  }))
  .actions(self => ({
    setPizza(pizza) {
      console.log('setting pizza', pizza)
      self.size = pizza.name
      self.maxToppings = pizza.maxToppings
      self.basePrice = pizza.basePrice
    },
    addTopping(topping) {
      console.log('adding topping', topping)
      self.toppings.push(topping)
    },
    removeToppings(topping) {
      // Implement this
      self.toppings.push(topping)
    },
    setBasePrice(basePrice) {
      self.basePrice = basePrice
    },
  }))

export const RootStore = types.model({
  pizzaForm: Pizza,
  cart: types.array(Pizza),
})
