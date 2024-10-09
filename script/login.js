/*!
  * Bootstrap v4.5.0 (https://getbootstrap.com/)
  * Copyright 2011-2020 The Bootstrap Authors (https://github.com/twbs/bootstrap/graphs/contributors)
  * Licensed under MIT (https://github.com/twbs/bootstrap/blob/master/LICENSE)
  */
(function (global, factory) {
    typeof exports === 'object' && typeof module !== 'undefined' ? factory(exports, require('jquery'), require('popper.js')) :
        typeof define === 'function' && define.amd ? define(['exports', 'jquery', 'popper.js'], factory) :
            (global = global || self, factory(global.bootstrap = {}, global.jQuery, global.Popper));
}(this, (function (exports, $, Popper) { 'use strict';
  
    $ = $ && Object.prototype.hasOwnProperty.call($, 'default') ? $['default'] : $;
    Popper = Popper && Object.prototype.hasOwnProperty.call(Popper, 'default') ? Popper['default'] : Popper;
  
    function _defineProperties(target, props) {
      for (var i = 0; i < props.length; i++) {
        var descriptor = props[i];
        descriptor.enumerable = descriptor.enumerable || false;
        descriptor.configurable = true;
        if ("value" in descriptor) descriptor.writable = true;
        Object.defineProperty(target, descriptor.key, descriptor);
      }
    }
  
    function _createClass(Constructor, protoProps, staticProps) {
      if (protoProps) _defineProperties(Constructor.prototype, protoProps);
      if (staticProps) _defineProperties(Constructor, staticProps);
      return Constructor;
    }
  
    function _defineProperty(obj, key, value) {
      if (key in obj) {
        Object.defineProperty(obj, key, {
          value: value,
          enumerable: true,
          configurable: true,
          writable: true
        });
      } else {
        obj[key] = value;
      }
  
      return obj;
    }
  
    function ownKeys(object, enumerableOnly) {
      var keys = Object.keys(object);
  
      if (Object.getOwnPropertySymbols) {
        var symbols = Object.getOwnPropertySymbols(object);
        if (enumerableOnly) symbols = symbols.filter(function (sym) {
          return Object.getOwnPropertyDescriptor(object, sym).enumerable;
        });
        keys.push.apply(keys, symbols);
      }
  
      return keys;
    }
  
    function _objectSpread2(target) {
      for (var i = 1; i < arguments.length; i++) {
        var source = arguments[i] != null ? arguments[i] : {};
  
        if (i % 2) {
          ownKeys(Object(source), true).forEach(function (key) {
            _defineProperty(target, key, source[key]);
          });
        } else if (Object.getOwnPropertyDescriptors) {
          Object.defineProperties(target, Object.getOwnPropertyDescriptors(source));
        } else {
          ownKeys(Object(source)).forEach(function (key) {
            Object.defineProperty(target, key, Object.getOwnPropertyDescriptor(source, key));
          });
        }
      }
  
      return target;
    }
  
    function _inheritsLoose(subClass, superClass) {
      subClass.prototype = Object.create(superClass.prototype);
      subClass.prototype.constructor = subClass;
      subClass.__proto__ = superClass;
    }
  
    /**
     * --------------------------------------------------------------------------
     * Bootstrap (v4.5.0): util.js
     * Licensed under MIT (https://github.com/twbs/bootstrap/blob/master/LICENSE)
     * --------------------------------------------------------------------------
     */
    /**
     * ------------------------------------------------------------------------
     * Private TransitionEnd Helpers
     * ------------------------------------------------------------------------
     */
  
    var TRANSITION_END = 'transitionend';
    var MAX_UID = 1000000;
    var MILLISECONDS_MULTIPLIER = 1000; // Shoutout AngusCroll (https://goo.gl/pxwQGp)
  
    function toType(obj) {
      if (obj === null || typeof obj === 'undefined') {
        return "" + obj;
      }
  
      return {}.toString.call(obj).match(/\s([a-z]+)/i)[1].toLowerCase();
    }
  
    function getSpecialTransitionEndEvent() {
      return {
        bindType: TRANSITION_END,
        delegateType: TRANSITION_END,
        handle: function handle(event) {
          if ($(event.target).is(this)) {
            return event.handleObj.handler.apply(this, arguments); // eslint-disable-line prefer-rest-params
          }
  
          return undefined;
        }
      };
    }
  
    function transitionEndEmulator(duration) {
      var _this = this;
  
      var called = false;
      $(this).one(Util.TRANSITION_END, function () {
        called = true;
      });
      setTimeout(function () {
        if (!called) {
          Util.triggerTransitionEnd(_this);
        }
      }, duration);
      return this;
    }
  
    function setTransitionEndSupport() {
      $.fn.emulateTransitionEnd = transitionEndEmulator;
      $.event.special[Util.TRANSITION_END] = getSpecialTransitionEndEvent();
    }
    /**
     * --------------------------------------------------------------------------
     * Public Util Api
     * --------------------------------------------------------------------------
     */
  
  
    var Util = {
      TRANSITION_END: 'bsTransitionEnd',
      getUID: function getUID(prefix) {
        do {
          // eslint-disable-next-line no-bitwise
          prefix += ~~(Math.random() * MAX_UID); // "~~" acts like a faster Math.floor() here
        } while (document.getElementById(prefix));
  
        return prefix;
      },
      getSelectorFromElement: function getSelectorFromElement(element) {
        var selector = element.getAttribute('data-target');
  
        if (!selector || selector === '#') {
          var hrefAttr = element.getAttribute('href');
          selector = hrefAttr && hrefAttr !== '#' ? hrefAttr.trim() : '';
        }
  
        try {
          return document.querySelector(selector) ? selector : null;
        } catch (err) {
          return null;
        }
      },
      getTransitionDurationFromElement: function getTransitionDurationFromElement(element) {
        if (!element) {
          return 0;
        } // Get transition-duration of the element
  
  
        var transitionDuration = $(element).css('transition-duration');
        var transitionDelay = $(element).css('transition-delay');
        var floatTransitionDuration = parseFloat(transitionDuration);
        var floatTransitionDelay = parseFloat(transitionDelay); // Return 0 if element or transition duration is not found
  
        if (!floatTransitionDuration && !floatTransitionDelay) {
          return 0;
        } // If multiple durations are defined, take the first
  
  
        transitionDuration = transitionDuration.split(',')[0];
        transitionDelay = transitionDelay.split(',')[0];
        return (parseFloat(transitionDuration) + parseFloat(transitionDelay)) * MILLISECONDS_MULTIPLIER;
      },
      reflow: function reflow(element) {
        return element.offsetHeight;
      },
      triggerTransitionEnd: function triggerTransitionEnd(element) {
        $(element).trigger(TRANSITION_END);
      },
      // TODO: Remove in v5
      supportsTransitionEnd: function supportsTransitionEnd() {
        return Boolean(TRANSITION_END);
      },
      isElement: function isElement(obj) {
        return (obj[0] || obj).nodeType;
      },
      typeCheckConfig: function typeCheckConfig(componentName, config, configTypes) {
        for (var property in configTypes) {
          if (Object.prototype.hasOwnProperty.call(configTypes, property)) {
            var expectedTypes = configTypes[property];
            var value = config[property];
            var valueType = value && Util.isElement(value) ? 'element' : toType(value);
  
            if (!new RegExp(expectedTypes).test(valueType)) {
              throw new Error(componentName.toUpperCase() + ": " + ("Option \"" + property + "\" provided type \"" + valueType + "\" ") + ("but expected type \"" + expectedTypes + "\"."));
            }
          }
        }
      },
      findShadowRoot: function findShadowRoot(element) {
        if (!document.documentElement.attachShadow) {
          return null;
        } // Can find the shadow root otherwise it'll return the document
  
  
        if (typeof element.getRootNode === 'function') {
          var root = element.getRootNode();
          return root instanceof ShadowRoot ? root : null;
        }
  
        if (element instanceof ShadowRoot) {
          return element;
        } // when we don't find a shadow root
  
  
        if (!element.parentNode) {
          return null;
        }
  
        return Util.findShadowRoot(element.parentNode);
      },
      jQueryDetection: function jQueryDetection() {
        if (typeof $ === 'undefined') {
          throw new TypeError('Bootstrap\'s JavaScript requires jQuery. jQuery must be included before Bootstrap\'s JavaScript.');
        }
  
        var version = $.fn.jquery.split(' ')[0].split('.');
        var minMajor = 1;
        var ltMajor = 2;
        var minMinor = 9;
        var minPatch = 1;
        var maxMajor = 4;
  
        if (version[0] < ltMajor && version[1] < minMinor || version[0] === minMajor && version[1] === minMinor && version[2] < minPatch || version[0] >= maxMajor) {
          throw new Error('Bootstrap\'s JavaScript requires at least jQuery v1.9.1 but less than v4.0.0');
        }
      }
    };
    Util.jQueryDetection();
    setTransitionEndSupport();
  
    /**
     * ------------------------------------------------------------------------
     * Constants
     * ------------------------------------------------------------------------
     */
  
    var NAME = 'alert';
    var VERSION = '4.5.0';
    var DATA_KEY = 'bs.alert';
    var EVENT_KEY = "." + DATA_KEY;
    var DATA_API_KEY = '.data-api';
    var JQUERY_NO_CONFLICT = $.fn[NAME];
    var SELECTOR_DISMISS = '[data-dismiss="alert"]';
    var EVENT_CLOSE = "close" + EVENT_KEY;
    var EVENT_CLOSED = "closed" + EVENT_KEY;
    var EVENT_CLICK_DATA_API = "click" + EVENT_KEY + DATA_API_KEY;
    var CLASS_NAME_ALERT = 'alert';
    var CLASS_NAME_FADE = 'fade';
    var CLASS_NAME_SHOW = 'show';
    /**
     * ------------------------------------------------------------------------
     * Class Definition
     * ------------------------------------------------------------------------
     */
  
    var Alert = /*#__PURE__*/function () {
      function Alert(element) {
        this._element = element;
      } // Getters
  
  
      var _proto = Alert.prototype;
  
      // Public
      _proto.close = function close(element) {
        var rootElement = this._element;
  
        if (element) {
          rootElement = this._getRootElement(element);
        }
  
        var customEvent = this._triggerCloseEvent(rootElement);
  
        if (customEvent.isDefaultPrevented()) {
          return;
        }
  
        this._removeElement(rootElement);
      };
  
      _proto.dispose = function dispose() {
        $.removeData(this._element, DATA_KEY);
        this._element = null;
      } // Private
      ;
  
      _proto._getRootElement = function _getRootElement(element) {
        var selector = Util.getSelectorFromElement(element);
        var parent = false;
  
        if (selector) {
          parent = document.querySelector(selector);
        }
  
        if (!parent) {
          parent = $(element).closest("." + CLASS_NAME_ALERT)[0];
        }
  
        return parent;
      };
  
      _proto._triggerCloseEvent = function _triggerCloseEvent(element) {
        var closeEvent = $.Event(EVENT_CLOSE);
        $(element).trigger(closeEvent);
        return closeEvent;
      };
  
      _proto._removeElement = function _removeElement(element) {
        var _this = this;
  
        $(element).removeClass(CLASS_NAME_SHOW);
  
        if (!$(element).hasClass(CLASS_NAME_FADE)) {
          this._destroyElement(element);
  
          return;
        }
  
        var transitionDuration = Util.getTransitionDurationFromElement(element);
        $(element).one(Util.TRANSITION_END, function (event) {
          return _this._destroyElement(element, event);
        }).emulateTransitionEnd(transitionDuration);
      };
  
      _proto._destroyElement = function _destroyElement(element) {
        $(element).detach().trigger(EVENT_CLOSED).remove();
      } // Static
      ;
  
      Alert._jQueryInterface = function _jQueryInterface(config) {
        return this.each(function () {
          var $element = $(this);
          var data = $element.data(DATA_KEY);
  
          if (!data) {
            data = new Alert(this);
            $element.data(DATA_KEY, data);
          }
  
          if (config === 'close') {
            data[config](this);
          }
        });
      };
  
      Alert._handleDismiss = function _handleDismiss(alertInstance) {
        return function (event) {
          if (event) {
            event.preventDefault();
          }
  
          alertInstance.close(this);
        };
      };
  
      _createClass(Alert, null, [{
        key: "VERSION",
        get: function get() {
          return VERSION;
        }
      }]);
  
      return Alert;
    }();
    /**
     * ------------------------------------------------------------------------
     * Data Api implementation
     * ------------------------------------------------------------------------
     */
  
  
    $(document).on(EVENT_CLICK_DATA_API, SELECTOR_DISMISS, Alert._handleDismiss(new Alert()));
    /**
     * ------------------------------------------------------------------------
     * jQuery
     * ------------------------------------------------------------------------
     */
  
    $.fn[NAME] = Alert._jQueryInterface;
    $.fn[NAME].Constructor = Alert;
  
    $.fn[NAME].noConflict = function () {
      $.fn[NAME] = JQUERY_NO_CONFLICT;
      return Alert._jQueryInterface;
    };  
    /**
     * ------------------------------------------------------------------------
     * Constants
     * ------------------------------------------------------------------------
     */
  
    var NAME$1 = 'button';
    var VERSION$1 = '4.5.0';
    var DATA_KEY$1 = 'bs.button';
    var EVENT_KEY$1 = "." + DATA_KEY$1;
    var DATA_API_KEY$1 = '.data-api';
    var JQUERY_NO_CONFLICT$1 = $.fn[NAME$1];
    var CLASS_NAME_ACTIVE = 'active';
    var CLASS_NAME_BUTTON = 'btn';
    var CLASS_NAME_FOCUS = 'focus';
    var SELECTOR_DATA_TOGGLE_CARROT = '[data-toggle^="button"]';
    var SELECTOR_DATA_TOGGLES = '[data-toggle="buttons"]';
    var SELECTOR_DATA_TOGGLE = '[data-toggle="button"]';
    var SELECTOR_DATA_TOGGLES_BUTTONS = '[data-toggle="buttons"] .btn';
    var SELECTOR_INPUT = 'input:not([type="hidden"])';
    var SELECTOR_ACTIVE = '.active';
    var SELECTOR_BUTTON = '.btn';
    var EVENT_CLICK_DATA_API$1 = "click" + EVENT_KEY$1 + DATA_API_KEY$1;
    var EVENT_FOCUS_BLUR_DATA_API = "focus" + EVENT_KEY$1 + DATA_API_KEY$1 + " " + ("blur" + EVENT_KEY$1 + DATA_API_KEY$1);
    var EVENT_LOAD_DATA_API = "load" + EVENT_KEY$1 + DATA_API_KEY$1;
    /**
     * ------------------------------------------------------------------------
     * Class Definition
     * ------------------------------------------------------------------------
     */
  
    var Button = /*#__PURE__*/function () {
      function Button(element) {
        this._element = element;
      } // Getters
  
  
      var _proto = Button.prototype;
  
      // Public
      _proto.toggle = function toggle() {
        var triggerChangeEvent = true;
        var addAriaPressed = true;
        var rootElement = $(this._element).closest(SELECTOR_DATA_TOGGLES)[0];
  
        if (rootElement) {
          var input = this._element.querySelector(SELECTOR_INPUT);
  
          if (input) {
            if (input.type === 'radio') {
              if (input.checked && this._element.classList.contains(CLASS_NAME_ACTIVE)) {
                triggerChangeEvent = false;
              } else {
                var activeElement = rootElement.querySelector(SELECTOR_ACTIVE);
  
                if (activeElement) {
                  $(activeElement).removeClass(CLASS_NAME_ACTIVE);
                }
              }
            }
  
            if (triggerChangeEvent) {
              // if it's not a radio button or checkbox don't add a pointless/invalid checked property to the input
              if (input.type === 'checkbox' || input.type === 'radio') {
                input.checked = !this._element.classList.contains(CLASS_NAME_ACTIVE);
              }
  
              $(input).trigger('change');
            }
  
            input.focus();
            addAriaPressed = false;
          }
        }
  
        if (!(this._element.hasAttribute('disabled') || this._element.classList.contains('disabled'))) {
          if (addAriaPressed) {
            this._element.setAttribute('aria-pressed', !this._element.classList.contains(CLASS_NAME_ACTIVE));
          }
  
          if (triggerChangeEvent) {
            $(this._element).toggleClass(CLASS_NAME_ACTIVE);
          }
        }
      };
  
      _proto.dispose = function dispose() {
        $.removeData(this._element, DATA_KEY$1);
        this._element = null;
      } // Static
      ;
  
      Button._jQueryInterface = function _jQueryInterface(config) {
        return this.each(function () {
          var data = $(this).data(DATA_KEY$1);
  
          if (!data) {
            data = new Button(this);
            $(this).data(DATA_KEY$1, data);
          }
  
          if (config === 'toggle') {
            data[config]();
          }
        });
      };
  
      _createClass(Button, null, [{
        key: "VERSION",
        get: function get() {
          return VERSION$1;
        }
      }]);
  
      return Button;
    }();
    /**
     * ------------------------------------------------------------------------
     * Data Api implementation
     * ------------------------------------------------------------------------
     */
  
  
    $(document).on(EVENT_CLICK_DATA_API$1, SELECTOR_DATA_TOGGLE_CARROT, function (event) {
      var button = event.target;
      var initialButton = button;
  
      if (!$(button).hasClass(CLASS_NAME_BUTTON)) {
        button = $(button).closest(SELECTOR_BUTTON)[0];
      }
  
      if (!button || button.hasAttribute('disabled') || button.classList.contains('disabled')) {
        event.preventDefault(); // work around Firefox bug #1540995
      } else {
        var inputBtn = button.querySelector(SELECTOR_INPUT);
  
        if (inputBtn && (inputBtn.hasAttribute('disabled') || inputBtn.classList.contains('disabled'))) {
          event.preventDefault(); // work around Firefox bug #1540995
  
          return;
        }
  
        if (initialButton.tagName === 'LABEL' && inputBtn && inputBtn.type === 'checkbox') {
          event.preventDefault(); // work around event sent to label and input
        }
  
        Button._jQueryInterface.call($(button), 'toggle');
      }
    }).on(EVENT_FOCUS_BLUR_DATA_API, SELECTOR_DATA_TOGGLE_CARROT, function (event) {
      var button = $(event.target).closest(SELECTOR_BUTTON)[0];
      $(button).toggleClass(CLASS_NAME_FOCUS, /^focus(in)?$/.test(event.type));
    });
    $(window).on(EVENT_LOAD_DATA_API, function () {
      // ensure correct active class is set to match the controls' actual values/states
      // find all checkboxes/readio buttons inside data-toggle groups
      var buttons = [].slice.call(document.querySelectorAll(SELECTOR_DATA_TOGGLES_BUTTONS));
  
      for (var i = 0, len = buttons.length; i < len; i++) {
        var button = buttons[i];
        var input = button.querySelector(SELECTOR_INPUT);
  
        if (input.checked || input.hasAttribute('checked')) {
          button.classList.add(CLASS_NAME_ACTIVE);
        } else {
          button.classList.remove(CLASS_NAME_ACTIVE);
        }
      } // find all button toggles
  
  
      buttons = [].slice.call(document.querySelectorAll(SELECTOR_DATA_TOGGLE));
  
      for (var _i = 0, _len = buttons.length; _i < _len; _i++) {
        var _button = buttons[_i];
