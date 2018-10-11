'use strict';

const { JDateRepository, CacheSpaceOnJDate } = require('@behaver/jdate');

/**
 * PrecessionBase
 *
 * PrecessionBase 是IAU岁差计算组件的基类，提供基本操作的继承。
 *
 * @private
 * @author 董 三碗 <qianxing@yeah.net>
 * @version 1.0.0
 * @license MIT
 */
class PrecessionBase {

  /**
   * 构造函数
   * 
   * @param  {JDateRepository} jdr 儒略时间仓库 对象
   */
  constructor(jdr) {
    this.on(jdr);
  }

  /**
   * 设定 儒略时间 JDateRepository 对象
   * 
   * @param  {JDateRepository} jdr 儒略时间仓库 对象
   * @return {Precession}          返回 this 引用
   */
  on(jdr) {
    if (jdr === undefined || jdr.constructor !== JDateRepository) throw Error('The param jdr has to be a JDateRepository.');

    this.jdr = jdr;

    // 清空缓存数据
    this.cache = new CacheSpaceOnJDate(this.jdr);;

    return this;
  }

  /**
   * 获取 岁差计算项 数值
   *
   * 单位：角秒
   *
   * @param  {String} key          岁差计算项
   * @return {Number}              计算结果
   */
  get(key) {
    if (key === 'epsilon0') return this.seqs['epsilon'][0];
    else if (key in this.seqs) {
      if (!this.cache.has(key)) {
        this.cache.set(key, this.calc(key));
      }

      return this.cache.get(key);
    } else throw Error('The param key is illegality.')
  }

  /**
   * 岁差项运算（运算结果不进入缓存）
   *
   * @private
   * @param  {String} key          岁差计算项
   * @return {Number}              计算结果
   */
  calc(key) {
    // 指定的项数据
    const idata = this.seqs[key];

    let res = 0;

    // 执行累加计算
    for (var i = 0; i < idata.length; i++) {
      res += idata[i] * this.jdr.JDECP(i);
    }

    return res;
  }

  /**
   * 获取 岁差计算项 Ρ 的数值
   *
   * 黄道岁差 P = sin(pi) * sin(II)
   * 单位：角秒
   *
   * @return {Number}              Ρ 的数值
   */
  get P() {
    return this.get('P');
  }

  /**
   * 获取 岁差计算项 Q 的数值
   *
   * 黄道岁差 Q = sin(pi) * cos(Π)
   * 单位：角秒
   *
   * @return {Number}              Q 的数值
   */
  get Q() {
    return this.get('Q');
  }

  /**
   * 获取 岁差计算项 η 的数值
   *
   * 单位：角秒
   *
   * @return {Number}              η 的数值
   */
  get eta() {
    return this.get('eta');
  }

  /**
   * 获取 岁差计算项 Π 的数值
   *
   * 单位：角秒
   *
   * @return {Number}              Π 的数值
   */
  get pi() {
    return this.get('pi');
  }

  /**
   * 获取 岁差计算项 ι 的数值
   *
   * 单位：角秒
   *
   * @return {Number}              ι 的数值
   */
  get p() {
    return this.get('p');
  }

  /**
   * 获取 岁差计算项 ε0 的数值
   *
   * 单位：角秒
   *
   * @return {Number}              ε0 的数值
   */
  get epsilon0() {
    return this.get('epsilon0');
  }

  /**
   * 获取 岁差计算项 ε 的数值
   *
   * 单位：角秒
   *
   * @return {Number}              ε 的数值
   */
  get epsilon() {
    return this.get('epsilon');
  }

  /**
   * 获取 岁差计算项 χ 的数值
   *
   * 单位：角秒
   *
   * @return {Number}              χ 的数值
   */
  get chi() {
    return this.get('chi');
  }

  /**
   * 获取 岁差计算项 ω 的数值
   *
   * 单位：角秒
   *
   * @return {Number}              ω 的数值
   */
  get omega() {
    return this.get('omega');
  }

  /**
   * 获取 岁差计算项 ψ 的数值
   *
   * 单位：角秒
   *
   * @return {Number}              ψ 的数值
   */
  get psi() {
    return this.get('psi');
  }

  /**
   * 获取 岁差计算项 θ 的数值
   *
   * 单位：角秒
   *
   * @return {Number}              θ 的数值
   */
  get theta() {
    return this.get('theta');
  }

  /**
   * 获取 岁差计算项 ζ 的数值
   *
   * 单位：角秒
   *
   * @return {Number}              ζ 的数值
   */
  get zeta() {
    return this.get('zeta');
  }

  /**
   * 获取 岁差计算项 zA 的数值
   *
   * 单位：角秒
   *
   * @return {Number}              zA 的数值
   */
  get z() {
    return this.get('z');
  }
}

module.exports = PrecessionBase;
