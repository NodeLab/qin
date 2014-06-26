/**
 * Date: 14-3-18
 * Author: Jerry
 * Time: 下午7:44
 */

(function ($) {
    var Popup = function () {
        this.init();
    };
    $.extend(Popup.prototype, {
        init: function () {
            var _this = this;
            _this.$el = $("<div class='popup-overlay'></div>");
            _this.$mask = $("<div class='popup-mask'></div>").on("click", function () {
                return false;
            });
            _this.$popupWindow = $("<div class='popup-window'></div>");
            this.closecallback = null;
        },
        setPopup: function (options, open) {
            var _this = this, defaults = {
                width: 'auto',
                height: 'auto',
                className: "",
                domString: "",
                closecallback: null,
                closeable: true
            }, o;
            o = $.extend(defaults, options);
            _this.$el.remove();
            _this.closed = true;
            _this.width = o.width;
            _this.height = o.height;
            _this.className = o.className;
            _this.domString = o.domString;
            _this.closeable = o.closeable;
            _this.closecallback = o.closecallback;
            if (open) {
                _this.open();
            }
        },
        _setSize: function () {
            this.$popupWindow.css({
                width: this.width,
                height: this.height
            });
            this.$popupWindow.css({
                marginLeft: -this.$popupWindow.width() / 2,
                marginTop: -this.$popupWindow.height() / 2 - 20
            });
        },
        open: function () {
            var _this = this;
            if (_this.closed) {
                _this.closed = false;
                _this.$popupWindow.empty();
                _this.$el.empty();
                if (_this.closeable) {
                    $("<a href='javascript:void(0);' title='关闭' class='popup-close'></a>").one("click",function () {

                        _this.closecallback && _this.closecallback.call(this);

                        _this.close();
                        return false;
                    }).appendTo(_this.$popupWindow);
                }
                $(_this.domString).appendTo(_this.$popupWindow);
                _this.$popupWindow.appendTo(_this.$el);
                _this.$mask.appendTo(this.$el);
                _this.$el.appendTo(document.body);
                _this._setSize();
            }
        },
        close: function () {
            if (!this.closed) {
                this.$el.remove();
                this.closed = true;
            }
        }
    });
    $.popup = new Popup();
})(jQuery);
