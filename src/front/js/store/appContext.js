import React, { useState, useEffect } from "react";
import getState from "./flux.js";

// Don't change, here is where we initialize our context, by default it's just going to be null.
export const Context = React.createContext(null);

const injectContext = PassedComponent => {
    const StoreWrapper = props => {
        const [state, setState] = useState({
            store: {},
            actions: {}
        });

        useEffect(() => {
            setState(prevState => {
                const state = getState({
                    getStore: () => prevState.store,
                    getActions: () => prevState.actions,
                    setStore: updatedStore =>
                        setState({
                            store: Object.assign(prevState.store, updatedStore),
                            actions: { ...prevState.actions }
                        })
                });
                return state;
            });
        }, []);

        return (
            <Context.Provider value={state}>
                <PassedComponent {...props} />
            </Context.Provider>
        );
    };
    return StoreWrapper;
};

export default injectContext;