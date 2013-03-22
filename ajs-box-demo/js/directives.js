'use strict';

/* Directives */

angular.module('DemoApp.directives', [])
.directive('ajsContainer', function () {
	var prefix = $.fx.cssPrefix;
	return {
		restrict:'E',
		link:function (scope, element, attrs) {
			element.addClass('container');
			var rule = {
				display: 'block',
				'min-height': '100%',
				position: 'relative'
			};
			if(attrs.perspective) {
				if (attrs.perspective.indexOf('px') != -1) {
					rule[prefix+'perspective'] = attrs.perspective;
				} else {
					rule[prefix+'perspective'] = attrs.perspective+'px';
				}
			} else {
				rule[prefix+'perspective'] = '1000px';	
			}
    		element.css(rule);
		}
	};
})
.directive('ajsStage', function () {
	var prefix = $.fx.cssPrefix;
	return {
		restrict:'E',
		link:function (scope, element, attrs) {
			element.addClass('stage');
			var rule = {
				width: '100%',
				height: '100%',
				position: 'absolute'
			};
			rule[prefix+'transform-style'] = 'preserve-3d';
    		var $body = $('body');
    		var ref = parseInt($body.height())/2;
    		var nref = -ref;
    		rule[prefix+'transform-origin'] = '50% 50% '+ref+'px';
    		element.css(rule);
    		angular.element(window).bind('resize', function(){
        		ref = parseInt($body.css('height'))/2;
        		rule[prefix+'transform-origin'] = '50% 50% '+ref+'px';
    			element.css(rule);
    		});
		}
	};
})
.directive('ajsBox', function () {
	var prefix = $.fx.cssPrefix;
	var fh =  parseInt($('body').css('height'));
	var ref = fh/2;
	var nref = -ref;
	// var leftFaceOriginRule = ref+'px'+' 50% '+nref+'px';
	// var rightFaceOriginRule = ref+'px'+' 50% '+nref+'px';
	var leftFaceOriginRule = '25% 50% ' +nref+'px';
	var rightFaceOriginRule = '75% 50% ' +nref+'px';
	var frontFaceOriginRule = '50% 50% '+nref+'px';
	
	function showTopFace(el, scale) {
	if (el.hasClass('showTop')) return
		if (el.hasClass('showLeft') || el.hasClass('showRight')) {
			var originRule;
			if(el.hasClass('showLeft')) {
				originRule = leftFaceOriginRule
			} else {
				originRule = rightFaceOriginRule
			}
			el.removeClass('showLeft showRight').addClass('showTop');
			var rule = {};
			rule[prefix+'transform'] = 'none';
			el.animate(rule, {
				duration: 400,
				complete: function() {
					rule[prefix+'transform-origin'] = originRule;
					rule[prefix+'transform'] = getScale3dRule(scale);
					el.animate(rule, {
						duration: 400,
						complete: function() {
							rule[prefix+'transform-origin'] = frontFaceOriginRule;
							rule[prefix+'transform'] = getScale3dRule(scale)+getRotate3dRule(0,-90);
							el.animate(rule, {
								duration: 400,
								complete: function() {
									rule[prefix+'transform'] = getRotate3dRule(0,-90);
									el.animate(rule);
								}
							});
						}
					});
				}
			});
			return
		}
		if (el.hasClass('showFront') || el.hasClass('showBottom') || el.hasClass('showRear')) {
			el.removeClass('showFront showBottom showRear').addClass('showTop');
			var rule = {};
			rule[prefix+'transform-origin'] = frontFaceOriginRule;
			el.css(rule);
			rule[prefix+'transform'] = getScale3dRule(scale);
			el.animate(rule, {
				duration: 400,
				complete: function() {
					rule[prefix+'transform'] = getScale3dRule(scale)+getRotate3dRule(0,-90);
					el.animate(rule, {
						duration: 400,
						complete: function() {
							rule[prefix+'transform'] = getRotate3dRule(0,-90);
							el.animate(rule);
						}
					});
				}
			});
		}
	}

	function showFrontFace(el, scale) {
		if(el.hasClass('showFront')) return
		if(el.hasClass('showLeft') || el.hasClass('showRight')) {
			var originRule;
			if(el.hasClass('showLeft')) {
				originRule = leftFaceOriginRule
			} else {
				originRule = rightFaceOriginRule
			}
			el.removeClass('showLeft showRight').addClass('showFront');
			var rule = {};
			rule[prefix+'transform'] = 'none';
			el.animate(rule, {
				duration: 400,
				complete: function() {
					rule[prefix+'transform-origin'] = originRule;
					el.css(rule);
				}
			});
			return
		}
		if(el.hasClass('showTop') || el.hasClass('showBottom') || el.hasClass('showRear')) {
			el.removeClass('showTop showBottom showRear').addClass('showFront');
			var rule = {};
			// rule[prefix+'transform'] = getScale3dRule(scale)+getRotate3dRule(0,-90);
			rule[prefix+'transform'] = getScale3dRule(scale);
			el.animate(rule, {
				duration: 400,
				complete: function() {
					rule[prefix+'transform'] = getScale3dRule(scale)+getRotate3dRule(0,0);
					el.animate(rule, {
						duration: 400,
						complete: function() {
							rule[prefix+'transform'] = 'none';
							el.animate(rule);
						}
					});
					
				}
			});
			return
		}
	}

	function showLeftFace(el,scale) {
		if(el.hasClass('showLeft')) return
		if(el.hasClass('showTop') || el.hasClass('showFront') || el.hasClass('showBottom') || el.hasClass('showRear')) {
			el.removeClass('showFront showTop showBottom showRear').addClass('showLeft');
			var rule = {};
			rule[prefix+'transform-origin'] = frontFaceOriginRule;
			el.css(rule);
			rule[prefix+'transform'] = getScale3dRule(scale)+getRotate3dRule(0,0);
			el.animate(rule, {
				duration: 400,
				complete: function() {
					rule[prefix+'transform'] = getScale3dRule(scale);
					el.animate(rule, {
						duration: 400,
						complete: function() {
							rule[prefix+'transform-origin'] = leftFaceOriginRule;
							el.css(rule);
							rule[prefix+'transform'] = getScale3dRule(scale)+getRotate3dRule(1,60);
							el.animate(rule);
						}
					});
				}
			});
			return
		}
		if(el.hasClass('showRight')) {
			el.removeClass('showRight').addClass('showLeft');
			var rule = {};
			rule[prefix+'transform-origin'] = rightFaceOriginRule;
			el.css(rule);
			rule[prefix+'transform'] = getScale3dRule(scale)+getRotate3dRule(0,0);
			el.animate(rule, {
				duration: 400,
				complete: function() {
					rule[prefix+'transform-origin'] = frontFaceOriginRule;
					rule[prefix+'transform'] = getScale3dRule(scale);
					el.animate(rule, {
						duration: 400,
						complete: function() {
							rule[prefix+'transform-origin'] = leftFaceOriginRule;
							el.css(rule);
							rule[prefix+'transform'] = getScale3dRule(scale)+getRotate3dRule(1,60);
							el.animate(rule);
						}
					});
				}
			});
			return
		}
	}
	function showRightFace(el,scale) {
		if(el.hasClass('showRight')) return
		if(el.hasClass('showTop') || el.hasClass('showFront') || el.hasClass('showBottom') || el.hasClass('showRear')) {
			el.removeClass('showFront showTop showBottom showRear').addClass('showRight');
			var rule = {};
			rule[prefix+'transform-origin'] = frontFaceOriginRule;
			el.css(rule);
			rule[prefix+'transform'] = getScale3dRule(scale)+getRotate3dRule(0,0);
			el.animate(rule, {
				duration: 400,
				complete: function() {
					rule[prefix+'transform'] = getScale3dRule(scale);
					el.animate(rule, {
						duration: 400,
						complete: function() {
							rule[prefix+'transform-origin'] = rightFaceOriginRule;
							el.css(rule);
							rule[prefix+'transform'] = getScale3dRule(scale)+getRotate3dRule(1,-60);
							el.animate(rule);
						}
					});
				}
			});
			return
		}
		if(el.hasClass('showLeft')) {
			el.removeClass('showLeft').addClass('showRight');
			var rule = {};
			rule[prefix+'transform'] = getScale3dRule(scale)+getRotate3dRule(0,0);
			el.animate(rule, {
				duration: 400,
				complete: function() {
					rule[prefix+'transform'] = getScale3dRule(scale);
					el.animate(rule, {
						duration: 400,
						complete: function() {
							rule[prefix+'transform-origin'] = rightFaceOriginRule;
							el.css(rule);
							rule[prefix+'transform'] = getScale3dRule(scale)+getRotate3dRule(1,-60);
							el.animate(rule);
						}
					});
				}
			});
			return
		}
	}
	function showBottomFace(el,scale) {
		if(el.hasClass('showBottom')) return
		if(el.hasClass('showFront') || el.hasClass('showTop') || el.hasClass('showRear')) {
			el.removeClass('showFront showTop showRear').addClass('showBottom');
			var rule = {};
			rule[prefix+'transform-origin'] = frontFaceOriginRule;
			el.css(rule);
			rule[prefix+'transform'] = getScale3dRule(scale);
			el.animate(rule, {
				duration: 400,
				complete: function() {
					rule[prefix+'transform'] = getScale3dRule(scale)+getRotate3dRule(0,90);
					el.animate(rule, {
						duration: 400,
						complete: function() {
							rule[prefix+'transform'] = getRotate3dRule(0,90);
							el.animate(rule);
						}
					});
				}
			});
		}
		if(el.hasClass('showLeft') || el.hasClass('showRight')) {
			var originRule;
			if(el.hasClass('showLeft')) {
				originRule = leftFaceOriginRule
			} else {
				originRule = rightFaceOriginRule
			}
			el.removeClass('showLeft showRight').addClass('showBottom');
			var rule = {};
			rule[prefix+'transform-origin'] = originRule;
			rule[prefix+'transform'] = 'none';
			el.animate(rule, {
				duration: 400,
				complete: function() {
					rule[prefix+'transform-origin'] = frontFaceOriginRule;
					el.css(rule);
					rule[prefix+'transform'] = getScale3dRule(scale)+getRotate3dRule(0,90);
					el.animate(rule, {
						duration: 400,
						complete: function() {
							rule[prefix+'transform'] = getRotate3dRule(0,90);
							el.animate(rule);
						}
					});
				}
			});
			return
		}
	}
	function showRearFace(el,scale) {
		if(el.hasClass('showRear')) return
		if(el.hasClass('showFront') || el.hasClass('showTop') || el.hasClass('showBottom')) {
			el.removeClass('showFront showTop showBottom').addClass('showRear');
			var rule = {};
			rule[prefix+'transform-origin'] = frontFaceOriginRule;
			el.css(rule);
			rule[prefix+'transform'] = getScale3dRule(scale);
			el.animate(rule, {
				duration: 400,
				complete: function() {
					rule[prefix+'transform'] = getScale3dRule(scale)+getRotate3dRule(0,180);
					el.animate(rule, {
						duration: 400,
						complete: function() {
							rule[prefix+'transform'] = getRotate3dRule(0,180);
							el.animate(rule);
						}
					});
				}
			});
		}
		if(el.hasClass('showLeft') || el.hasClass('showRight')) {
			var originRule;
			if(el.hasClass('showLeft')) {
				originRule = leftFaceOriginRule
			} else {
				originRule = rightFaceOriginRule
			}
			el.removeClass('showLeft showRight').addClass('showRear');
			var rule = {};
			rule[prefix+'transform-origin'] = originRule;
			rule[prefix+'transform'] = 'none';
			el.animate(rule, {
				duration: 400,
				complete: function() {
					rule[prefix+'transform-origin'] = frontFaceOriginRule;
					el.css(rule);
					rule[prefix+'transform'] = getScale3dRule(scale)+getRotate3dRule(0,90);
					el.animate(rule, {
						duration: 400,
						complete: function() {
							rule[prefix+'transform'] = getRotate3dRule(0,90);
							el.animate(rule);
						}
					});
				}
			});
			return
		}
	}
	return {
		restrict: 'E',
		controller: BoxCtrl,
		link: function (scope, element, attrs) {
			element.addClass('box');
			var rule = {
				width: '100%',
				height: '100%',
				position: 'absolute'
			};
			rule[prefix+'transform-style'] = 'preserve-3d';
			element.css(rule);
			var fh =  parseInt($('body').css('height'));
			var $box = $('.box');
			var scaleFactor = getScaleFactor($box, fh);
			angular.element(window).bind('resize', function(){
				fh = parseInt($('body').css('height'));
				ref = fh/2;
				nref = -ref;
				leftFaceOriginRule = ref+'px'+' 50% '+nref+'px';
				frontFaceOriginRule = '50% 50% '+nref+'px';
				scaleFactor = getScaleFactor($box, fh);
			});
			scope.$watch('match', function(val) {
				if(val == 1) {
					scope.match = '';
					showTopFace($box, scaleFactor);
				}
				if(val == 2) {
					scope.match = '';
					showFrontFace($box, scaleFactor);
				}
				if(val == 3) {
					scope.match = '';
					showBottomFace($box, scaleFactor);
				}
				if(val == 4) {
					scope.match = '';
					showRearFace($box, scaleFactor);
				}
				if(val == 5) {
					scope.match = '';
					showLeftFace($box, scaleFactor);
				}
				if(val == 6) {
					scope.match = '';
					showRightFace($box, scaleFactor);
				}
            }, true);
		}
	};
})
.directive('ajsTop', function () {
	return {
		restrict:'E',
		link:function (scope, element, attrs) {
			element.addClass('face top');
   			var ref =  parseInt($('body').css('height'))/2;
   			var nref = -ref;
			var rule = {
				width: '100%',
				height: '100%',
				position: 'absolute',
				top: nref+'px'
			};
			var prefix = $.fx.cssPrefix;
			rule[prefix+'transform'] = 'rotate3d(1,0,0,90deg) translate3d(0,-50%,0)';
			element.css(rule);
			angular.element(window).bind('resize', function(){
				ref = parseInt($('body').css('height'))/2;
				nref = -ref;
        		rule.top = nref+'px';
    			element.css(rule);
			});
		}
	};
})
.directive('ajsFront', function () {
	return {
		restrict:'E',
		link:function (scope, element, attrs) {
			element.addClass('face front');
			var rule = {
				width: '100%',
				height: '100%',
				position: 'absolute'
			};
			element.css(rule);
		}
	};
})
.directive('ajsLeft', function () {
	return {
		restrict:'E',
		link:function (scope, element, attrs) {
			element.addClass('face left');
			// $box.find('.left').css('width', frontHeight).css('left', nref);
   			var fh =  parseInt($('body').css('height'));
   			var nref = -fh/2;
			var rule = {
				width: fh+'px',
				height: '100%',
				position: 'absolute',
				left: nref+'px'
			};
			var prefix = $.fx.cssPrefix;
			rule[prefix+'transform'] = 'rotate3d(0,1,0,-90deg) translate3d(-50%,0,0)';
			element.css(rule);
			angular.element(window).bind('resize', function(){
				fh =  parseInt($('body').css('height'));
   				nref = -fh/2;
        		rule.width = fh+'px';
        		rule.left = nref+'px';
    			element.css(rule);
			});
		}
	};
})
.directive('ajsRight', function () {
	return {
		restrict:'E',
		link:function (scope, element, attrs) {
			element.addClass('face right');
   			var fh =  parseInt($('body').css('height'));
   			var nref = -fh/2;
			var rule = {
				width: fh+'px',
				height: '100%',
				position: 'absolute',
				right: nref+'px'
			};
			var prefix = $.fx.cssPrefix;
			rule[prefix+'transform'] = 'rotate3d(0,1,0,90deg) translate3d(50%,0,0)';
			element.css(rule);
			angular.element(window).bind('resize', function(){
				fh =  parseInt($('body').css('height'));
   				nref = -fh/2;
        		rule.width = fh+'px';
        		rule.right = nref+'px';
    			element.css(rule);
			});
		}
	};
})
.directive('ajsBottom', function () {
	return {
		restrict:'E',
		link:function (scope, element, attrs) {
			element.addClass('face bottom');
   			var ref =  parseInt($('body').css('height'))/2;
   			// var nref = -ref;
			var rule = {
				width: '100%',
				height: '100%',
				position: 'absolute',
				top: ref+'px'
			};
			var prefix = $.fx.cssPrefix;
			rule[prefix+'transform'] = 'rotate3d(1,0,0,-90deg) translate3d(0,50%,0)';
			element.css(rule);
			angular.element(window).bind('resize', function(){
				ref = parseInt($('body').css('height'))/2;
				// nref = -ref;
        		rule.top = ref+'px';
    			element.css(rule);
			});
		}
	};
})
.directive('ajsRear', function () {
	return {
		restrict:'E',
		link:function (scope, element, attrs) {
			element.addClass('face rear');
   			var ref =  parseInt($('body').css('height'))/2;
			var rule = {
				width: '100%',
				height: '100%',
				position: 'absolute',
				top: ref+'px'
			};
			var prefix = $.fx.cssPrefix;
			var fh =  parseInt($('body').css('height'));
			rule[prefix+'transform'] = 'rotate3d(1,0,0,-180deg) translate3d(0,50%,'+fh+'px)';
			element.css(rule);
			angular.element(window).bind('resize', function(){
				var fh =  parseInt($('body').css('height'));
				rule[prefix+'transform'] = 'rotate3d(1,0,0,-180deg) translate3d(0,50%,'+fh+'px)';
				ref = fh/2;
        		rule.top = ref+'px';
    			element.css(rule);
			});
		}
	};
});

