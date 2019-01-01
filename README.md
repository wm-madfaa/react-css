# react-css 

Use the power of ES6 and CSS to style your react apps without stress

## Getting Started

react-CSS allows you to write actual CSS code to style your components. It also removes the mapping between components and styles – simply it is the alternative to the styled-components if you searching for a mini package do the same job that the styled-compoents does.

### Installing

npm
```
npm i react-css
```
yarn
```
yarn add  react-css
```
github
```
git clone https://github.com/wm-madfaa/react-css.git
```

or you can copy and pest it in your project as a normal component!

```jsx
import  React, { createContext, Fragment } from  "react";
import  PropTypes  from  "prop-types";
import { createPortal } from  "react-dom";
const { Provider, Consumer } =  createContext({ theme: {} });

const  Theme  = ({ value  = {theme:  {}},  children }) => (
	<Provider  value={value}>{children}</Provider>
);

const  Styled  =  props  => {
	const { css, children, ...rest } =  props;
	const  hashPrefix  =  Math.random().toString(32).slice(-8);

	return (

		<Fragment>

			<Consumer>

				{themes  =>

					createPortal(

					<style  type="text/css">

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

Styled.propTypes  = {
css:  PropTypes.func.isRequired,
children:  PropTypes.func.isRequired
};
export { Styled  as  default, Theme };
```

## Getting Started

### Adapting based on props

use Es6 (template literals) to include js code within the css code.

```jsx
import Styled from 'Styled';

const css = (prefix,props) =>`
	componentName-${prefix}{
		color: ${props.color}
	}
`
function Component(props){
	return(
		<Styled css={css} color={props.color}>
			{prefix => 
				<div className={`componentName-${prefix}`}>
					Lorem ipsum dolor sit amet
				</div>
			}
		</Styled>
	)
}
```

### Extending Styles

To easily make a new component that inherits the styling of another.
```jsx
import Styled from 'Styled';

const css_1 = (prefix,props) =>`
	text-color-${prefix}{
		color: ${props.color}
	}
`

function Component_1(props){
	return(
		<Styled css={css_1} color={props.color}>
			{prefix => 
				<div className={`css_1-${prefix}`}>
					Lorem ipsum dolor sit amet
				</div>
			}
		</Styled>
	)
}

const css_2 = (prefix,props) =>`
	background-color-${prefix}{
		background: ${props.background}
	}
	${css_1(prefix,props)}
`

function Component_2(props){
	return(
		<Styled css={css_1} color={props.color} background={props.background}>
			{prefix => 
				<div className={`css_2-${prefix}`}>
					Lorem ipsum dolor sit amet
				</div>
			}
		</Styled>
	)
}
```

### Theming
react-css  has full theming support by exporting a <Theme> wrapper component. This component provides a theme to all React components underneath itself via the context API. In the render tree all styled-components will have access to the provided theme, even when they are multiple levels deep.

```jsx
import Styled, {Theme} from 'Styled';

const css_1 = (prefix,props, theme) =>`
	text-color-${prefix}{
		color: ${props.color};
		font-size: ${theme.fontSize}
	}
`

function Component_1(props){
	return(
		<Styled css={css_1} color={props.color}>
			{prefix => 
				<div className={`css_1-${prefix}`}>
					Lorem ipsum dolor sit amet
				</div>
			}
		</Styled>
	)
}

const css_2 = (prefix,props, theme) =>`
	background-color-${prefix}{
		background: ${props.background}
		font-size: ${theme.fontSize}
	}
	${css_1(prefix,props, theme)}
`

function Component_2(props){
	return(
		<Styled css={css_1} color={props.color} background={props.background}>
			{prefix => 
				<div className={`css_2-${prefix}`}>
					Lorem ipsum dolor sit amet
				</div>
			}
		</Styled>
	)
}

function Root (props){
	return (
		<Theme value={{theme: {
			fontSize: '14px'
		}}}>
			<Component_1 />
			<Component_2 />
		</Theme>
	)
}
```

## Authors

* **Wasim Almadfaa**  
***email***:  wm.almadfaa@gmail.com

## License

This project is licensed under the GNU General Public License - see the [LICENSE.md](https://github.com/wm-madfaa/react-css/blob/master/LICENSE) file for details
