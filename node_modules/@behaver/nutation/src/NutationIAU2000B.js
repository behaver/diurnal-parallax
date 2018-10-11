'use strict';

const NutationBase = require('./NutationBase');
const Angle = require('@behaver/angle');

// IAU2000B 章动序列
const IAU2000BSeq = require('../data/IAU2000B');

/**
 * NutationIAU2000B
 *
 * NutationIAU2000B 是以历元时间 J2000 为参照点，使用 IAU2000B 为模型的章动计算组件
 *
 * 返回计算结果的单位为：角毫秒
 *
 * @author 董 三碗 <qianxing@yeah.net>
 * @version 1.0.0
 * @license MIT
 */
class NutationIAU2000B extends NutationBase {

  /**
   * IAU2000B 模型的章动计算过程
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

    // 计算单位：角毫秒
    let l = 485868.249036 + 1717915923.2178 * t + 31.8792 * t2 + 0.051635 * t3 - 0.00024470 * t4;
    let l1 = 1287104.79305 + 129596581.0481 * t - 0.5532 * t2 - 0.000136 * t3 - 0.00001149 * t4;
    let F = 335779.526232 + 1739527262.8478 * t - 12.7512 * t2 - 0.001037 * t3 + 0.00000417 * t4;
    let D = 1072260.70369 + 1602961601.2090 * t - 6.3706 * t2 + 0.006593 * t3 - 0.00003169 * t4;
    let Om = 450160.398036 - 6962890.5431 * t + 7.4722 * t2 + 0.007702 * t3 - 0.00005939 * t4;

    let angle = new Angle;

    // 初始黄经章动角度
    let ln = 0;

    // 初始交角章动角度
    let on = 0;

    for (let i = 0; i < IAU2000BSeq.length; i++) {
      let c_rad = angle
        .setSeconds(IAU2000BSeq[i][0] * l + IAU2000BSeq[i][1] * l1 + IAU2000BSeq[i][2] * F + IAU2000BSeq[i][3] * D + IAU2000BSeq[i][4] * Om)
        .getRadian();

      let sin_c = Math.sin(c_rad);
      let cos_c = Math.cos(c_rad);

      ln += (IAU2000BSeq[i][5] + IAU2000BSeq[i][6] * t) * sin_c + IAU2000BSeq[i][7] * cos_c;
      on += (IAU2000BSeq[i][8] + IAU2000BSeq[i][9] * t) * cos_c + IAU2000BSeq[i][10] * sin_c;
    }

    return { longitude: ln / 10000, obliquity: on / 10000 };
  }
}

module.exports = NutationIAU2000B;
