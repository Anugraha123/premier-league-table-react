import React from 'react';
import ReactDOM from 'react-dom';
import App from './app';
import './index.css';

String.prototype.capitalize = function() {
	return this.charAt(0).toUpperCase() + this.slice(1)
}

ReactDOM.render(
	<React.StrictMode>
		<App />
	</React.StrictMode>,
	document.getElementById('root')
);
