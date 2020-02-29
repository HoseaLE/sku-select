"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } }

function _createClass(Constructor, protoProps, staticProps) { if (protoProps) _defineProperties(Constructor.prototype, protoProps); if (staticProps) _defineProperties(Constructor, staticProps); return Constructor; }

/**
 * @param {object} spec 所有属性及其值 {age:[10,20,30],'性别':['男','女']}
 * @param {array} skus sku列表 [{attr:{ age:20, '性别': '男' }, amount: 99 }]
 */
var Sku = /*#__PURE__*/function () {
  function Sku(props) {
    _classCallCheck(this, Sku);

    var _props$spec = props.spec,
        spec = _props$spec === void 0 ? {} : _props$spec,
        _props$skus = props.skus,
        skus = _props$skus === void 0 ? [] : _props$skus;
    this.spec = spec;
    this.skus = skus;
  }
  /**
   * @param {object} attr 插入选中的属性 { age:20 }
   * @param {number} amount 选中的数量
   * @return {object} 返回属性的选中状态、可选状态; 选中的sku { specStatus: object, selectedSku: object }
   */


  _createClass(Sku, [{
    key: "selectSpec",
    value: function selectSpec() {
      var _this = this;

      var attr = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : {};
      var amount = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : 1;
      // // 选中的sku
      var selectedSku = this.skus.find(function (item) {
        var flag = true;
        var atr = item.attr;

        for (var o in atr) {
          if ('' + atr[o] !== '' + attr[o]) {
            flag = false;
          }
        }

        ;
        return flag;
      }); // 剩余的skus

      var extraSku = this.skus; // const extraSku = this.skus.filter(item => {
      //   let flag = true;
      //   for (let o in preSelected) {
      //     // 只要存在不等， 就是没选中
      //     if (preSelected[o] + '' !== '' + item.attr[o]) {
      //       flag = false;
      //     };
      //   }
      //   return flag
      // });
      // 剩余的属性

      var extraSpec = {};

      var _loop = function _loop(o) {
        var vals = _this.spec[o].filter(function (item) {
          return '' + item !== '' + attr[o];
        });

        if (vals) {
          // 默认剩余属性都不可选
          extraSpec[o] = vals.map(function (item) {
            return {
              value: item,
              selectable: false
            };
          });
        }

        ;
      };

      for (var o in this.spec) {
        _loop(o);
      }

      ; // 判断是否可选

      if (extraSku) {
        var _loop2 = function _loop2(_o) {
          // 未被选择的属性值
          var atr = extraSpec[_o]; // [{value:'', selectable: false}];
          // 排除该项后，已被选择的属性

          var otherAtr = Object.entries(attr).map(function (s) {
            return '' + s[0] !== '' + _o;
          });
          atr.forEach(function (item) {
            // 是否存在可选属性
            var hasAtr = extraSku.find(function (obj) {
              var flag = true;
              otherAtr.forEach(function (val) {
                if (obj.attr[val[0]] !== val[1]) {
                  flag = false;
                }
              }); // 该项 + 已被选中的值 都满足才可选

              return '' + obj.attr[_o] === '' + item.value && flag;
            });

            if (hasAtr && hasAtr.amount >= 1 && amount <= hasAtr.amount) {
              item.selectable = true;
            }
          });
        };

        for (var _o in extraSpec) {
          _loop2(_o);
        }
      } // 选中的属性加入extraSpec


      for (var _o2 in extraSpec) {
        if (attr[_o2]) {
          extraSpec[_o2].push({
            value: attr[_o2],
            active: true
          });
        }
      }

      return {
        specStatus: extraSpec,
        selectedSku: selectedSku
      };
    }
  }]);

  return Sku;
}();

var _default = Sku;
exports["default"] = _default;