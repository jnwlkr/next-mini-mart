import { createContext, useReducer, useContext } from 'react';
import commerce from '../lib/commerce';
import { useRouter } from 'next/router';

const CheckoutStateContext = createContext();
const CheckoutDispatchContext = createContext();

const SET_CHECKOUT = 'SET_CHECKOUT';
const SET_LIVE = 'SET_LIVE';
const SET_ERROR = 'SET_ERROR';
const SET_ORDER = 'SET_ORDER';
const RESET = 'RESET';

const initialState = {
    error: null,
    live: {},
    order: null,
};

const reducer = (state, action) => {
    switch (action.type) {
        case SET_CHECKOUT:
            return { ...state, ...action.payload };
        case SET_LIVE: 
            return { ...state, live: { ...state.live, ...action.payload } };
        case SET_ORDER: 
            return { ...state, order: action.payload };
        case SET_ERROR:
            return { ...state, error: action.payload };
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
            console.log(err);
        }
    };

    const setShippingMethod = async (shipping_option_id, country, region) => {
        try {
            const { live } = await commerce.checkout.checkShippingOption(state.id, {
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
            const { live } = await commerce.checkout.setTaxZone(state.id, {
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
            const order = await commerce.checkout.capture(state.id, orderData);
            //window.sessionStorage.setItem('order', JSON.stringify(order));
            
            dispatch({ type: SET_ORDER, payload: order });
        } catch (error) {
            console.log(error);
        }
    };

    const setError = (payload) => {
        dispatch({ type: SET_ERROR, payload });
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
                setError,
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