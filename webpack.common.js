const path = require('path');
const webpack = require('webpack');
const CleanWebpackPlugin = require('clean-webpack-plugin');
const ExtractTextPlugin = require('extract-text-webpack-plugin');

module.exports = {
  entry: {
  	ahbase: './src/modules/AHBase.js',
  	general: './src/modules/common.js',
  	MgmtContentSection: './src/pages/MgmtContentSection.js',
  	MgmtContentName: './src/pages/MgmtContentName.js',
    SiteAlgo: './src/pages/SiteAlgo.js'
  },

  plugins: [
		new CleanWebpackPlugin(['build']),
		new webpack.ProvidePlugin({
			$: 'jquery',
			jQuery: 'jquery',
			'window.jQuery': 'jquery',
			Popper: ['popper.js', 'default']
		}),
		new ExtractTextPlugin('css/[name].css')
	],

  output: {
    filename: 'js/[name].js',
    publicPath: '/',
    path: path.resolve(__dirname, 'build')
  },

	module: {
		rules: [
			{ test: /\.js$/, exclude: /node_modules/, loader: "babel-loader" },
			{
				test: /\.css$/,
				use: ExtractTextPlugin.extract({
        	fallback: "style-loader",
        	use: "css-loader"
        })
      },
      { test: /\.(woff|woff2|eot|ttf|otf)$/, use: ['file-loader?name=css/font/[name].[ext]'] },
      { test: /\.(png|svg|jpg|gif)$/, use: ['file-loader?name=css/img/[name].[ext]'] }
		]
	}
};
