import axios from 'axios'
import { READ_ORDERS } from './action_types'

const _readOrders = orders => {
    return {
        type: READ_ORDERS,
        orders
    }
}

const readOrders = () => {
    return async dispatch => {
        const orders = (await axios.get('/api/userOrders')).data
        dispatch(_readOrders(orders))
    }
}

export {readOrders}
