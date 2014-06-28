/**
 * Created by Jerry on 14-2-6.
 */
define(function(require,exports,moudles) {
     return function(jquery){
        (function ( $ ) {
    var RollingList = function ( o ) {
        this.init( o );
    };
    $.extend( RollingList.prototype, {
        init    : function ( o ) {
            var options = this.options = o;
            this.initTime = +new Date();
            this.resize();

            switch (options.direction){
                case 'left':
                    this.scrollLeft = this.wrapperWidth;
                    this.scrollTop = 0;
                    options.$roller.css( {
                        width: this.rollerWidth,
                        overflow: "auto"
                    } );
                    break;
                default :   //top
                    this.scrollLeft = 0;
                    this.scrollTop = this.wrapperHeight;
                    break;
            }

            options.$wrapper.css( {
                overflow : "hidden"
            } );
            options.$roller.css( {
                position : "relative"
            } );
        },
        resize  : function () {
            switch (this.options.direction){
                case 'left':
                    var list = this.options.$roller.find('li'),
                        width = 0;

                    $.each(list, function(key, li){
                        width += $(li).outerWidth();
                    });

                    this.wrapperWidth = this.options.$wrapper.width();
                    this.wrapperHeight = this.options.$wrapper.height();
                    this.rollerWidth = width;
                    break;
                default :
                    this.wrapperWidth = this.options.$wrapper.width();
                    this.wrapperHeight = this.options.$wrapper.height();
                    this.rollerHeight = this.options.$roller.height();
                    break;
            }
        },
        refresh : function () {
            var now = +new Date(),
                timeElapsed = now - this.initTime;
            if ( timeElapsed - 50 >= 0 ) {
                this.initTime = now;

                switch (this.options.direction){
                    case 'left':
                        this.scrollLeft -= 1;
                        this.options.$roller.css( {
                            left : this.scrollLeft
                        } );
                        if ( this.scrollLeft < -this.rollerWidth ) {
                            this.scrollLeft = this.wrapperWidth;
                        }
                        break;
                    default :
                        this.scrollTop -= 1;
                        this.options.$roller.css( {
                            top : this.scrollTop
                        } );
                        if ( this.scrollTop < -this.rollerHeight ) {
                            this.scrollTop = this.wrapperHeight;
                        }
                        break;
                }
            }
        }
    } );
    $.RollingListManager = {
        rollingList  : [],
        registerList : function ( rollingList ) {
            this.rollingList.push( rollingList );
            var _this = this;
            if ( !this.nIntervalId ) {
                this.nIntervalId = window.setInterval( function () {
                    _this.refreshList();
                }, 25 );
            }
        },
        refreshList  : function () {
            for ( var i = 0; i < this.rollingList.length; i++ ) {
                this.rollingList[i].refresh();
            }
        }
    };
    $.fn.extend( {
        rollingList : function ( o ) {
            return this.each( function () {
                var defaults = {
                    $el       : $( this ),
                    $wrapper  : $( this ).find( ".wrapper" ),
                    $roller   : $( this ).find( ".roller" ),
                    direction : "top",
                    autoPlay  : true
                }, options, rollingList;
                options = $.extend( defaults, o );
                rollingList = new RollingList( options );
                $(this).data('rollingList', rollingList);
                $.RollingListManager.registerList( rollingList );
            } );
        }
    } )
})( jQuery );

(function($){
    $.fn.prizeRoller = function(option){
        var scroll=$(this) ,roller = scroll.find('.roller');

        $.ajax({
            url: '/prize/ajax/recordList',
            data: {
                groupId: 168,
                max: 9
            },
            success: function (response) {
                roller.empty();
                if (response.code == 200) {
                    var luckBeggars = response.msg.recordList;
                    for (var i = 0; i < luckBeggars.length; i++) {
                        $('<li></li>').text(luckBeggars[i].userNickName + '中了' + luckBeggars[i].prizeName).appendTo(roller);
                    }

                    scroll.rollingList(option);
                }

            }
        });
    }
})(jQuery);
     }
})