function getScaleFactor(box,fh) {
	var ref = fh/2;
	var leftFaceOriginRule = getLeftFaceOriginRule(ref);
	var frontFaceOriginRule = getFrontFaceOriginRule(ref);
	var rule = {};
	rule.opacity = 0;
	var prefix = $.fx.cssPrefix;
	var currentValue = box.css(prefix+'transform');
	rule[prefix+'transform-origin'] = leftFaceOriginRule;
	rule[prefix+'transform'] = getRotate3dRule(1,60)
	box.css(rule);
	var rotatedLeftFaceHeight = $('.box .left').height();
	var scaleFactor = fh/rotatedLeftFaceHeight;
	rule.opacity = 1;
	rule[prefix+'transform-origin'] = frontFaceOriginRule;
	rule[prefix+'transform'] = currentValue;
	box.css(rule);
	return scaleFactor
}

function getLeftFaceOriginRule(ref) {
	var nref = -ref;
	return ref+'px'+' 50% '+nref+'px';
}

function getFrontFaceOriginRule(ref) {
	var nref = -ref;
	return '50% 50% '+nref+'px';
}

function getScale3dRule(value) {
	return 'scale3d('+value+','+value+','+value+')'
}

function getRotate3dRule(axis, value) {
	var vectors = ['1, 0, 0, ', '0, 1, 0, ', '0, 0, 1, '];
	return 'rotate3d('+vectors[axis]+value+'deg)';
}