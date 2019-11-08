const path = require('path');
const webpack = require('webpack');
const merge = require('webpack-merge');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const baseWebpackConfig = require('./webpack.base.conf');
const config = require('./config');

module.exports = merge(baseWebpackConfig, {
	mode: 'development',
	cache: true,
	output: {
		chunkFilename: 'js/[name].js',
		publicPath: config.dev.assetsPublicPath,
	},
	devServer: {
		inline: true,
		host: config.dev.host,
		port: config.dev.port,
		contentBase: [
			path.join(__dirname, '../dist'),
			path.join(__dirname, '../public'),
			path.join(__dirname, '../static'),
		],
		open: config.dev.autoOpenBrowser,
		proxy: config.dev.proxyTable || {},
		hot: true,
		historyApiFallback: true,
		disableHostCheck: true,
	},
	devtool: config.dev.devtool,
	plugins: [
		new webpack.HotModuleReplacementPlugin(),
		new webpack.NamedModulesPlugin(),
		new HtmlWebpackPlugin({
			filename: 'index.html',
			template: path.resolve(__dirname, '../src/index.html'),
			inject: true,
			chunksSortMode: 'none',
		}),
	],
	optimization: {
		minimize: false,
	},
});
