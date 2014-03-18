angular.module("EvalApp").directive("navi", function ($window){
	return {
		restrict: 'A',
		link: function( scope, element, attr ){
			var text = attr.navi;
			var hintElem = angular.element("<span class='hint'></span>");
			var hintChild = angular.element("<p>" + text + "</p><span class='hint-pointer'&nbsp;></span>");
			hintElem.append(hintChild);
			element.parent().append(hintElem);

			element.bind("focus", function (){
				hintElem.css("display", "block");

				var elemRect = element[0].getBoundingClientRect();

				hintElem.css("left", elemRect.right + "px");
				hintElem.css("top", (elemRect.top + window.pageYOffset) + "px");
			});
			element.bind("blur", function (){
				hintElem.css("display", "none");
			});
		}
	};
});