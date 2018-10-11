'use strict';

const IAU2000Seqs = require('../data/IAU2000');
const PrecessionBase = require('./PrecessionBase');

/**
 * PrecessionIAU2000
 *
 * PrecessionIAU2000 是以 IAU2000 为模型的岁差计算组件
 * 单位：角秒
 *
 * @author 董 三碗 <qianxing@yeah.net>
 * @version 1.0.0
 * @license MIT
 */
class PrecessionIAU2000 extends PrecessionBase {

  /**
   * 构造函数
   * 
   * @param  {JDateRepository} jdr 儒略时间仓库 对象
   */
  constructor(jdr) {
    super(jdr);

    // 初始化运算序列
    this.seqs = IAU2000Seqs;
  }
}

module.exports = PrecessionIAU2000;
