angular.module("EvalApp").directive("navi", function ($window){
	return {
		restrict: 'A',
		link: function( scope, element, attr ){
			var text = attr.navi;
			var hintElem = angular.element("<span class='hint'></span>");
			var hintChild = angular.element("<p>" + text + "</p>");
			hintElem.append(hintChild);
			element.parent().append(hintElem);

			element.bind("focus", function (){
				var elemRect = element[0].getBoundingClientRect();
				hintElem.css("display", "block");
				hintElem.css("left", elemRect.right + "px");
				hintElem.css("top", (elemRect.top + window.pageYOffset + 2) + "px");
			});
			element.bind("blur", function (){
				hintElem.css("display", "none");
			});
		}
	};
});
