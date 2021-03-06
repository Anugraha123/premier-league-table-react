const path = require('path');
module.exports = {
	// define entry file and output
	devtool: 'inline-source-map',
	entry: './src/index.js',
	output: {
		path: path.resolve('dist'),
		filename: 'main.js'
	},
	// define babel loader
	module: {
		rules: [
			{
				test: /\.jsx?$/,
				loader: 'babel-loader',
				exclude: /node_modules/
			},
			{
				test: /\.css$/i,
				use: [
					'style-loader',
					{
						loader: 'css-loader',
						options: {
							modules: true,
						},
					},
				],
				exclude: /node_modules/
			}
		]
	}
};
