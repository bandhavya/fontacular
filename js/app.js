var appModule = angular.module('QuickFont', ['ngRoute']);

appModule.config(function($routeProvider) {
	$routeProvider
		.when('/', {
			templateUrl: '../fonts.html'
		})
		.otherwise({
			redirectTo: '/'
		});
});

appModule.controller('FontsListController', function($scope, $http) {
	var _apiKey = "AIzaSyCqsNTG87ntB6ijGZXY8QQsaf96gj3uscA",
		_url = "https://www.googleapis.com/webfonts/v1/webfonts?key=" + _apiKey;

	/**
	 * Fetches the webfonts.json from google webfonts
	 * ... simplifies it and updates the fontsList array
	 */
	$scope.getFontsList = function() {
		$http.get(_url).then(function(response) {
			$scope.simplifiedList = $scope.getSimplifiedList(response.data.items);
			$scope.fontsList = $scope.simplifiedList[0];
		});
	}


	$scope.text_content = "A Brilliant Sample!";
	/**
	 * parses the webfonts.json received from
	 * google webfonts and converts it into array
	 * of Font class instances
	 * @param  {json} rawList webfonts.json fetched from google webfonts api.
	 * @return {array} array of Font instances
	 */
	$scope.getSimplifiedList = function(rawList) {
		var simpleList = [],
			sanserifItems = [],
			displayItems = [],
			serifItems = [],
			handwritingItems = [],
			monospaceItems = [];
		$scope.fontCategories = [];
		for (var i = 0, len = rawList.length; i < len; i++) {
			var font = new Font(rawList[i]);
			simpleList.push(font);
			switch (font.category) {

				case "sans-serif":
					sanserifItems.push(font);
					buildCategoryList(font.category);
					break;

				case "display":
					displayItems.push(font);
					buildCategoryList(font.category);
					break;

				case "serif":
					serifItems.push(font);
					buildCategoryList(font.category);
					break;

				case "handwriting":
					handwritingItems.push(font);
					buildCategoryList(font.category);
					break;

				case "monospace":
					monospaceItems.push(font);
					buildCategoryList(font.category);
					break;
			}
		}

		function buildCategoryList(category) {
			if ($scope.fontCategories.indexOf(category) < 0) $scope.fontCategories.push(category);
		}

		// return simpleList;
		var mylistArray = [];
		mylistArray.push(simpleList, sanserifItems, displayItems, serifItems, handwritingItems, monospaceItems);
		return mylistArray;
	}

	$scope.getFontsList();
});