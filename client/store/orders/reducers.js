import {READ_ORDERS} from './action_types'

export const ordersReducer = (state = [], action) => {
    switch(action.type) {
        case READ_ORDERS:
            return action.orders
        default:
            return state
    }
}
