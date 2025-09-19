
import axios from 'axios'
import { addCartItemRequest, addCartItemSuccess } from '../slices/cartSlice'

export const addCartItem = (id, quantity,offerPrice) => async(dispatch) => {
    try {
        dispatch(addCartItemRequest())
        const {data } = await axios.get(`/api/v1/product/${id}`)
        dispatch(addCartItemSuccess({
            product: data.product._id,
            name: data.product.name,
            price: offerPrice,
            image: data.product.images[0].image,
            stock: data.product.stock,
            quantity
        }))
    } catch (error) {
        
    }
}