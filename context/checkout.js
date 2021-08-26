import { createContext, useReducer, useContext } from 'react';
import commerce from '../lib/commerce';

const CheckoutStateContext = createContext();
const CheckoutDispatchContext = createContext();

const SET_CHECKOUT = 'SET_CHECKOUT';
const SET_LIVE = 'SET_LIVE';
const SET_ERROR = 'SET_ERROR';
const SET_STEP = 'SET_STEP';
const RESET = 'RESET';

const initialState = {
    step: 'shipping',
    error: null,
};

const reducer = (state, action) => {
    switch (action.type) {
        case SET_CHECKOUT:
            return { ...state, ...action.payload };
        case SET_LIVE:
            return { ...state, live: { ...state.live, ...action.payload } };
        case SET_ERROR: 
            return { ...state, error: action.payload };
        case SET_STEP: 
            return {
                ...state,
                step: action.payload,
            }
        case RESET:
            return initialState;
        default:
            throw new Error(`Uh oh... ${action.type}`);
    }
}

export const CheckoutProvider = ({ children }) => {
    const [state, dispatch] = useReducer(reducer, initialState);

    const generateToken = async (cartId) => {
        if (!cartId) return;

        try {
            const payload = await commerce.checkout.generateToken(cartId, { type: 'cart' });
            dispatch({ type: SET_CHECKOUT, payload });
        } catch (error) {
            console.log('Lol ' + error);
        }
    };

    const setShippingMethod = async (shipping_option_id, country, region) => {
        try {
            const { live } = await commerce.checkout.checkShippingOption(state.id, {
                shipping_option_id,
                country,
                ...CheckoutDispatchContext(region && { region }),
            });
            dispatch({ type: SET_LIVE, payload: live });
        } catch (error) {
            console.log('Lol' + error);
        }
    };

    const setStep = (step) => {
        dispatch({ type: SET_CURRENT_STEP, payload: step });
    };

    const setNextStep = (step) => {
        switch (step) {
            case 'shipping':
                return 'billing';
            case 'billing':
                return 'confirmation';
            default:
                return 'shipping';
        }
    };

    const capture = (values) => commerce.checkout.capture(state.id, values);

    const setError = (payload) => dispatch({ type: SET_ERROR, payload });

    const reset = () => dispatch({ type: RESET });

    return (
        <CheckoutDispatchContext.Provider
            value={{
                generateToken,
                setShippingMethod,
                setStep,
                setNextStep,
                capture,
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