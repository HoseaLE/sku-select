# sku-calculate
sku属性计算，输入选中属性，返回属性可选状态

### 安装

npm install sku-calculate

### 用法

```javascript

import React, { Component } from 'react';
import Sku from 'sku-calculate';

class Demo extends Component {
  constructor(props, context) {
    super(props, context);
    this.state={};
  }

  componentDidMount(){
    const spec = {
      '颜色': ['红色', '蓝色'],
      '内存': ['4G','6G', '8G']
    };
    const skus = [
      {
        attr:{
          '颜色': '蓝色',
          '内存': '6G'
        },
        amount: 10,
      },
      {
        attr: {
          '颜色': '红色',
          '内存':'8G'
        },
        amount: 20,
      },
      {
        attr: {
          '颜色': '蓝色',
          '内存': '8G'
        },
        amount: 30,
      }
    ];
    this.sku = new Sku({ spec, skus });
    
  }
 
  render() {
    const selSpec = {
      '颜色': '蓝色',
      '内存': '6G'
    }
    if (this.sku) {
      const { specStatus, selectedSku } = this.sku.selectSpec(selSpec, 1);
      // specStatus
      // {
      //   "颜色":[
      //     {"value":"红色","selectable":true},
      //     {"value":"蓝色","active":true}
      //   ],
      //   "内存":[
      //     {"value":"4G","selectable":false},
      //     {"value":"8G","selectable":true},
      //     {"value":"6G","active":true}
      //   ]
      // }
      
      // selectedSku
      // {"attr":{"颜色":"蓝色","内存":"6G"},"amount":10} 
    }
    
    return (
      <div>
      
      </div>
    );
  }
}

```

### 说明

1. const s = new Sku(opt)
  * opt为对象，接受两个参数spec, skus， spec为所有属性对象， skus为sku列表，里面包含该sku的属性和数量

2. 实例上有个方法selectSpec(attr, amount)
  * 接收两个参数，attr为此次输入的所选属性值；amount为此次所选数量，默认为1
  * 返回一个对象{ specStatus, selectedSku }, specStatus为所有属性状态（包含选中态active和是否可选态selectable），selectedSku为当次选中的sku对象