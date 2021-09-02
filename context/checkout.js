import { createContext, useReducer, useContext } from 'react';
import commerce from '../lib/commerce';
import { useRouter } from 'next/router';

const CheckoutStateContext = createContext();
const CheckoutDispatchContext = createContext();

const SET_CHECKOUT = 'SET_CHECKOUT';
const SET_LIVE = 'SET_LIVE';
const SET_ORDER = 'SET_ORDER';
const RESET = 'RESET';

const initialState = {
    live: {},
    checkout: {},
    order: null,
};

const reducer = (state, action) => {
    switch (action.type) {
        case SET_CHECKOUT:
            return { ...state, checkout: { ...state.checkout, ...action.payload }, live: { ...state.live, ...action.payload.live }, order: initialState.order };
        case SET_LIVE: 
            return { ...state, live: { ...state.live, ...action.payload } };
        case SET_ORDER: 
            return { ...state, order: action.payload, checkout: initialState.checkout };
        case RESET:
            return initialState;
        default:
            throw new Error(`Unknown action: ${action.type}`)
    }
};

export const CheckoutProvider = ({ children }) => {
    const router = useRouter();
    const [state, dispatch] = useReducer(reducer, initialState);

    const generateToken = async (cartId) => {
        if (!cartId) return;
        try {
            const payload = await commerce.checkout.generateToken(cartId, { type: 'cart', });
            dispatch({ type: SET_CHECKOUT, payload });
        } catch (err) {
            router.push('/products'); // change to empty cart page at some point
            console.log(err);
        }
    };

    const setShippingMethod = async (shipping_option_id, country, region) => {
        try {
            const { live } = await commerce.checkout.checkShippingOption(state.checkout.id, {
                shipping_option_id,
                country,
                ...(region && { region }),
            });
            dispatch({ type: SET_LIVE, payload: live });
        } catch (err) {
            console.log(err);
        }
    };

    const setTaxZone = async (country, region, postal_zip_code) => {
        try {
            const { live } = await commerce.checkout.setTaxZone(state.checkout.id, {
                country,
                ...(region && { region }),
                postal_zip_code,
            });
            dispatch({ type: SET_LIVE, payload: live });
        } catch (err) {
            console.log(err);
        }
    };

    const captureCheckout = async (orderData) => {
        try {
            router.push('/confirmation');
            const order = await commerce.checkout.capture(state.checkout.id, orderData);
            //window.sessionStorage.setItem('order', JSON.stringify(order));
            
            dispatch({ type: SET_ORDER, payload: order });
        } catch (error) {
            router.push('/cart');
            console.log(error);
        }
    };

    const reset = () => {
        dispatch({ type: RESET });
    };

    return (
        <CheckoutDispatchContext.Provider
            value={{
                generateToken,
                setShippingMethod,
                setTaxZone,
                captureCheckout,
                reset,
            }}
        >
            <CheckoutStateContext.Provider value={state}>
                {children}
            </CheckoutStateContext.Provider>
        </CheckoutDispatchContext.Provider>
    );
};

export const useCheckoutState = () => useContext(CheckoutStateContext);
export const useCheckoutDispatch = () => useContext(CheckoutDispatchContext);