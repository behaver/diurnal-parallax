'use strict';

const IAU1976Seqs = require('../data/IAU1976');
const PrecessionBase = require('./PrecessionBase');

/**
 * PrecessionIAU1976
 *
 * PrecessionIAU1976 是以 IAU1976 为模型的岁差计算组件
 * 单位：角秒
 *
 * @author 董 三碗 <qianxing@yeah.net>
 * @version 1.0.0
 * @license MIT
 */
class PrecessionIAU1976 extends PrecessionBase {
  
  /**
   * 构造函数
   * 
   * @param  {JDateRepository} jdr 儒略时间仓库 对象
   */
  constructor(jdr) {
    super(jdr);

    // 初始化运算序列
    this.seqs = IAU1976Seqs;
  }
}

module.exports = PrecessionIAU1976;
