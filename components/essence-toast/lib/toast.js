'use strict';

var _createClass = (function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; })();

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

var _classnames = require('classnames');

var _classnames2 = _interopRequireDefault(_classnames);

var _essenceCore = require('essence-core');

require('./toast.less');

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

// require('!css!less!./toast.less');

var ToastBar = (function (_React$Component) {
    _inherits(ToastBar, _React$Component);

    function ToastBar(props) {
        _classCallCheck(this, ToastBar);

        var _this = _possibleConstructorReturn(this, Object.getPrototypeOf(ToastBar).call(this, props));

        var self = _this;
        _this.timeOut = false;
        _this.state = {
            classes: (0, _classnames2.default)('toast', { 'toast-multiline': false }, props.classes, props.className),
            visible: props.visible,
            onStart: props.onStart,
            onPause: props.onPause,
            onResume: props.onResume,
            onEnd: props.onEnd,
            delay: parseInt(props.delay) > 0 ? parseInt(props.delay) : 2000
        };

        if (props.visible) {
            _this.timeOut = new _essenceCore.Utils.Timer(function () {
                self.setState({
                    style: {
                        bottom: '-2000px',
                        opacity: 0,
                        zIndex: 0
                    },
                    visible: false
                });
                if (props.onEnd) {
                    props.onEnd();
                }
            }, self.state.delay);
        }
        return _this;
    }

    _createClass(ToastBar, [{
        key: 'toastStyle',
        value: function toastStyle(visible) {
            var style = window.getComputedStyle ? getComputedStyle(this.toastBar, null) : this.toastBar.currentStyle;
            var height = parseInt(style['height']);
            var width = parseInt(style['width']);
            var lineHeight = parseInt(style['line-height']);
            var isMultiLine = Math.floor(height / lineHeight) > 1 ? true : false;

            var containerStyle = window.getComputedStyle ? getComputedStyle(this.toastBarContainer, null) : this.toastBarContainer.currentStyle;
            var inlineStyle = {
                bottom: visible ? '20px' : '-2000px',
                opacity: visible ? 1 : 0,
                zIndex: visible ? 1 : 0,
                marginRight: '-' + parseInt(containerStyle['width']) / 2 + 'px'
            };

            return {
                isMultiLine: isMultiLine,
                inlineStyle: inlineStyle
            };
        }
    }, {
        key: 'componentWillReceiveProps',
        value: function componentWillReceiveProps(nextProps) {
            var self = this;
            var toastStyles = this.toastStyle(nextProps.visible);
            var delay = parseInt(nextProps.delay) > 0 ? parseInt(nextProps.delay) : 2000;

            this.setState({
                classes: (0, _classnames2.default)('toast', nextProps.classes, nextProps.className, { 'toast-multiline': toastStyles.isMultiLine }),
                delay: delay,
                onStart: nextProps.onStart,
                onPause: nextProps.onPause,
                onResume: nextProps.onResume,
                onEnd: nextProps.onEnd,
                visible: nextProps.visible,
                style: toastStyles.inlineStyle
            });

            if (nextProps.visible) {
                this.timeOut = new _essenceCore.Utils.Timer(function () {
                    self.setState({
                        style: {
                            bottom: '-2000px',
                            opacity: 0,
                            zIndex: 0
                        },
                        visible: false
                    });
                    if (nextProps.onEnd) {
                        nextProps.onEnd();
                    }
                }, delay);
                if (this.state.onStart) {
                    this.state.onStart();
                }
            }
        }
    }, {
        key: 'componentDidMount',
        value: function componentDidMount() {
            var toastStyles = this.toastStyle(this.state.visible);
            this.setState({
                classes: (0, _classnames2.default)(this.state.classes, { 'toast-multiline': toastStyles.isMultiLine }),
                style: toastStyles.inlineStyle
            });
            if (this.state.onStart && this.state.visible) {
                this.state.onStart();
            }
        }
    }, {
        key: 'componentWillUnmount',
        value: function componentWillUnmount() {
            if (this.state.onEnd && this.state.visible) {
                this.state.onEnd();
            }
        }
    }, {
        key: 'pauseTimer',
        value: function pauseTimer() {
            if (this.timeOut) {
                this.timeOut.pause();
                if (this.state.onPause && this.state.visible) {
                    this.state.onPause();
                }
            }
        }
    }, {
        key: 'resumeTimer',
        value: function resumeTimer() {
            if (this.timeOut) {
                this.timeOut.resume();
                if (this.state.onResume && this.state.visible) {
                    this.state.onResume();
                }
            }
        }
    }, {
        key: 'render',
        value: function render() {
            var _this2 = this;

            return _react2.default.createElement(
                'div',
                {
                    style: this.state.style,
                    className: this.state.classes,
                    ref: function ref(_ref2) {
                        return _this2.toastBarContainer = _ref2;
                    },
                    onMouseOver: this.pauseTimer.bind(this),
                    onMouseOut: this.resumeTimer.bind(this)
                },
                _react2.default.createElement(
                    'div',
                    {
                        className: 'toast-message',
                        ref: function ref(_ref) {
                            return _this2.toastBar = _ref;
                        }
                    },
                    this.props.children
                )
            );
        }
    }]);

    return ToastBar;
})(_react2.default.Component);

module.exports = ToastBar;