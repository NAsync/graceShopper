/**
 * `components/index.js` exists simply as a 'central export' for our components.
 * This way, we can import all of our components from the same place, rather than
 * having to figure out which file they belong to!
 */
export {default as Admin} from './admin'
export {default as AdminOrders} from './adminOrders'
export {default as AdminProducts} from './adminProducts'
export {default as AdminProductCreate} from './adminProductCreate'
export {default as AdminProductSingle} from './adminProductSingle'
export {default as Cart} from './cart'
export {default as Checkout} from './checkout'
export {default as DepartmentsSlide} from './departmentsSlide'
export {default as Navbar} from './navbar'
export {default as UserHome} from './user-home'
export {Login, Signup} from './auth-form'
export {default as ProductCard} from './productCard'
export {default as ProductDetail} from './productDetail'
export {default as Products} from './products'
export {default as StripeCheckoutButton} from './stripeCheckoutButton'
