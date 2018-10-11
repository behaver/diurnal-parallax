'use strict';

const PrecessionIAU2000 = require('../src/PrecessionIAU2000');
const { JDateRepository, JDate } = require('@behaver/jdate');
const expect = require("chai").expect;

describe('#PrecessionIAU2000', () => {
  describe('#consturctor(jdr)', () => {
    it('The param jdr should be a JDateRepository', () => {
      expect(() => {
        new PrecessionIAU2000();
      }).to.throw();
      expect(() => {
        new PrecessionIAU2000(12);
      }).to.throw();
      expect(() => {
        new PrecessionIAU2000('222');
      }).to.throw();
      expect(() => {
        let jdate = new JDate();
        new PrecessionIAU2000(jdate);
      }).to.throw();
      expect(() => {
        let jdr = new JDateRepository(2446896);
        new PrecessionIAU2000(jdr);
      }).not.to.throw();
    });
  })

  describe('#on(jdr)', () => {
    it('The param jdr should be a JDateRepository', () => {
      expect(() => {
        let jdr = new JDateRepository(2446896);
        let n = new PrecessionIAU2000(jdr);
        n.on();
      }).to.throw();
      expect(() => {
        let jdr = new JDateRepository(2446896);
        let n = new PrecessionIAU2000(jdr);
        n.on(12);
      }).to.throw();
      expect(() => {
        let jdr = new JDateRepository(2446896);
        let n = new PrecessionIAU2000(jdr);
        n.on('222');
      }).to.throw();
      expect(() => {
        let jdr = new JDateRepository(2446896);
        let n = new PrecessionIAU2000(jdr);
        let jdate = new JDate();
        n.on(jdate);
      }).to.throw();
      expect(() => {
        let jdr = new JDateRepository(2446896);
        let n = new PrecessionIAU2000(jdr);
        n.on(new JDateRepository(2446833));
      }).not.to.throw();
    });
  })

  describe('#get(key)', () => {
    it('The res should be a Number', () => {
      let jdr = new JDateRepository(2446896);
      let p = new PrecessionIAU2000(jdr);
      expect(p.get('psi')).to.be.a('Number');
    })
    it('The cache should be sync on jdate', () => {
      let jdr = new JDateRepository(2446896);
      let p = new PrecessionIAU2000(jdr);
      let psi_old = p.get('psi');
      jdr.JD = 2446816;
      expect(psi_old).not.equal(p.get('psi'));
    })
    it('The param should be in range.', () => {
      let jdr = new JDateRepository(2446896);
      let p = new PrecessionIAU2000(jdr);
      expect(() => { p.get('a') }).to.throw();
    })
  })

  describe('#get P()', () => {
    it('The res should be a Number', () => {
      let jdr = new JDateRepository(2446896);
      let p = new PrecessionIAU2000(jdr);
      expect(p.P).to.be.a('Number');
    });
    it('The cache should be sync on jdate', () => {
      let jdr = new JDateRepository(2446896);
      let p = new PrecessionIAU2000(jdr);
      let P_old = p.P;
      jdr.JD = 2446816;
      expect(P_old).not.equal(p.P);
    })
  })

  describe('#get Q()', () => {
    it('The res should be a Number', () => {
      let jdr = new JDateRepository(2446896);
      let p = new PrecessionIAU2000(jdr);
      expect(p.Q).to.be.a('Number');
    });
    it('The cache should be sync on jdate', () => {
      let jdr = new JDateRepository(2446896);
      let p = new PrecessionIAU2000(jdr);
      let Q_old = p.Q;
      jdr.JD = 2446816;
      expect(Q_old).not.equal(p.Q);
    })
  })

  describe('#get eta()', () => {
    it('The res should be a Number', () => {
      let jdr = new JDateRepository(2446896);
      let p = new PrecessionIAU2000(jdr);
      expect(p.eta).to.be.a('Number');
    });
    it('The cache should be sync on jdate', () => {
      let jdr = new JDateRepository(2446896);
      let p = new PrecessionIAU2000(jdr);
      let eta_old = p.eta;
      jdr.JD = 2446816;
      expect(eta_old).not.equal(p.eta);
    })
  })

  describe('#get pi()', () => {
    it('The res should be a Number', () => {
      let jdr = new JDateRepository(2446896);
      let p = new PrecessionIAU2000(jdr);
      expect(p.pi).to.be.a('Number');
    });
    it('The cache should be sync on jdate', () => {
      let jdr = new JDateRepository(2446896);
      let p = new PrecessionIAU2000(jdr);
      let pi_old = p.pi;
      jdr.JD = 2446816;
      expect(pi_old).not.equal(p.pi);
    })
  })

  describe('#get p()', () => {
    it('The res should be a Number', () => {
      let jdr = new JDateRepository(2446896);
      let p = new PrecessionIAU2000(jdr);
      expect(p.p).to.be.a('Number');
    });
    it('The cache should be sync on jdate', () => {
      let jdr = new JDateRepository(2446896);
      let p = new PrecessionIAU2000(jdr);
      let p_old = p.p;
      jdr.JD = 2446816;
      expect(p_old).not.equal(p.p);
    })
  })

  describe('#get epsilon()', () => {
    it('The res should be a Number', () => {
      let jdr = new JDateRepository(2446896);
      let p = new PrecessionIAU2000(jdr);
      expect(p.epsilon).to.be.a('Number');
    });
    it('The cache should be sync on jdate', () => {
      let jdr = new JDateRepository(2446896);
      let p = new PrecessionIAU2000(jdr);
      let epsilon_old = p.epsilon;
      jdr.JD = 2446816;
      expect(epsilon_old).not.equal(p.epsilon);
    })
  })

  describe('#get chi()', () => {
    it('The res should be a Number', () => {
      let jdr = new JDateRepository(2446896);
      let p = new PrecessionIAU2000(jdr);
      expect(p.chi).to.be.a('Number');
    });
    it('The cache should be sync on jdate', () => {
      let jdr = new JDateRepository(2446896);
      let p = new PrecessionIAU2000(jdr);
      let chi_old = p.chi;
      jdr.JD = 2446816;
      expect(chi_old).not.equal(p.chi);
    })
  })

  describe('#get omega()', () => {
    it('The res should be a Number', () => {
      let jdr = new JDateRepository(2446896);
      let p = new PrecessionIAU2000(jdr);
      expect(p.omega).to.be.a('Number');
    });
    it('The cache should be sync on jdate', () => {
      let jdr = new JDateRepository(2446896);
      let p = new PrecessionIAU2000(jdr);
      let omega_old = p.omega;
      jdr.JD = 2446816;
      expect(omega_old).not.equal(p.omega);
    })
  })

  describe('#get psi()', () => {
    it('The res should be a Number', () => {
      let jdr = new JDateRepository(2446896);
      let p = new PrecessionIAU2000(jdr);
      expect(p.psi).to.be.a('Number');
    });
    it('The cache should be sync on jdate', () => {
      let jdr = new JDateRepository(2446896);
      let p = new PrecessionIAU2000(jdr);
      let psi_old = p.psi;
      jdr.JD = 2446816;
      expect(psi_old).not.equal(p.psi);
    })
  })

  describe('#get theta()', () => {
    it('The res should be a Number', () => {
      let jdr = new JDateRepository(2446896);
      let p = new PrecessionIAU2000(jdr);
      expect(p.theta).to.be.a('Number');
    });
    it('The cache should be sync on jdate', () => {
      let jdr = new JDateRepository(2446896);
      let p = new PrecessionIAU2000(jdr);
      let theta_old = p.theta;
      jdr.JD = 2446816;
      expect(theta_old).not.equal(p.theta);
    })
  })

  describe('#get zeta()', () => {
    it('The res should be a Number', () => {
      let jdr = new JDateRepository(2446896);
      let p = new PrecessionIAU2000(jdr);
      expect(p.zeta).to.be.a('Number');
    });
    it('The cache should be sync on jdate', () => {
      let jdr = new JDateRepository(2446896);
      let p = new PrecessionIAU2000(jdr);
      let zeta_old = p.zeta;
      jdr.JD = 2446816;
      expect(zeta_old).not.equal(p.zeta);
    })
  })

  describe('#get z()', () => {
    it('The res should be a Number', () => {
      let jdr = new JDateRepository(2446896);
      let p = new PrecessionIAU2000(jdr);
      expect(p.z).to.be.a('Number');
    });
    it('The cache should be sync on jdate', () => {
      let jdr = new JDateRepository(2446896);
      let p = new PrecessionIAU2000(jdr);
      let z_old = p.z;
      jdr.JD = 2446816;
      expect(z_old).not.equal(p.z);
    })
  })
});
