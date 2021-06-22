(function (f) {
  if (typeof exports === "object" && typeof module !== "undefined") {
    module.exports = f();
  } else if (typeof define === "function" && define.amd) {
    define([], f);
  } else {
    var g;
    if (typeof window !== "undefined") {
      g = window;
    } else if (typeof global !== "undefined") {
      g = global;
    } else if (typeof self !== "undefined") {
      g = self;
    } else {
      g = this;
    }
    g.EmojiPicker = f();
  }
})(function () {
  var define, module, exports;
  return (function e(t, n, r) {
    function s(o, u) {
      if (!n[o]) {
        if (!t[o]) {
          var a = typeof require == "function" && require;
          if (!u && a) return a(o, !0);
          if (i) return i(o, !0);
          var f = new Error("Cannot find module '" + o + "'");
          throw ((f.code = "MODULE_NOT_FOUND"), f);
        }
        var l = (n[o] = { exports: {} });
        t[o][0].call(
          l.exports,
          function (e) {
            var n = t[o][1][e];
            return s(n ? n : e);
          },
          l,
          l.exports,
          e,
          t,
          n,
          r
        );
      }
      return n[o].exports;
    }
    var i = typeof require == "function" && require;
    for (var o = 0; o < r.length; o++) s(r[o]);
    return s;
  })(
    {
      1: [
        function (require, module, exports) {
          (function (global, factory) {
            if (typeof define === "function" && define.amd) {
              define(["module"], factory);
            } else if (typeof exports !== "undefined") {
              factory(module);
            } else {
              var mod = {
                exports: {},
              };
              factory(mod);
              global.emojiPicker = mod.exports;
            }
          })(this, function (module) {
            "use strict";

            function _classCallCheck(instance, Constructor) {
              if (!(instance instanceof Constructor)) {
                throw new TypeError("Cannot call a class as a function");
              }
            }

            var _createClass = (function () {
              function defineProperties(target, props) {
                for (var i = 0; i < props.length; i++) {
                  var descriptor = props[i];
                  descriptor.enumerable = descriptor.enumerable || false;
                  descriptor.configurable = true;
                  if ("value" in descriptor) descriptor.writable = true;
                  Object.defineProperty(target, descriptor.key, descriptor);
                }
              }

              return function (Constructor, protoProps, staticProps) {
                if (protoProps)
                  defineProperties(Constructor.prototype, protoProps);
                if (staticProps) defineProperties(Constructor, staticProps);
                return Constructor;
              };
            })();

            var EmojiPicker = (function () {
              function EmojiPicker() {
                _classCallCheck(this, EmojiPicker);

                this.initiate();
              }

              _createClass(EmojiPicker, [
                {
                  key: "initiate",
                  value: function initiate() {
                    var _this = this;

                    var emojiInputs = document.querySelectorAll(
                      '[data-emoji_picker="true"]'
                    );
                    console.log(emojiInputs);
                    emojiInputs.forEach(function (element) {
                      _this.generateElements(element);
                    });
                  },
                },
                {
                  key: "generateElements",
                  value: function generateElements(emojiInput) {
                    console.log(emojiInput);
                    var clickLink = function clickLink(event) {
                      event.preventDefault();
                      var caretPos = emojiInput.selectionStart;
                      emojiInput.value =
                        emojiInput.value.substring(0, caretPos) +
                        " " +
                        event.target.innerHTML +
                        emojiInput.value.substring(caretPos);
                      emojiPicker.style.display = "none";
                      emojiInput.focus();

                      //trigger ng-change for angular
                      if (typeof angular !== "undefined") {
                        angular.element(emojiInput).triggerHandler("change");
                      }
                    };

                    emojiInput.style.width = "85%";
                    emojiInput.style.height = "80%";
                    var emojiContainer = document.createElement("div");
                    emojiContainer.style.position = "relative";
                    emojiContainer.style.width = "95%";
                    emojiContainer.style.height = "100%";
                    emojiContainer.style.fontSize = "large";

                    var parent = emojiInput.parentNode;
                    parent.replaceChild(emojiContainer, emojiInput);
                    emojiContainer.appendChild(emojiInput);

                    var emojiPicker = document.createElement("div");
                    emojiPicker.tabIndex = 0;

                    emojiPicker.addEventListener(
                      "blur",
                      function (event) {
                        emojiPicker.style.display = "none";
                      },
                      false
                    );

                    emojiPicker.style.position = "absolute";
                    emojiPicker.style.right = "2px";
                    emojiPicker.style.outline = "none";
                    emojiPicker.style.top = "20px";
                    emojiPicker.style.zIndex = "999";
                    emojiPicker.style.display = "none";
                    emojiPicker.style.width = "264px";
                    emojiPicker.style.padding = "7px 7px 7px 7px";
                    emojiPicker.style.marginTop = "5px";
                    emojiPicker.style.overflow = "hidden";
                    emojiPicker.style.background = "#fff";
                    emojiPicker.style.height = "200px";
                    emojiPicker.style.overflowY = "auto";
                    emojiPicker.style.boxShadow =
                      "0 3px 6px rgba(0,0,0,0.16), 0 3px 6px rgba(0,0,0,0.23)";
                    emojiPicker.style.borderRadius = "2px;";

                    var emojiTrigger = document.createElement("a");
                    emojiTrigger.style.position = "absolute";
                    emojiTrigger.style.color = "#FFFFF";
                    emojiTrigger.style.top = "2px";
                    emojiTrigger.style.right = "2px";
                    emojiTrigger.style.textDecoration = "none";
                    emojiTrigger.setAttribute("href", "javascript:void(0)");
                    emojiTrigger.innerHTML =
                      '<svg xmlns="http://www.w3.org/2000/svg" width="15" height="15" viewBox="0 0 12 14"><path d="M8.9 8.4q-0.3 0.9-1.1 1.5t-1.8 0.6-1.8-0.6-1.1-1.5q-0.1-0.2 0-0.4t0.3-0.2q0.2-0.1 0.4 0t0.2 0.3q0.2 0.6 0.7 1t1.2 0.4 1.2-0.4 0.7-1q0.1-0.2 0.3-0.3t0.4 0 0.3 0.2 0 0.4zM5 5q0 0.4-0.3 0.7t-0.7 0.3-0.7-0.3-0.3-0.7 0.3-0.7 0.7-0.3 0.7 0.3 0.3 0.7zM9 5q0 0.4-0.3 0.7t-0.7 0.3-0.7-0.3-0.3-0.7 0.3-0.7 0.7-0.3 0.7 0.3 0.3 0.7zM11 7q0-1-0.4-1.9t-1.1-1.6-1.6-1.1-1.9-0.4-1.9 0.4-1.6 1.1-1.1 1.6-0.4 1.9 0.4 1.9 1.1 1.6 1.6 1.1 1.9 0.4 1.9-0.4 1.6-1.1 1.1-1.6 0.4-1.9zM12 7q0 1.6-0.8 3t-2.2 2.2-3 0.8-3-0.8-2.2-2.2-0.8-3 0.8-3 2.2-2.2 3-0.8 3 0.8 2.2 2.2 0.8 3z"/></svg>';
                    emojiTrigger.onclick = function () {
                      if (emojiPicker.style.display === "none") {
                        emojiPicker.style.display = "block";
                      }
                      emojiPicker.focus();
                    };

                    emojiContainer.appendChild(emojiTrigger);

                    var emojiList = document.createElement("ul");
                    emojiList.style.padding = "0";
                    emojiList.style.margin = "0";
                    emojiList.style.listStyle = "none";

                    var emojis = [
                      0x1f600, 0x1f601, 0x1f602, 0x1f923, 0x1f603, 0x1f604,
                      0x1f605, 0x1f606, 0x1f609, 0x1f60a, 0x1f60b, 0x1f60e,
                      0x1f60d, 0x1f618, 0x1f617, 0x1f619, 0x1f61a, 0x1f642,
                      0x1f917, 0x1f929, 0x1f914, 0x1f928, 0x1f610, 0x1f611,
                      0x1f636, 0x1f644, 0x1f60f, 0x1f623, 0x1f625, 0x1f62e,
                      0x1f910, 0x1f62f, 0x1f62a, 0x1f62b, 0x1f634, 0x1f60c,
                      0x1f61b, 0x1f61c, 0x1f61d, 0x1f924, 0x1f612, 0x1f613,
                      0x1f614, 0x1f615, 0x1f643, 0x1f911, 0x1f632, 0x2639,
                      0x1f641, 0x1f616, 0x1f61e, 0x1f61f, 0x1f624, 0x1f622,
                      0x1f62d, 0x1f626, 0x1f627, 0x1f628, 0x1f629, 0x1f92f,
                      0x1f62c, 0x1f630, 0x1f631, 0x1f633, 0x1f92a, 0x1f635,
                      0x1f621, 0x1f620, 0x1f92c, 0x1f637, 0x1f912, 0x1f915,
                      0x1f922, 0x1f92e, 0x1f927, 0x1f607, 0x1f920, 0x1f925,
                      0x1f92b, 0x1f92d, 0x1f9d0, 0x1f913, 0x1f608, 0x1f47f,
                      0x1f921, 0x1f479, 0x1f47a, 0x1f480, 0x2620, 0x1f47b,
                      0x1f47d, 0x1f47e, 0x1f916, 0x1f4a9, 0x1f63a, 0x1f638,
                      0x1f639, 0x1f63b, 0x1f63c, 0x1f63d, 0x1f640, 0x1f63f,
                      0x1f63e, 0x1f648, 0x1f649, 0x1f64a, 0x1f476, 0x1f9d2,
                      0x1f466, 0x1f467, 0x1f9d1, 0x1f468, 0x1f469, 0x1f9d3,
                      0x1f474, 0x1f475, 0x1f46e, 0x1f575, 0x1f482, 0x1f477,
                      0x1f934, 0x1f478, 0x1f473, 0x1f472, 0x1f9d5, 0x1f9d4,
                      0x1f471, 0x1f935, 0x1f470, 0x1f930, 0x1f931, 0x1f47c,
                      0x1f385, 0x1f936, 0x1f9d9, 0x1f9da, 0x1f9db, 0x1f9dc,
                      0x1f9dd, 0x1f9de, 0x1f9df, 0x1f64d, 0x1f64e, 0x1f645,
                      0x1f646, 0x1f481, 0x1f64b, 0x1f647, 0x1f926, 0x1f937,
                      0x1f486, 0x1f487, 0x1f6b6, 0x1f3c3, 0x1f483, 0x1f57a,
                      0x1f46f, 0x1f9d6, 0x1f9d7, 0x1f9d8, 0x1f6c0, 0x1f6cc,
                      0x1f574, 0x1f5e3, 0x1f464, 0x1f465, 0x1f93a, 0x1f3c7,
                      0x26f7, 0x1f3c2, 0x1f3cc, 0x1f3c4, 0x1f6a3, 0x1f3ca,
                      0x26f9, 0x1f3cb, 0x1f6b4, 0x1f6b5, 0x1f3ce, 0x1f3cd,
                      0x1f938, 0x1f93c, 0x1f93d, 0x1f93e, 0x1f939, 0x1f46b,
                      0x1f46c, 0x1f46d, 0x1f48f, 0x1f491, 0x1f46a, 0x1f933,
                      0x1f4aa, 0x1f448, 0x1f449, 0x261d, 0x1f446, 0x1f595,
                      0x1f447, 0x270c, 0x1f91e, 0x1f596, 0x1f918, 0x1f919,
                      0x1f590, 0x270b, 0x1f44c, 0x1f44d, 0x1f44e, 0x270a,
                      0x1f44a, 0x1f91b, 0x1f91c, 0x1f91a, 0x1f44b, 0x1f91f,
                      0x270d, 0x1f44f, 0x1f450, 0x1f64c, 0x1f932, 0x1f64f,
                      0x1f91d, 0x1f485, 0x1f442, 0x1f443, 0x1f463, 0x1f440,
                      0x1f441, 0x1f9e0, 0x1f445, 0x1f444, 0x1f48b, 0x1f498,
                      0x2764, 0x1f493, 0x1f494, 0x1f495, 0x1f496, 0x1f497,
                      0x1f499, 0x1f49a, 0x1f49b, 0x1f9e1, 0x1f49c, 0x1f5a4,
                      0x1f49d, 0x1f49e, 0x1f49f, 0x2763, 0x1f48c, 0x1f4a4,
                      0x1f4a2, 0x1f4a3, 0x1f4a5, 0x1f4a6, 0x1f4a8, 0x1f4ab,
                      0x1f4ac, 0x1f5e8, 0x1f5ef, 0x1f4ad, 0x1f573, 0x1f453,
                      0x1f576, 0x1f454, 0x1f455, 0x1f456, 0x1f9e3, 0x1f9e4,
                      0x1f9e5, 0x1f9e6, 0x1f457, 0x1f458, 0x1f459, 0x1f45a,
                      0x1f45b, 0x1f45c, 0x1f45d, 0x1f6cd, 0x1f392, 0x1f45e,
                      0x1f45f, 0x1f460, 0x1f461, 0x1f462, 0x1f451, 0x1f452,
                      0x1f3a9, 0x1f393, 0x1f9e2, 0x26d1, 0x1f4ff, 0x1f484,
                      0x1f48d, 0x1f48e, 0x1f435, 0x1f412, 0x1f98d, 0x1f436,
                      0x1f415, 0x1f429, 0x1f43a, 0x1f98a, 0x1f431, 0x1f408,
                      0x1f981, 0x1f42f, 0x1f405, 0x1f406, 0x1f434, 0x1f40e,
                      0x1f984, 0x1f993, 0x1f98c, 0x1f42e, 0x1f402, 0x1f403,
                      0x1f404, 0x1f437, 0x1f416, 0x1f417, 0x1f43d, 0x1f40f,
                      0x1f411, 0x1f410, 0x1f42a, 0x1f42b, 0x1f992, 0x1f418,
                      0x1f98f, 0x1f42d, 0x1f401, 0x1f400, 0x1f439, 0x1f430,
                      0x1f407, 0x1f43f, 0x1f994, 0x1f987, 0x1f43b, 0x1f428,
                      0x1f43c, 0x1f43e, 0x1f983, 0x1f414, 0x1f413, 0x1f423,
                      0x1f424, 0x1f425, 0x1f426, 0x1f427, 0x1f54a, 0x1f985,
                      0x1f986, 0x1f989, 0x1f438, 0x1f40a, 0x1f422, 0x1f98e,
                      0x1f40d, 0x1f432, 0x1f409, 0x1f995, 0x1f996, 0x1f433,
                      0x1f40b, 0x1f42c, 0x1f41f, 0x1f420, 0x1f421, 0x1f988,
                      0x1f419, 0x1f41a, 0x1f980, 0x1f990, 0x1f991, 0x1f40c,
                      0x1f98b, 0x1f41b, 0x1f41c, 0x1f41d, 0x1f41e, 0x1f997,
                      0x1f577, 0x1f578, 0x1f982, 0x1f490, 0x1f338, 0x1f4ae,
                      0x1f3f5, 0x1f339, 0x1f940, 0x1f33a, 0x1f33b, 0x1f33c,
                      0x1f337, 0x1f331, 0x1f332, 0x1f333, 0x1f334, 0x1f335,
                      0x1f33e, 0x1f33f, 0x2618, 0x1f340, 0x1f341, 0x1f342,
                      0x1f343, 0x1f347, 0x1f348, 0x1f349, 0x1f34a, 0x1f34b,
                      0x1f34c, 0x1f34d, 0x1f34e, 0x1f34f, 0x1f350, 0x1f351,
                      0x1f352, 0x1f353, 0x1f95d, 0x1f345, 0x1f965, 0x1f951,
                      0x1f346, 0x1f954, 0x1f955, 0x1f33d, 0x1f336, 0x1f952,
                      0x1f966, 0x1f344, 0x1f95c, 0x1f330, 0x1f35e, 0x1f950,
                      0x1f956, 0x1f968, 0x1f95e, 0x1f9c0, 0x1f356, 0x1f357,
                      0x1f969, 0x1f953, 0x1f354, 0x1f35f, 0x1f355, 0x1f32d,
                      0x1f96a, 0x1f32e, 0x1f32f, 0x1f959, 0x1f95a, 0x1f373,
                      0x1f958, 0x1f372, 0x1f963, 0x1f957, 0x1f37f, 0x1f96b,
                      0x1f371, 0x1f358, 0x1f359, 0x1f35a, 0x1f35b, 0x1f35c,
                      0x1f35d, 0x1f360, 0x1f362, 0x1f363, 0x1f364, 0x1f365,
                      0x1f361, 0x1f95f, 0x1f960, 0x1f961, 0x1f366, 0x1f367,
                      0x1f368, 0x1f369, 0x1f36a, 0x1f382, 0x1f370, 0x1f967,
                      0x1f36b, 0x1f36c, 0x1f36d, 0x1f36e, 0x1f36f, 0x1f37c,
                      0x1f95b, 0x2615, 0x1f375, 0x1f376, 0x1f37e, 0x1f377,
                      0x1f378, 0x1f379, 0x1f37a, 0x1f37b, 0x1f942, 0x1f943,
                      0x1f964, 0x1f962, 0x1f37d, 0x1f374, 0x1f944, 0x1f52a,
                      0x1f3fa, 0x1f30d, 0x1f30e, 0x1f30f, 0x1f310, 0x1f5fa,
                      0x1f5fe, 0x1f3d4, 0x26f0, 0x1f30b, 0x1f5fb, 0x1f3d5,
                      0x1f3d6, 0x1f3dc, 0x1f3dd, 0x1f3de, 0x1f3df, 0x1f3db,
                      0x1f3d7, 0x1f3d8, 0x1f3da, 0x1f3e0, 0x1f3e1, 0x1f3e2,
                      0x1f3e3, 0x1f3e4, 0x1f3e5, 0x1f3e6, 0x1f3e8, 0x1f3e9,
                      0x1f3ea, 0x1f3eb, 0x1f3ec, 0x1f3ed, 0x1f3ef, 0x1f3f0,
                      0x1f492, 0x1f5fc, 0x1f5fd, 0x26ea, 0x1f54c, 0x1f54d,
                      0x26e9, 0x1f54b, 0x26f2, 0x26fa, 0x1f301, 0x1f303,
                      0x1f3d9, 0x1f304, 0x1f305, 0x1f306, 0x1f307, 0x1f309,
                      0x2668, 0x1f30c, 0x1f3a0, 0x1f3a1, 0x1f3a2, 0x1f488,
                      0x1f3aa, 0x1f682, 0x1f683, 0x1f684, 0x1f685, 0x1f686,
                      0x1f687, 0x1f688, 0x1f689, 0x1f68a, 0x1f69d, 0x1f69e,
                      0x1f68b, 0x1f68c, 0x1f68d, 0x1f68e, 0x1f690, 0x1f691,
                      0x1f692, 0x1f693, 0x1f694, 0x1f695, 0x1f696, 0x1f697,
                      0x1f698, 0x1f699, 0x1f69a, 0x1f69b, 0x1f69c, 0x1f6b2,
                      0x1f6f4, 0x1f6f5, 0x1f68f, 0x1f6e3, 0x1f6e4, 0x1f6e2,
                      0x26fd, 0x1f6a8, 0x1f6a5, 0x1f6a6, 0x1f6d1, 0x1f6a7,
                      0x2693, 0x26f5, 0x1f6f6, 0x1f6a4, 0x1f6f3, 0x26f4,
                      0x1f6e5, 0x1f6a2, 0x2708, 0x1f6e9, 0x1f6eb, 0x1f6ec,
                      0x1f4ba, 0x1f681, 0x1f69f, 0x1f6a0, 0x1f6a1, 0x1f6f0,
                      0x1f680, 0x1f6f8, 0x1f6ce, 0x231b, 0x23f3, 0x231a, 0x23f0,
                      0x23f1, 0x23f2, 0x1f570, 0x1f55b, 0x1f567, 0x1f550,
                      0x1f55c, 0x1f551, 0x1f55d, 0x1f552, 0x1f55e, 0x1f553,
                      0x1f55f, 0x1f554, 0x1f560, 0x1f555, 0x1f561, 0x1f556,
                      0x1f562, 0x1f557, 0x1f563, 0x1f558, 0x1f564, 0x1f559,
                      0x1f565, 0x1f55a, 0x1f566, 0x1f311, 0x1f312, 0x1f313,
                      0x1f314, 0x1f315, 0x1f316, 0x1f317, 0x1f318, 0x1f319,
                      0x1f31a, 0x1f31b, 0x1f31c, 0x1f321, 0x2600, 0x1f31d,
                      0x1f31e, 0x2b50, 0x1f31f, 0x1f320, 0x2601, 0x26c5, 0x26c8,
                      0x1f324, 0x1f325, 0x1f326, 0x1f327, 0x1f328, 0x1f329,
                      0x1f32a, 0x1f32b, 0x1f32c, 0x1f300, 0x1f308, 0x1f302,
                      0x2602, 0x2614, 0x26f1, 0x26a1, 0x2744, 0x2603, 0x26c4,
                      0x2604, 0x1f525, 0x1f4a7, 0x1f30a, 0x1f383, 0x1f384,
                      0x1f386, 0x1f387, 0x2728, 0x1f388, 0x1f389, 0x1f38a,
                      0x1f38b, 0x1f38d, 0x1f38e, 0x1f38f, 0x1f390, 0x1f391,
                      0x1f380, 0x1f381, 0x1f397, 0x1f39f, 0x1f3ab, 0x1f396,
                      0x1f3c6, 0x1f3c5, 0x1f947, 0x1f948, 0x1f949, 0x26bd,
                      0x26be, 0x1f94e, 0x1f3c0, 0x1f3d0, 0x1f3c8, 0x1f3c9,
                      0x1f3be, 0x1f3b3, 0x1f3cf, 0x1f3d1, 0x1f3d2, 0x1f3d3,
                      0x1f3f8, 0x1f94a, 0x1f945, 0x26f3, 0x26f8, 0x1f3a3,
                      0x1f3bd, 0x1f3bf, 0x1f6f7, 0x1f94c, 0x1f3af, 0x1f3b1,
                      0x1f52e, 0x1f3ae, 0x1f579, 0x1f3b0, 0x1f3b2, 0x2660,
                      0x2665, 0x2666, 0x2663, 0x265f, 0x1f0cf, 0x1f004, 0x1f3b4,
                      0x1f3ad, 0x1f5bc, 0x1f3a8, 0x1f507, 0x1f508, 0x1f509,
                      0x1f50a, 0x1f4e2, 0x1f4e3, 0x1f4ef, 0x1f514, 0x1f515,
                      0x1f3bc, 0x1f3b5, 0x1f3b6, 0x1f399, 0x1f39a, 0x1f39b,
                      0x1f3a4, 0x1f3a7, 0x1f4fb, 0x1f3b7, 0x1f3b8, 0x1f3b9,
                      0x1f3ba, 0x1f3bb, 0x1f941, 0x1f4f1, 0x1f4f2, 0x260e,
                      0x1f4de, 0x1f4df, 0x1f4e0, 0x1f50b, 0x1f50c, 0x1f4bb,
                      0x1f5a5, 0x1f5a8, 0x2328, 0x1f5b1, 0x1f5b2, 0x1f4bd,
                      0x1f4be, 0x1f4bf, 0x1f4c0, 0x1f3a5, 0x1f39e, 0x1f4fd,
                      0x1f3ac, 0x1f4fa, 0x1f4f7, 0x1f4f8, 0x1f4f9, 0x1f4fc,
                      0x1f50d, 0x1f50e, 0x1f56f, 0x1f4a1, 0x1f526, 0x1f3ee,
                      0x1f4d4, 0x1f4d5, 0x1f4d6, 0x1f4d7, 0x1f4d8, 0x1f4d9,
                      0x1f4da, 0x1f4d3, 0x1f4d2, 0x1f4c3, 0x1f4dc, 0x1f4c4,
                      0x1f4f0, 0x1f5de, 0x1f4d1, 0x1f516, 0x1f3f7, 0x1f4b0,
                      0x1f4b4, 0x1f4b5, 0x1f4b6, 0x1f4b7, 0x1f4b8, 0x1f4b3,
                      0x1f4b9, 0x1f4b1, 0x1f4b2, 0x2709, 0x1f4e7, 0x1f4e8,
                      0x1f4e9, 0x1f4e4, 0x1f4e5, 0x1f4e6, 0x1f4eb, 0x1f4ea,
                      0x1f4ec, 0x1f4ed, 0x1f4ee, 0x1f5f3, 0x270f, 0x2712,
                      0x1f58b, 0x1f58a, 0x1f58c, 0x1f58d, 0x1f4dd, 0x1f4bc,
                      0x1f4c1, 0x1f4c2, 0x1f5c2, 0x1f4c5, 0x1f4c6, 0x1f5d2,
                      0x1f5d3, 0x1f4c7, 0x1f4c8, 0x1f4c9, 0x1f4ca, 0x1f4cb,
                      0x1f4cc, 0x1f4cd, 0x1f4ce, 0x1f587, 0x1f4cf, 0x1f4d0,
                      0x2702, 0x1f5c3, 0x1f5c4, 0x1f5d1, 0x1f512, 0x1f513,
                      0x1f50f, 0x1f510, 0x1f511, 0x1f5dd, 0x1f528, 0x26cf,
                      0x2692, 0x1f6e0, 0x1f5e1, 0x2694, 0x1f52b, 0x1f3f9,
                      0x1f6e1, 0x1f527, 0x1f529, 0x2699, 0x1f5dc, 0x2696,
                      0x1f517, 0x26d3, 0x2697, 0x1f52c, 0x1f52d, 0x1f4e1,
                      0x1f489, 0x1f48a, 0x1f6aa, 0x1f6cf, 0x1f6cb, 0x1f6bd,
                      0x1f6bf, 0x1f6c1, 0x1f6d2, 0x1f6ac, 0x26b0, 0x26b1,
                      0x1f5ff, 0x1f3e7, 0x1f6ae, 0x1f6b0, 0x267f, 0x1f6b9,
                      0x1f6ba, 0x1f6bb, 0x1f6bc, 0x1f6be, 0x1f6c2, 0x1f6c3,
                      0x1f6c4, 0x1f6c5, 0x26a0, 0x1f6b8, 0x26d4, 0x1f6ab,
                      0x1f6b3, 0x1f6ad, 0x1f6af, 0x1f6b1, 0x1f6b7, 0x1f4f5,
                      0x1f51e, 0x2622, 0x2623, 0x2b06, 0x2197, 0x27a1, 0x2198,
                      0x2b07, 0x2199, 0x2b05, 0x2196, 0x2195, 0x2194, 0x21a9,
                      0x21aa, 0x2934, 0x2935, 0x1f503, 0x1f504, 0x1f519,
                      0x1f51a, 0x1f51b, 0x1f51c, 0x1f51d,
                    ];

                    emojis.map(function (item) {
                      var emojiLi = document.createElement("li");
                      emojiLi.style.display = "inline-block";
                      emojiLi.style.margin = "5px";

                      var emojiLink = document.createElement("a");
                      emojiLink.style.textDecoration = "none";
                      emojiLink.style.margin = "5px";
                      emojiLink.style.position = "initial";
                      emojiLink.style.fontSize = "24px";
                      emojiLink.setAttribute("href", "javascript:void(0)");
                      emojiLink.innerHTML = String.fromCodePoint(item);
                      emojiLink.onmousedown = clickLink;

                      emojiList.appendChild(emojiLink);
                    });

                    emojiPicker.appendChild(emojiList);
                    emojiContainer.appendChild(emojiPicker);
                  },
                },
              ]);

              return EmojiPicker;
            })();

            module.exports = EmojiPicker;
          });
        },
        {},
      ],
    },
    {},
    [1]
  )(1);
});
