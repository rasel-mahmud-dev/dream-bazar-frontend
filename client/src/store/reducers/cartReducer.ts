import {ACTION_TYPES} from "store/types"

import {toggleNotify} from "actions/appAction"

interface CartStateType {
    cartProducts: {
        _id: string,
        title: string,
        quantity: number,
        unitPrice: number,
        image: string
    }[] | any
}

const initialState: CartStateType = {
    cartProducts: [
        {
            title: "Iphone 11",
            _id: 12342342343243,
            total: 123,
            color: "red",
            size: "big",
            qty: 10,
            img: "/free-new-more-kanjivaram-fashion-anusuya-saree-original-imafjpaae2mdwzhu.jpeg"
        },
        {
            title: "Jeans 11",
            _id: 11232,
            total: 123,
            color: "red",
            size: "big",
            qty: 10,
            img: "/free-new-more-kanjivaram-fashion-anusuya-saree-original-imafjpaae2mdwzhu.jpeg"
        },
        {
            title: "Laptop 11",
            _id: 1123,
            total: 123,
            color: "red",
            size: "big",
            qty: 10,
            img: "/free-new-more-kanjivaram-fashion-anusuya-saree-original-imafjpaae2mdwzhu.jpeg"
        },
        {
            title: "Mufti T-shart",
            _id: 11,
            total: 13,
            color: "green",
            size: "sm",
            qty: 10,
            img: "/free-new-more-kanjivaram-fashion-anusuya-saree-original-imafjpaae2mdwzhu.jpeg"
        },
    ]
}


const cartReducer = (state = initialState, action) => {
    let updatedState = {...state}

    switch (action.type) {
        case ACTION_TYPES.FETCH_PRODUCT :
            return updatedState

        case ACTION_TYPES.ADD_TO_CART :

            let p = action.payload
            let index = updatedState.cartProducts.findIndex(cp => cp._id === p._id)
            // log2(updatedState.cartProducts)
            if (index !== -1) {
                updatedState.cartProducts[index].quantity += 1
            } else {
                updatedState.cartProducts = [
                    ...updatedState.cartProducts,
                    {_id: p._id, title: p.title, unitPrice: p.price, quantity: 1, image: p.cover_photo}
                ]
            }
            return updatedState

        case ACTION_TYPES.INCREASE_CART_ITEM:
            let i = updatedState.cartProducts.findIndex(cp => cp._id === action.payload)
            updatedState.cartProducts[i].quantity++
            return updatedState

        case ACTION_TYPES.DECREASE_CART_ITEM:
            let deindex = updatedState.cartProducts.findIndex(cp => cp._id === action.payload)
            if (updatedState.cartProducts[deindex].quantity > 1) {
                updatedState.cartProducts[deindex].quantity--
            }
            return updatedState

        case ACTION_TYPES.REMOVE_CART_ITEM :
            let f = updatedState.cartProducts.filter(cp => cp._id !== action.payload)
            updatedState.cartProducts = f
            return updatedState


        default:
            return state
    }
}

export default cartReducer