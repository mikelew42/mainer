;(function(){
	var utils = window.utils = window.utils || {};

	if (jQuery){
		jQuery.fn.clickOff = function(cb){
			this.each(function(){
				var $self = this;
				jQuery(document).click(function(e){
					if (!jQuery(e.target).closest($self).length)
						cb();
				});
			});
		};
	}
})();