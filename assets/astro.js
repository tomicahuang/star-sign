// 太陽、月亮黃經與上升點計算（Jean Meeus《Astronomical Algorithms》第 12、25、47 章）
(function (global) {
  'use strict';

  const RAD = Math.PI / 180;
  const norm = (x) => ((x % 360) + 360) % 360;
  const sin = (d) => Math.sin(d * RAD);
  const cos = (d) => Math.cos(d * RAD);

  function julianDay(dateUtc) {
    return dateUtc.getTime() / 86400000 + 2440587.5;
  }

  // ΔT（TT − UT，秒），長期近似式，對星座判斷已足夠
  function deltaT(year) {
    const u = (year - 1820) / 100;
    return 32 * u * u - 20;
  }

  function centuriesTT(dateUtc) {
    const jd = julianDay(dateUtc) + deltaT(dateUtc.getUTCFullYear()) / 86400;
    return (jd - 2451545) / 36525;
  }

  function nutationLongitude(T) {
    const omega = 125.04452 - 1934.136261 * T;
    const Ls = 280.4665 + 36000.7698 * T;
    const Lm = 218.3165 + 481267.8813 * T;
    return (-17.2 * sin(omega) - 1.32 * sin(2 * Ls) - 0.23 * sin(2 * Lm) + 0.21 * sin(2 * omega)) / 3600;
  }

  function obliquity(T) {
    const omega = 125.04452 - 1934.136261 * T;
    return 23.439291 - 0.0130042 * T + 0.00256 * cos(omega);
  }

  function sunLongitudeT(T) {
    const L0 = 280.46646 + 36000.76983 * T + 0.0003032 * T * T;
    const M = 357.52911 + 35999.05029 * T - 0.0001537 * T * T;
    const C = (1.914602 - 0.004817 * T - 0.000014 * T * T) * sin(M)
      + (0.019993 - 0.000101 * T) * sin(2 * M)
      + 0.000289 * sin(3 * M);
    const omega = 125.04 - 1934.136 * T;
    return norm(L0 + C - 0.00569 - 0.00478 * sin(omega));
  }

  // [D, M, M', F, Σl 係數（10⁻⁶ 度）]
  const MOON_TERMS = [
    [0, 0, 1, 0, 6288774], [2, 0, -1, 0, 1274027], [2, 0, 0, 0, 658314], [0, 0, 2, 0, 213618],
    [0, 1, 0, 0, -185116], [0, 0, 0, 2, -114332], [2, 0, -2, 0, 58793], [2, -1, -1, 0, 57066],
    [2, 0, 1, 0, 53322], [2, -1, 0, 0, 45758], [0, 1, -1, 0, -40923], [1, 0, 0, 0, -34720],
    [0, 1, 1, 0, -30383], [2, 0, 0, -2, 15327], [0, 0, 1, 2, -12528], [0, 0, 1, -2, 10980],
    [4, 0, -1, 0, 10675], [0, 0, 3, 0, 10034], [4, 0, -2, 0, 8548], [2, 1, -1, 0, -7888],
    [2, 1, 0, 0, -6766], [1, 0, -1, 0, -5163], [1, 1, 0, 0, 4987], [2, -1, 1, 0, 4036],
    [2, 0, 2, 0, 3994], [4, 0, 0, 0, 3861], [2, 0, -3, 0, 3665], [0, 1, -2, 0, -2689],
    [2, 0, -1, 2, -2602], [2, -1, -2, 0, 2390], [1, 0, 1, 0, -2348], [2, -2, 0, 0, 2236],
    [0, 1, 2, 0, -2120], [0, 2, 0, 0, -2069], [2, -2, -1, 0, 2048], [2, 0, 1, -2, -1773],
    [2, 0, 0, 2, -1595], [4, -1, -1, 0, 1215], [0, 0, 2, 2, -1110], [3, 0, -1, 0, -892],
    [2, 1, 1, 0, -810], [4, -1, -2, 0, 759], [0, 2, -1, 0, -713], [2, 2, -1, 0, -700],
    [2, 1, -2, 0, 691], [2, -1, 0, -2, 596], [4, 0, 1, 0, 549], [0, 0, 4, 0, 537],
    [4, -1, 0, 0, 520], [1, 0, -2, 0, -487], [2, 1, 0, -2, -399], [0, 0, 2, -2, -381],
    [1, 1, 1, 0, 351], [3, 0, -2, 0, -340], [4, 0, -3, 0, 330], [2, -1, 2, 0, 327],
    [0, 2, 1, 0, -323], [1, 1, -1, 0, 299], [2, 0, 3, 0, 294]
  ];

  function moonLongitudeT(T) {
    const T2 = T * T, T3 = T2 * T, T4 = T3 * T;
    const Lp = 218.3164477 + 481267.88123421 * T - 0.0015786 * T2 + T3 / 538841 - T4 / 65194000;
    const D = 297.8501921 + 445267.1114034 * T - 0.0018819 * T2 + T3 / 545868 - T4 / 113065000;
    const M = 357.5291092 + 35999.0502909 * T - 0.0001536 * T2 + T3 / 24490000;
    const Mp = 134.9633964 + 477198.8675055 * T + 0.0087414 * T2 + T3 / 69699 - T4 / 14712000;
    const F = 93.272095 + 483202.0175233 * T - 0.0036539 * T2 - T3 / 3526000 + T4 / 863310000;
    const A1 = 119.75 + 131.849 * T;
    const A2 = 53.09 + 479264.29 * T;
    const E = 1 - 0.002516 * T - 0.0000074 * T2;

    let sum = 0;
    for (const [d, m, mp, f, c] of MOON_TERMS) {
      const e = Math.abs(m) === 2 ? E * E : Math.abs(m) === 1 ? E : 1;
      sum += c * e * sin(d * D + m * M + mp * Mp + f * F);
    }
    sum += 3958 * sin(A1) + 1962 * sin(Lp - F) + 318 * sin(A2);
    return norm(Lp + sum / 1e6 + nutationLongitude(T));
  }

  function sunLongitude(dateUtc) {
    return sunLongitudeT(centuriesTT(dateUtc));
  }

  function moonLongitude(dateUtc) {
    return moonLongitudeT(centuriesTT(dateUtc));
  }

  // 月亮真北交點（Meeus 第 47 章）
  function northNode(dateUtc) {
    const T = centuriesTT(dateUtc);
    const T2 = T * T, T3 = T2 * T, T4 = T3 * T;
    const D = 297.8501921 + 445267.1114034 * T - 0.0018819 * T2 + T3 / 545868 - T4 / 113065000;
    const M = 357.5291092 + 35999.0502909 * T - 0.0001536 * T2 + T3 / 24490000;
    const Mp = 134.9633964 + 477198.8675055 * T + 0.0087414 * T2 + T3 / 69699 - T4 / 14712000;
    const F = 93.272095 + 483202.0175233 * T - 0.0036539 * T2 - T3 / 3526000 + T4 / 863310000;
    const mean = 125.0445479 - 1934.1362891 * T + 0.0020754 * T2 + T3 / 467441 - T4 / 60616000;
    return norm(mean - 1.4979 * sin(2 * (D - F)) - 0.15 * sin(M) + 0.1226 * sin(2 * D)
      + 0.1176 * sin(2 * F) - 0.0801 * sin(2 * (Mp - F)) + nutationLongitude(T));
  }

  // ---------- 行星（Paul Schlyter 軌道根數＋木土天攝動，冥王星用其級數；誤差約 1～2 角分） ----------

  // d：自 2000/1/0.0 起算的日數；[N, i, w, a, e, M]，每項為 [常數, 每日變化]
  const ORBITS = {
    mercury: [[48.3313, 3.24587e-5], [7.0047, 5.0e-8], [29.1241, 1.01444e-5], [0.387098, 0], [0.205635, 5.59e-10], [168.6562, 4.0923344368]],
    venus: [[76.6799, 2.4659e-5], [3.3946, 2.75e-8], [54.891, 1.38374e-5], [0.72333, 0], [0.006773, -1.302e-9], [48.0052, 1.6021302244]],
    mars: [[49.5574, 2.11081e-5], [1.8497, -1.78e-8], [286.5016, 2.92961e-5], [1.523688, 0], [0.093405, 2.516e-9], [18.6021, 0.5240207766]],
    jupiter: [[100.4542, 2.76854e-5], [1.303, -1.557e-7], [273.8777, 1.64505e-5], [5.20256, 0], [0.048498, 4.469e-9], [19.895, 0.0830853001]],
    saturn: [[113.6634, 2.3898e-5], [2.4886, -1.081e-7], [339.3939, 2.97661e-5], [9.55475, 0], [0.055546, -9.499e-9], [316.967, 0.0334442282]],
    uranus: [[74.0005, 1.3978e-5], [0.7733, 1.9e-8], [96.6612, 3.0565e-5], [19.18171, -1.55e-8], [0.047318, 7.45e-9], [142.5905, 0.011725806]],
    neptune: [[131.7806, 3.0173e-5], [1.77, -2.55e-7], [272.8461, -6.027e-6], [30.05826, 3.313e-8], [0.008606, 2.15e-9], [260.2471, 0.005995147]]
  };

  function eccentricAnomaly(M, e) {
    let E = M + (e / RAD) * sin(M) * (1 + e * cos(M));
    for (let k = 0; k < 20; k++) {
      const dE = (E - (e / RAD) * sin(E) - M) / (1 - e * cos(E));
      E -= dE;
      if (Math.abs(dE) < 1e-7) break;
    }
    return E;
  }

  function orbitPosition(N, i, w, a, e, M) {
    const E = eccentricAnomaly(norm(M), e);
    const xv = a * (cos(E) - e);
    const yv = a * Math.sqrt(1 - e * e) * sin(E);
    const v = Math.atan2(yv, xv) / RAD;
    const r = Math.hypot(xv, yv);
    const u = v + w;
    return {
      x: r * (cos(N) * cos(u) - sin(N) * sin(u) * cos(i)),
      y: r * (sin(N) * cos(u) + cos(N) * sin(u) * cos(i)),
      z: r * sin(u) * sin(i),
      r
    };
  }

  function fromLonLat(lon, lat, r) {
    return { x: r * cos(lon) * cos(lat), y: r * sin(lon) * cos(lat), z: r * sin(lat), r };
  }

  function sunVector(d) {
    const w = 282.9404 + 4.70935e-5 * d;
    const e = 0.016709 - 1.151e-9 * d;
    const M = norm(356.047 + 0.9856002585 * d);
    const E = eccentricAnomaly(M, e);
    const xv = cos(E) - e;
    const yv = Math.sqrt(1 - e * e) * sin(E);
    const lon = Math.atan2(yv, xv) / RAD + w;
    const r = Math.hypot(xv, yv);
    return { x: r * cos(lon), y: r * sin(lon), z: 0 };
  }

  function heliocentric(name, d) {
    if (name === 'pluto') {
      const S = 50.03 + 0.033459652 * d;
      const P = 238.95 + 0.003968789 * d;
      const lon = 238.9508 + 0.00400703 * d
        - 19.799 * sin(P) + 19.848 * cos(P) + 0.897 * sin(2 * P) - 4.956 * cos(2 * P)
        + 0.61 * sin(3 * P) + 1.211 * cos(3 * P) - 0.341 * sin(4 * P) - 0.19 * cos(4 * P)
        + 0.128 * sin(5 * P) - 0.034 * cos(5 * P) - 0.038 * sin(6 * P) + 0.031 * cos(6 * P)
        + 0.02 * sin(S - P) - 0.01 * cos(S - P);
      const lat = -3.9082 - 5.453 * sin(P) - 14.975 * cos(P) + 3.527 * sin(2 * P) + 1.673 * cos(2 * P)
        - 1.051 * sin(3 * P) + 0.328 * cos(3 * P) + 0.179 * sin(4 * P) - 0.292 * cos(4 * P)
        + 0.019 * sin(5 * P) + 0.1 * cos(5 * P) - 0.031 * sin(6 * P) - 0.026 * cos(6 * P)
        + 0.011 * cos(S - P);
      const r = 40.72 + 6.68 * sin(P) + 6.9 * cos(P) - 1.18 * sin(2 * P) - 0.03 * cos(2 * P)
        + 0.15 * sin(3 * P) - 0.14 * cos(3 * P);
      return fromLonLat(lon, lat, r);
    }
    const el = ORBITS[name].map(([c, k]) => c + k * d);
    const pos = orbitPosition(...el);
    if (name !== 'jupiter' && name !== 'saturn' && name !== 'uranus') return pos;

    const Mj = 19.895 + 0.0830853001 * d;
    const Ms = 316.967 + 0.0334442282 * d;
    const Mu = 142.5905 + 0.011725806 * d;
    let lon = Math.atan2(pos.y, pos.x) / RAD;
    let lat = Math.asin(pos.z / pos.r) / RAD;
    if (name === 'jupiter') {
      lon += -0.332 * sin(2 * Mj - 5 * Ms - 67.6) - 0.056 * sin(2 * Mj - 2 * Ms + 21)
        + 0.042 * sin(3 * Mj - 5 * Ms + 21) - 0.036 * sin(Mj - 2 * Ms) + 0.022 * cos(Mj - Ms)
        + 0.023 * sin(2 * Mj - 3 * Ms + 52) - 0.016 * sin(Mj - 5 * Ms - 69);
    } else if (name === 'saturn') {
      lon += 0.812 * sin(2 * Mj - 5 * Ms - 67.6) - 0.229 * cos(2 * Mj - 4 * Ms - 2)
        + 0.119 * sin(Mj - 2 * Ms - 3) + 0.046 * sin(2 * Mj - 6 * Ms - 69) + 0.014 * sin(Mj - 3 * Ms + 32);
      lat += -0.02 * cos(2 * Mj - 4 * Ms - 2) + 0.018 * sin(2 * Mj - 6 * Ms - 49);
    } else {
      lon += 0.04 * sin(Ms - 2 * Mu + 6) + 0.035 * sin(Ms - 3 * Mu + 33) - 0.015 * sin(Mj - Mu + 20);
    }
    return fromLonLat(lon, lat, pos.r);
  }

  function daysSince2000(dateUtc) {
    return julianDay(dateUtc) + deltaT(dateUtc.getUTCFullYear()) / 86400 - 2451543.5;
  }

  // 地心視黃經（含光行時修正）
  function planetLongitude(name, dateUtc) {
    const d = daysSince2000(dateUtc);
    const s = sunVector(d);
    let p = heliocentric(name, d);
    let g = { x: p.x + s.x, y: p.y + s.y, z: p.z };
    const dist = Math.hypot(g.x, g.y, g.z);
    p = heliocentric(name, d - 0.0057755183 * dist);
    g = { x: p.x + s.x, y: p.y + s.y };
    return norm(Math.atan2(g.y, g.x) / RAD + nutationLongitude((d - 1.5) / 36525));
  }

  // ---------- 天頂、上升、宮位 ----------

  function ramcAndObliquity(dateUtc, lon) {
    const jd = julianDay(dateUtc);
    const T = (jd - 2451545) / 36525;
    const gmst = 280.46061837 + 360.98564736629 * (jd - 2451545) + 0.000387933 * T * T - T * T * T / 38710000;
    const TT = centuriesTT(dateUtc);
    const eps = obliquity(TT);
    return { ramc: norm(gmst + nutationLongitude(TT) * cos(eps) + lon), eps };
  }

  // 上升點黃經；lat、lon 為度（東經為正）
  function ascendant(dateUtc, lat, lon) {
    const { ramc, eps } = ramcAndObliquity(dateUtc, lon);
    const y = cos(ramc);
    const x = -(sin(ramc) * cos(eps) + Math.tan(lat * RAD) * sin(eps));
    return norm(Math.atan2(y, x) / RAD);
  }

  function midheaven(dateUtc, lon) {
    const { ramc, eps } = ramcAndObliquity(dateUtc, lon);
    return norm(Math.atan2(sin(ramc), cos(ramc) * cos(eps)) / RAD);
  }

  // 十二宮宮首（Placidus）；緯度超過約 66° 時 Placidus 無解，改用 Porphyry
  function houses(dateUtc, lat, lon) {
    const { ramc, eps } = ramcAndObliquity(dateUtc, lon);
    const asc = ascendant(dateUtc, lat, lon);
    const mc = midheaven(dateUtc, lon);
    const cusps = new Array(12);
    cusps[0] = asc;
    cusps[9] = mc;
    let system = 'Placidus';

    const placidus = (fraction, aboveHorizon) => {
      let lam = norm(mc + (aboveHorizon ? fraction * 90 : 90 + fraction * 90));
      for (let k = 0; k < 50; k++) {
        const dec = Math.asin(sin(eps) * sin(lam)) / RAD;
        const arg = -Math.tan(lat * RAD) * Math.tan(dec * RAD);
        if (Math.abs(arg) > 1) return null;
        const sda = Math.acos(arg) / RAD;
        const ra = aboveHorizon ? ramc + fraction * sda : ramc + sda + fraction * (180 - sda);
        const next = norm(Math.atan2(sin(ra), cos(ra) * cos(eps)) / RAD);
        const diff = Math.abs(((next - lam + 540) % 360) - 180);
        lam = next;
        if (diff < 1e-7) break;
      }
      return lam;
    };

    const c11 = placidus(1 / 3, true), c12 = placidus(2 / 3, true);
    const c2 = placidus(1 / 3, false), c3 = placidus(2 / 3, false);
    if ([c11, c12, c2, c3].some((c) => c === null || isNaN(c))) {
      system = 'Porphyry';
      const q1 = norm(asc - mc), q2 = norm(mc + 180 - asc);
      cusps[10] = norm(mc + q1 / 3); cusps[11] = norm(mc + 2 * q1 / 3);
      cusps[1] = norm(asc + q2 / 3); cusps[2] = norm(asc + 2 * q2 / 3);
    } else {
      cusps[10] = c11; cusps[11] = c12; cusps[1] = c2; cusps[2] = c3;
    }
    cusps[3] = norm(mc + 180);
    for (const k of [4, 5, 6, 7, 8]) cusps[k] = norm(cusps[(k + 6) % 12] + 180);
    return { cusps, system, asc, mc };
  }

  function houseOf(lonDeg, cusps) {
    for (let h = 0; h < 12; h++) {
      const a = cusps[h], b = cusps[(h + 1) % 12];
      const span = norm(b - a);
      if (norm(lonDeg - a) < span) return h + 1;
    }
    return 1;
  }

  // 所有星體的黃經；key: sun, moon, mercury … pluto, node
  function bodies(dateUtc) {
    const out = {
      sun: sunLongitude(dateUtc),
      moon: moonLongitude(dateUtc)
    };
    for (const n of ['mercury', 'venus', 'mars', 'jupiter', 'saturn', 'uranus', 'neptune', 'pluto']) {
      out[n] = planetLongitude(n, dateUtc);
    }
    out.node = northNode(dateUtc);
    return out;
  }

  function longitudeOf(key, dateUtc) {
    if (key === 'sun') return sunLongitude(dateUtc);
    if (key === 'moon') return moonLongitude(dateUtc);
    if (key === 'node') return northNode(dateUtc);
    return planetLongitude(key, dateUtc);
  }

  // 每日移動度數（負值為逆行）
  function dailyMotion(key, dateUtc) {
    const a = longitudeOf(key, new Date(dateUtc.getTime() - 43200e3));
    const b = longitudeOf(key, new Date(dateUtc.getTime() + 43200e3));
    return ((b - a + 540) % 360) - 180;
  }

  global.Astro = {
    julianDay, sunLongitude, moonLongitude, ascendant, midheaven, houses, houseOf,
    planetLongitude, northNode, bodies, longitudeOf, dailyMotion, sunLongitudeT, moonLongitudeT
  };
})(window);
