import React, {Component} from 'react'
import {connect} from 'react-redux'
import { readOrders } from '../store/orders/actions'

class AdminOrders extends Component {
    componentDidMount() {
        this.props.loadOrders()
    }
    render() {
        const {orders, user} = this.props
        return (
            <ul>
                {orders.map( (order, idx) => {
                    console.log(order, idx)
                    return (
                        <li key={idx}>
                            Order
                        </li>
                    )
                })}
            </ul>
        )
    }
}

const mapStateToProps = ({orders, user}) => {
    return {
        orders,
        user
    }
}

const mapDispatchToProps = dispatch => {
    return {
        loadOrders: () => {
            dispatch(readOrders())
        }
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(AdminOrders)
