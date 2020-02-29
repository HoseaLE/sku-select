# sku-select
sku属性计算，输入选中属性，返回属性可选状态

### Installation

npm install sku-calculate

### Usage

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
    return (
      <div>
      
      </div>
    );
  }
}



```