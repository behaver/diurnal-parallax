'use strict';

const NutationBase = require('./NutationBase');

// 低精度 章动序列
const LPSeq = require('../data/LP');

/**
 * NutationLP
 *
 * NutationLP 是以 J2000 为参照点，低精度快速章动计算组件
 *
 * @author 董 三碗 <qianxing@yeah.net>
 * @version 1.0.0
 * @license MIT
 */
class NutationLP extends NutationBase {

  /**
   * 低精度快速模型的章动计算过程
   *
   * @private
   * @return {Object} 章动数值对象
   *                  单位：角毫秒
   */
  calc() {
    let t = this.jdr.JDEC, 
        t2 = this.jdr.JDECP(2), 
        t3 = this.jdr.JDECP(3), 
        t4 = this.jdr.JDECP(4);

    let ln = 0,
        on = 0;

    for (let i = 0; i < LPSeq.length; i++) {
      let c = LPSeq[i][0] + LPSeq[i][1] * t + LPSeq[i][2] * t2 + LPSeq[i][3] * t3 + LPSeq[i][4] * t4;

      ln += (LPSeq[i][5] + LPSeq[i][6] * t / 10) * Math.sin(c);
      on += (LPSeq[i][7] + LPSeq[i][8] * t / 10) * Math.cos(c);
    };

    return { longitude: ln * 0.1, obliquity: on * 0.1 };
  }
};

module.exports = NutationLP;
