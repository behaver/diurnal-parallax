'use strict';

const expect = require("chai").expect;
const { JDateRepository, JDate } = require('@behaver/jdate');
const Angle = require('@behaver/angle');
const SiderealTime = require('../index');

const angle = new Angle;

describe('#SiderealTime', () => {
  describe('#constructor', () => {
    it('The param obTime should be a JDateRepository', () => {
      expect(() => {
        new SiderealTime();
      }).to.throw();
      expect(() => {
        new SiderealTime(12);
      }).to.throw();
      expect(() => {
        new SiderealTime('111');
      }).to.throw();
      expect(() => {
        new SiderealTime(new JDate);
      }).to.throw();
      expect(() => {
        let jdr = new JDateRepository(2446896);
        new SiderealTime(jdr);
      }).not.to.throw();
    });

    it('The param obLon should be a Number.', () => {
      expect(() => {
        let jdr = new JDateRepository(2446896);
        new SiderealTime(jdr, '120');
      }).to.throw();
      expect(() => {
        let jdr = new JDateRepository(2446896);
        new SiderealTime(jdr, 120);
      }).not.to.throw();
    });

    it('The param obLon should be in [-180, 180].', () => {
      expect(() => {
        let jdr = new JDateRepository(2446896);
        new SiderealTime(jdr, -181);
      }).to.throw();
      expect(() => {
        let jdr = new JDateRepository(2446896);
        new SiderealTime(jdr, 181);
      }).to.throw();
      expect(() => {
        let jdr = new JDateRepository(2446896);
        new SiderealTime(jdr, 180);
        new SiderealTime(jdr, -180);
        new SiderealTime(jdr, 0);
      }).not.to.throw();
    })

    it('The param precessionModel should be a String.', () => {
      expect(() => {
        let jdr = new JDateRepository(2446896);
        new SiderealTime(jdr, 120, { precessionModel: 11 });
      }).to.throw();
      expect(() => {
        let jdr = new JDateRepository(2446896);
        new SiderealTime(jdr, 120, { precessionModel: 'iau2006' });
      }).not.to.throw();
    });

    it('The param precessionModel should be in ["IAU2006", "IAU2000", "IAU1976"].', () => {
      expect(() => {
        let jdr = new JDateRepository(2446896);
        new SiderealTime(jdr, 120, { precessionModel: '11' });
      }).to.throw();
      expect(() => {
        let jdr = new JDateRepository(2446896);
        new SiderealTime(jdr, 120, { precessionModel: 'IAU2006' });
        new SiderealTime(jdr, 120, { precessionModel: 'IAU2000' });
        new SiderealTime(jdr, 120, { precessionModel: 'IAU1976' });
      }).not.to.throw();
    });

    it('The param nutationModel should be a String.', () => {
      expect(() => {
        let jdr = new JDateRepository(2446896);
        new SiderealTime(jdr, 120, { nutationModel: 11 });
      }).to.throw();
      expect(() => {
        let jdr = new JDateRepository(2446896);
        new SiderealTime(jdr, 120, { nutationModel: 'iau2000b' });
      }).not.to.throw();
    });

    it('The param nutationModel should be in ["IAU2000B", "LP"].', () => {
      expect(() => {
        let jdr = new JDateRepository(2446896);
        new SiderealTime(jdr, 120, { nutationModel: '11' });
      }).to.throw();
      expect(() => {
        let jdr = new JDateRepository(2446896);
        new SiderealTime(jdr, 120, { nutationModel: 'IAU2000B' });
        new SiderealTime(jdr, 120, { nutationModel: 'lp' });
      }).not.to.throw();
    });
  });

  describe('get ERA()', () => {
    it('The return of get ERA() should be a Number.', () => {
      expect((new SiderealTime(new JDateRepository(2446896), 120)).ERA).to.be.a('Number');
    });
  });

  describe('get meanVal()', () => {
    it('The return of get meanVal() should be a Number.', () => {
      expect((new SiderealTime(new JDateRepository(2446896), 120)).meanVal).to.be.a('Number');
    });
    it('Verify the res of get meanVal().天文算法 例 11.a', () => {
      let jdr = new JDateRepository(new Date('1987/04/10 8:0:0'), 'date');
      let st = new SiderealTime(jdr, 0, { precessionModel: 'iau2006' });
      let a = (new Angle({
        h: 13,
        m: 10,
        s: 46.3668,
      }, 'hac'));
      expect(st.meanVal).to.closeTo(a.getSeconds(), 0.1);
    })
    it('Verify the res of get meanVal().天文算法 例 11.b', () => {
      let jdr = new JDateRepository(new Date('1987/04/11 3:21:0'), 'date');
      let st = new SiderealTime(jdr, 0, { precessionModel: 'iau2006' });
      let a = (new Angle({
        h: 8,
        m: 34,
        s: 57.0896,
      }, 'hac'));
      // console.log((new Angle(st.meanVal, 's')).makeHACString())
      expect(st.meanVal).to.closeTo(a.getSeconds(), 0.1);
    })
  });

  describe('get trueVal()', () => {
    it('The return of get trueVal() should be a Number.', () => {
      expect((new SiderealTime(new JDateRepository(2446896), 120)).trueVal).to.be.a('Number');
    });
    it('Verify the res of get trueVal().天文算法 例 11.a', () => {
      let jdr = new JDateRepository(new Date('1987/04/10 8:0:0'), 'date');
      let st = new SiderealTime(jdr, 0, { precessionModel: 'iau2006' });
      let a = (new Angle({
        h: 13,
        m: 10,
        s: 46.1351,
      }, 'hac'));
      expect(st.trueVal).to.closeTo(a.getSeconds(), 0.1);
    });
    it('Verify 天文算法 例12.b', () => {
      let a = angle.parseHACString('8h 34m 56.853s').getDegrees();
      let b = angle.parseDACString('77°03′56″').getDegrees();
      let obTime = new JDateRepository(new Date('1987/04/11 03:21:00'), 'date');

      let st = new SiderealTime(obTime, b);

      expect(angle.setSeconds(st.trueVal).getDegrees()).to.closeTo(a - b, 0.00002);
    });
  });
});
