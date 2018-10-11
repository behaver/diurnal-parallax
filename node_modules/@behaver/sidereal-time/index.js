'use strict';

const { JDateRepository, CacheSpaceOnJDate } = require('@behaver/jdate');
const { PrecessionIAU2006, PrecessionIAU2000, PrecessionIAU1976 } = require('@behaver/precession');
const { NutationIAU2000B, NutationLP } = require('@behaver/nutation');
const Angle = require('@behaver/angle');

const angle = new Angle;

/**
 * SiderealTime
 *
 * SiderealTime 是用于恒星时计算的组件
 *
 * @author 董 三碗 <qianxing@yeah.net>
 * @version 1.0.0
 */
class SiderealTime {

  /**
   * 构造函数
   * 
   * @param  {JDateRepository} obTime                  观测时间
   * @param  {Number}          obGLon                  观测经度
   *                                                   单位：度
   * @param  {String}          options.precessionModel 岁差计算模型
   *                                                   包含：iau2006、iau2000、iau1976
   * @param  {String}          options.nutationModel   章动计算模型
   *                                                   包含：iau2000b、lp
   */
  constructor(obTime, obGLon = 0, {
    precessionModel, 
    nutationModel, 
  } = { 
    precessionModel: 'IAU2006', 
    nutationModel: 'IAU2000B', 
  }) {
    if (precessionModel == undefined) precessionModel = 'IAU2006';
    if (nutationModel == undefined) nutationModel = 'IAU2000B';

    if (!(obTime instanceof JDateRepository)) throw Error('The param obTime should be a instance of JDateRepository');
    if (typeof(obGLon) !== 'number') throw Error('The param obGLon should be a Number.');
    if (obGLon < -180 || obGLon > 180) throw Error('The param obGLon should be in [-180, 180]');
    if (typeof(precessionModel) !== 'string') throw Error('The param precessionModel should be a String.');
    if (typeof(nutationModel) !== 'string') throw Error('The param nutationModel should be a String.');

    switch(precessionModel.toLowerCase()) {
      case 'iau2006':
        this.precession = new PrecessionIAU2006(obTime);
        break;
      case 'iau2000':
        this.precession = new PrecessionIAU2000(obTime);
        break;
      case 'iau1976':
        this.precession = new PrecessionIAU1976(obTime);
        break;
      default:
        throw Error('The param precessionModel should be in ["IAU2006", "IAU2000", "IAU1976"]');
    }

    switch(nutationModel.toLowerCase()) {
      case 'iau2000b':
        this.nutation = new NutationIAU2000B(obTime);
        break;
      case 'lp':
        this.nutation = new NutationLP(obTime);
        break;
      default:
        throw Error('The param nutationModel should be in ["IAU2000B", "LP"]');
    }

    this.obTime = obTime;
    this.obGLon = obGLon;
    this.precessionModel = precessionModel;
    this.nutationModel = nutationModel;

    this.cache = new CacheSpaceOnJDate(this.obTime);
  }

  /**
   * 获取 地球自转角(ERA)
   *
   * @return {Number} 地球自转角度，单位：角秒
   */
  get ERA() {
    if (!this.cache.has('ERA')) {
      let obl = angle.setDegrees(this.obGLon).getRadian();
      this.cache.ERA = angle.setRadian(2 * Math.PI * (0.7790572732640 + 1.00273781191135448 * (this.obTime.JD - 2451545.0)) - obl).inRound().getSeconds();
    }
    
    return this.cache.ERA;
  }

  /**
   * 获取 平恒星时
   * 
   * @return {Number} 平恒星时，单位：角秒
   */
  get meanVal() {
    if (!this.cache.has('meanVal')) {
      this.cache.meanVal = this.ERA + this.precession.z + this.precession.zeta;
    }
    
    return this.cache.meanVal;
  }

  /**
   * 获取 真恒星时
   * 
   * @return {Number} 真恒星时，单位：角秒
   */
  get trueVal() {
    if (!this.cache.has('trueVal')) {
      let e0 = angle.setSeconds(this.precession.epsilon).getRadian();
      let delta_e = angle.setMilliseconds(this.nutation.obliquity).getRadian();
      let delta_psi = angle.setMilliseconds(this.nutation.longitude).getRadian();

      // 赤经章动：Δψ * cos(ε)，式中 Δψ 是黄经章动，ε 是真黄赤交角
      let ra_nutation = angle.setRadian(delta_psi * Math.cos(e0 + delta_e)).getSeconds();

      this.cache.trueVal = this.meanVal + ra_nutation;
    }

    return this.cache.trueVal;
  }
}

module.exports = SiderealTime;
