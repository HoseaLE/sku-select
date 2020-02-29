

/**
 * @param {object} spec 所有属性及其值 {age:[10,20,30],'性别':['男','女']}
 * @param {array} skus sku列表 [{attr:{ age:20, '性别': '男' }, amount: 99 }]
 */
class Sku {
  constructor(props) {
    const { spec = {}, skus = [] } = props;
    this.spec = spec;
    this.skus = skus;
  }

  /**
   * @param {object} attr 插入选中的属性 { age:20 }
   * @param {number} amount 选中的数量
   * @return {object} 返回属性的选中状态、可选状态; 选中的sku { specStatus: object, selectedSku: object }
   */
  selectSpec(attr = {}, amount = 1) {

    // // 选中的sku
    const selectedSku = this.skus.find(item => {
      let flag = true;
      const atr = item.attr;
      for (let o in atr) {
        if ('' + atr[o] !== '' + attr[o]) {
          flag = false
        }
      };
      return flag
    });

    // 剩余的skus
    const extraSku = this.skus;
    // const extraSku = this.skus.filter(item => {
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
    const extraSpec = {};
    for (let o in this.spec) {
      const vals = this.spec[o].filter(item => '' + item !== '' + attr[o]);
      if (vals) {
        // 默认剩余属性都不可选
        extraSpec[o] = vals.map(item => ({ value: item, selectable: false }))
      };
    };

    // 判断是否可选
    if (extraSku) {
      for (let o in extraSpec) {

        // 未被选择的属性值
        const atr = extraSpec[o];// [{value:'', selectable: false}];

        // 排除该项后，已被选择的属性
        const otherAtr = Object.entries(attr).map(s => '' + s[0] !== '' + o);

        atr.forEach(item => {
          // 是否存在可选属性
          const hasAtr = extraSku.find(obj => {
            let flag = true;
            otherAtr.forEach(val => {
              if (obj.attr[val[0]] !== val[1]) {
                flag = false
              }
            });

            // 该项 + 已被选中的值 都满足才可选
            return '' + obj.attr[o] === '' + item.value && flag
          });
          if (hasAtr && hasAtr.amount >= 1 && amount <= hasAtr.amount) {
            item.selectable = true;
          }
        });
      }
    }

    // 选中的属性加入extraSpec
    for (let o in extraSpec) {
      if (attr[o]) {
        extraSpec[o].push({ value: attr[o], active: true })
      }
    }
    return { specStatus: extraSpec, selectedSku };

  }

}

export default Sku
