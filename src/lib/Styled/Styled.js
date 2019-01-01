import React, { createContext, Fragment } from "react";
import PropTypes from "prop-types";
import { createPortal } from "react-dom";

const { Provider, Consumer } = createContext({
  theme: {}
});

const Theme = ({ value = {}, children }) => (
  <Provider value={value}>{children} </Provider>
);

const Styled = props => {
  const { css, children, ...rest } = props;

  const prefix = () =>
    Math.random()
      .toString(32)
      .slice(-8);

  const hashPrefix = prefix();
  return (
    <Fragment>
      <Consumer>
        {themes =>
          createPortal(
            <style type="text/css">
              {props.css(hashPrefix, rest, themes.theme)}
            </style>,
            document.head
          )
        }
      </Consumer>
      {children(hashPrefix)}
    </Fragment>
  );
};

Styled.propTypes = {
  css: PropTypes.func.isRequired,
  children: PropTypes.func.isRequired
};

export { Styled as default, Theme };
