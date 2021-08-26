import { createContext, useEffect, useReducer, useContext } from 'react';
import commerce from '../lib/commerce';

const CartStateContext = createContext();
const CartDispatchContext = createContext();

const SET_CART = 'SET_CART';
const RESET = 'RESET';

const initialState = {
    total_items: 0,
    total_unique_items: 0,
    line_items: [],
}

const reducer = (state, action) => {
    switch(action.type) {
        case SET_CART:
            return { ...state, ...action.payload };
        case RESET:
            return initialState;
        default:
            throw new Error(`Unknown action: ${action.type}`);
    }
};

export const CartProvider = ({ children }) => {
    const [state, dispatch] = useReducer(reducer, initialState);

    useEffect(() => {
        getCart();
    // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [])

    const setCart = (payload) => dispatch({ type: SET_CART, payload });

    const reset = async () => dispatch({ type: RESET });

    const getCart = async () => {
        try {
            const cart = await commerce.cart.retrieve();
            setCart(cart);
        } catch (error) {
            // put user error alert
            console.log(error);
        }
    };

    return (
        <CartDispatchContext.Provider value={{ setCart, reset }}>
            <CartStateContext.Provider value={state}>
                {children}
            </CartStateContext.Provider>
        </CartDispatchContext.Provider>
    );
};

export const useCartState = () => useContext(CartStateContext);
export const useCartDispatch = () => useContext(CartDispatchContext);