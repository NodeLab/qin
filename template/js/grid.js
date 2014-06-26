/**
 * Created by Jerry on 14-2-6.
 */

define(function(require,exports,moudles) {
    return function(jquery){

(function ($) {
    
    var Grid = function (options) {
            this.init(options);
        },
        fn = Grid.prototype;

        
    fn.init = function (options) {
        var _this = this;
        var opt = $.extend({}, options);
        this.gap = opt.gap || 5;
        this.gridSize = opt.gridSize || 90;
        this.imgGroup = opt.imgGroup;
        this.imgPath = opt.imgPath;

        this.drawState = false;
        this.prizeImage = '';

        this.element = $('#grid').css({
            position: 'relative',
            width: _this.gridSize * 3 + _this.gap * 2,
            height: _this.gridSize * 3 + _this.gap * 2
        });

        this.cells = (function () {
            var x, y, cells = [];
            for (x = 0; x < 3; x++) {
                for (y = 0; y < 3; y++) {
                    var cell = $('<div class="cell"></div>').attr('id', 'cell-' + x + '-' + y),
                        front = $('<div class="front"></div>').css({
                            transform: 'rotateY(0)'
                        }).appendTo(cell),
                        back = $('<div class="back"></div>').css({
                            transform: 'rotateY(180deg)'
                        }).appendTo(cell);
                        _href = $("<a href=' ' target='_blank'></a>")
                        a =  _href.appendTo(back);

                        
                    $('<img>').attr('src', _this.imgPath + 'back.png').appendTo(back.find('a'));
                    $('<img>').attr('src', _this.imgPath + 'front.png').appendTo(front);

                    cell.appendTo(_this.element);

                    cells.push({
                        $cell: cell,
                        $front: front,
                        $back: back
                    });
                }
            }
            return cells;
        })();
        this.setSize();
        this.bindClickGrid();

        $(window).on('dragstart', function () {
            return false;
        });

        this.initPrizeView();
    };

    fn.listen = function (eventName, func) {
        $(window).on(eventName, func);
    };

    fn.trigger = function (eventName, data) {
        $(window).trigger(eventName, data);
    };
    fn.bindCustomEvents = function (startCallback, endCallback) {
        var _this = this;
        this.listen('gridReady', function () {
            _this.drawState = false;
            _this.initGuessView();

            setTimeout(function () {
                _this.trigger('gridMoveCenter');
            }, 700);
        });
        this.listen('gridMoveCenter', function () {
            _this.moveCenter();
        });
        this.listen('moveCenterEnd', function () {
            _this.moveBack();
        });
        this.listen('gridStart', function () {
            _this.drawState = true;
            startCallback && startCallback.call(_this, arguments);
        });
        this.listen('gridEnd', function () {
            _this.drawState = false;
            endCallback && endCallback.call(_this, arguments)
        });
    };
    fn.bindClickGrid = function () {
        var _this = this, i;

        for (i = 0; i < _this.cells.length; i++) {
            (function (index) {
                _this.cells[index].$cell.on('click', function () {
                    if (_this.drawState) {
                        _this.insertPicture(index, _this.prizeImage || 'miss-1');
                        _this.turn_in(index, function () {
                            _this.trigger('showWindow');
                        });
                        _this.trigger('gridEnd');
                    }
                });
            })(i);
        }
    };

    fn.turn_in = function (index, callback) {
        var _this = this,
            front = _this.cells[index].$front,
            back = _this.cells[index].$back;
        _this.cells[index].$cell.addClass('turn_in');

        if (!jQuery.support.leadingWhitespace) {
            front.animate({
                width: '0%'
            }, 500);
            back.animate({
                width: '100%'
            }, 500);
        }
        else {
            front.addClass('animating').css({
                transform: 'rotateY(180deg)'
            });
            back.addClass('animating').css({
                transform: 'rotateY(360deg)'
            });
        }
        setTimeout(function () {
            front.removeClass('animating');
            back.removeClass('animating');

            callback && callback.call(_this);
        }, 500);
    };
    fn.turn_out = function (index, callback) {
        var _this = this,
            front = _this.cells[index].$front,
            back = _this.cells[index].$back;
        _this.cells[index].$cell.removeClass('turn_in');

        if (!jQuery.support.leadingWhitespace) {
            front.animate({
                width: '100%'
            }, 500);
            back.animate({
                width: '0%'
            }, 500);
        }
        else {
            front.addClass('animating').css({
                transform: 'rotateY(0deg)'
            });
            back.addClass('animating').css({
                transform: 'rotateY(180deg)'
            });
        }
        setTimeout(function () {
            front.removeClass('animating');
            back.removeClass('animating');
            callback && callback.call(_this);
        }, 500);
    };

    fn.moveCenter = function () {
        var _this = this;

        function moveOne(index) {
            _this.cells[index].$cell.animate({
                left: _this.gridSize + _this.gap,
                top: _this.gridSize + _this.gap
            }, 100, function () {
                if (index + 1 < 9) {
                    if (index == 3) {
                        moveOne(index + 2);
                    }
                    else {
                        moveOne(index + 1);
                    }
                }
                else {
                    _this.trigger('moveCenterEnd');
                }
            });
        }

        moveOne(0);
    };

    fn.moveBack = function () {
        var _this = this;

        function moveOne(index) {
            var x = Math.floor(index / 3),
                y = Math.floor(index % 3);

            _this.cells[x * 3 + y].$cell.animate({
                left: x * (_this.gridSize + _this.gap),
                top: y * (_this.gridSize + _this.gap)
            }, 100, function () {
                if (index + 1 < 9) {
                    if (index == 3) {
                        moveOne(index + 2);
                    }
                    else {
                        moveOne(index + 1);
                    }
                }
                else {
                    _this.trigger('gridStart');
                }
            });
        }

        moveOne(0);
    };

    fn.initPrizeView = function () {
        var imgGroup = this.imgGroup.slice(0), //copy the array
            targetGroup = [],
            temp;

        for (var i = 0; i < 9; i++) {
            temp = imgGroup.splice(Math.floor(Math.random() * imgGroup.length), 1);
            targetGroup.push(temp[0]);
            this.insertPicture(i, temp[0]);
            this.turn_in(i);
        }
    };
    fn.initGuessView = function () {
        var _this = this;
        for (var i = 0; i < 9; i++) {
            (function (index) {
                _this.turn_out(index, function () {
                    _this.removePicture(index);
                });
            })(i);
        }
    };

    fn.removePicture = function (index) {
        var _this = this;
        _this.cells[index].$back.find('img').attr('src', this.imgPath + 'front.png');
    };
    fn.insertPicture = function (index, name) {
        var _this = this;
        // console.log(isNaN((parseInt(name))));
        
        if ( name != 'noprize1'){
            console.log(name);
            // var item = window.storeList[Number(name)-1]
            _this.cells[index].$back.find('a').attr('href',0).find('img').attr('src', this.imgPath + name + '.jpg');
                // console.log(name);
        }
        
        _this.cells[index].$back.find('img').attr('src', this.imgPath + name + '.jpg');
        //_this.cells[index].$back.find('img').attr('src', this.imgPath + name + '.png');
    };

    fn.setSize = function () {
        var _this = this,
            x, y;

        for (x = 0; x < 3; x++) {
            for (y = 0; y < 3; y++) {
                _this.cells[x * 3 + y].$cell.css({
                    position: 'absolute',
                    left: x * (_this.gridSize + _this.gap),
                    top: y * (_this.gridSize + _this.gap),
                    width: _this.gridSize,
                    height: _this.gridSize
                });
                _this.turn_out(x * 3 + y);
            }
        }
    };

    $.Grid = Grid;

})(jQuery);
    
    }
})
