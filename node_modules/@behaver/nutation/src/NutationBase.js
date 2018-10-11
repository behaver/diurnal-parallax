'use strict';

const { JDateRepository, CacheSpaceOnJDate } = require('@behaver/jdate');

/**
 * NutationBase
 *
 * NutationBase 是章动计算组件的基类，提供基本操作的继承。
 *
 * @private
 * @author 董 三碗 <qianxing@yeah.net>
 * @version 1.0.0
 * @license MIT
 */
class NutationBase {

  /**
   * 构造函数
   * 
   * @param  {JDateRepository} jdr 儒略时间仓库 对象
   */
  constructor(jdr) {
    this.on(jdr);
  }

  /**
   * 设定 儒略时间仓库 对象
   * 
   * @param  {JDateRepository} jdr 儒略时间仓库 对象
   * @return {Nutation}            返回 this 引用
   */
  on(jdr) {
    if (jdr === undefined || jdr.constructor !== JDateRepository) throw Error('The param jdr has to be a JDateRepository.');

    this.jdr = jdr;

    this.cache = new CacheSpaceOnJDate(this.jdr);

    return this;
  }

  /**
   * 获取黄经章动角度
   * 
   * @return {Number}              黄经章动角度
   *                               单位：角毫秒
   */
  get longitude() {
    if (!this.cache.has('longitude')) {
      let nut = this.calc();
      this.cache.longitude = nut.longitude;
      this.cache.obliquity = nut.obliquity;
    }

    return this.cache.longitude;
  }

  /**
   * 获取交角章动角度
   * 
   * @return {Number}              交角章动角度
   *                               单位：角毫秒
   */
  get obliquity() {
    if (!this.cache.has('obliquity')) {
      let nut = this.calc();
      this.cache.longitude = nut.longitude;
      this.cache.obliquity = nut.obliquity;
    }

    return this.cache.obliquity;
  }

  calc() {
    return { longitude: 0, obliquity: 0 }
  }
}

module.exports = NutationBase;
