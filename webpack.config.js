const path = require('path');

// module.exports = {
//   entry: './client.js',
//   mode: process.env.NODE_ENV || 'development',
//   output: {
//     path: path.resolve(__dirname, 'build'),
//     filename: 'bundle.js',
//     publicPath: '/',
//   },
//   module: {
//     rules: [
//       {
//         test: /\.js$/,
//         exclude: /node_modules/,
//         loader: 'babel-loader',
//       },
//     ],
//   },
// };

const clientConfig = {
	entry: './client.js',
	mode: process.env.NODE_ENV || 'development',
	output: {
		path: path.resolve(__dirname, 'build'),
		filename: 'bundle.js',
		publicPath: '/',
	},
	module: {
		rules: [
			{
				test: /\.js$/,
				exclude: /node_modules/,
				loader: 'babel-loader',
			},
		],
	},
};

const serverConfig = {
	entry: './server.js',
	mode: process.env.NODE_ENV || 'development',
	output: {
		path: path.resolve(__dirname, 'dist'),
		filename: 'server.js',
		libraryTarget: 'commonjs2',
	},
	target: 'node',
	module: {
		rules: [
			{
				test: /\.js$/,
				exclude: /node_modules/,
				loader: 'babel-loader',
			},
		],
	},
};

module.exports = [clientConfig, serverConfig];
