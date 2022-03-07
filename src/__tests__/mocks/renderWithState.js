import React from "react";
import { render } from "@testing-library/react";
import { createStore } from "redux";
import { Provider } from "react-redux";
import { BrowserRouter } from 'react-router-dom';
import rootReducer from "../../core/reducers";

const renderWithState = (
  Component,
  { initialState, ...renderOptions } = {}
) => {
  const store = createStore(rootReducer, initialState);
  const Wrapper = ({ children }) => (
    <Provider store={store}>
      <BrowserRouter>{children}</BrowserRouter>
    </Provider>
  );

  return render(<Component/>, { wrapper: Wrapper, ...renderOptions });
};

export default renderWithState;