// module.exports = {
//   presets: ['module:@react-native/babel-preset'],
// };

module.exports = function (api) {
	api.cache(true);
  	return {
		presets: ["module:@react-native/babel-preset"],
		plugins: ['nativewind/babel'],
	};
};