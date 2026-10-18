(function () {
  'use strict';

  const SIGNS = [
    { name: '牡羊座', sym: '♈', element: '火', mode: '開創', range: '3/21–4/19',
      sun: '直率、行動派，喜歡搶先開創，衝勁十足但耐心較少。',
      moon: '情緒來得快去得快，需要自由與被認可，生氣不會悶在心裡。',
      rising: '給人有活力、直接、有點急性子的第一印象。' },
    { name: '金牛座', sym: '♉', element: '土', mode: '固定', range: '4/20–5/20',
      sun: '穩健務實，重視安全感與生活品質，認定的事很堅持。',
      moon: '需要穩定與實質的陪伴，美食和舒適的環境最能療癒。',
      rising: '看起來溫和穩重、慢條斯理，很有親和力。' },
    { name: '雙子座', sym: '♊', element: '風', mode: '變動', range: '5/21–6/21',
      sun: '好奇心強、反應快，愛聊天、學新東西，興趣廣泛。',
      moon: '用說話和思考消化情緒，需要交流與新鮮感，最怕悶。',
      rising: '給人機靈、健談、看起來年輕的印象。' },
    { name: '巨蟹座', sym: '♋', element: '水', mode: '開創', range: '6/22–7/22',
      sun: '重感情、顧家，會保護身邊的人，敏感又念舊。',
      moon: '月亮的主場，情感豐富細膩，需要家的歸屬感。',
      rising: '看起來溫柔親切、有點害羞，讓人想親近。' },
    { name: '獅子座', sym: '♌', element: '火', mode: '固定', range: '7/23–8/22',
      sun: '自信大方、有領袖氣質，喜歡被看見，對人慷慨。',
      moon: '需要被重視和讚美，情緒表達熱烈，比較愛面子。',
      rising: '存在感強、氣場明亮，很容易成為焦點。' },
    { name: '處女座', sym: '♍', element: '土', mode: '變動', range: '8/23–9/22',
      sun: '細心、講求效率與條理，樂於助人，但對自己要求高。',
      moon: '把事情整理好才會安心，容易操心、想太多。',
      rising: '給人乾淨俐落、斯文謹慎的印象。' },
    { name: '天秤座', sym: '♎', element: '風', mode: '開創', range: '9/23–10/23',
      sun: '重視和諧與公平，有美感、善社交，做決定較猶豫。',
      moon: '需要關係中的平衡與和氣，討厭衝突，很在乎別人感受。',
      rising: '優雅有禮、好相處，第一眼就讓人舒服。' },
    { name: '天蠍座', sym: '♏', element: '水', mode: '固定', range: '10/24–11/22',
      sun: '專注深刻、意志堅定，愛恨分明，洞察力敏銳。',
      moon: '情感強烈卻不輕易表露，需要信任與深度的連結。',
      rising: '看起來神秘、有距離感，眼神很有穿透力。' },
    { name: '射手座', sym: '♐', element: '火', mode: '變動', range: '11/23–12/21',
      sun: '樂觀、熱愛自由與旅行，追求知識和人生意義。',
      moon: '需要空間與冒險，習慣用樂觀和幽默化解低潮。',
      rising: '開朗爽快、隨和，給人陽光的感覺。' },
    { name: '摩羯座', sym: '♑', element: '土', mode: '開創', range: '12/22–1/19',
      sun: '有責任感、目標明確，腳踏實地，越老越有成就。',
      moon: '情緒比較內斂，靠掌控感與成就感獲得安全感。',
      rising: '看起來成熟穩重、可靠，有點嚴肅。' },
    { name: '水瓶座', sym: '♒', element: '風', mode: '固定', range: '1/20–2/18',
      sun: '獨立、有想法，重視友誼與理念，喜歡與眾不同。',
      moon: '處理情緒偏理性，需要個人空間，不喜歡被黏著。',
      rising: '給人友善但有點酷、很有個性的印象。' },
    { name: '雙魚座', sym: '♓', element: '水', mode: '變動', range: '2/19–3/20',
      sun: '浪漫、富同理心與想像力，很容易感同身受。',
      moon: '非常敏感，容易吸收別人的情緒，需要獨處與藝術療癒。',
      rising: '溫柔夢幻、隨和，看起來很好親近。' }
  ];

  const ELEMENT_COMBO = {
    '火火': '內外一致的熱情派，行動和情緒都很直接。',
    '土土': '內外一致的務實派，穩定又可靠。',
    '風風': '內外一致的思考派，重溝通、偏理性。',
    '水水': '內外一致的感性派，直覺強、重感情。',
    '土火': '想衝又想穩，外在與內心節奏不同，找到平衡就很有爆發力。',
    '火風': '火遇到風越燒越旺，點子多、行動快，人緣好。',
    '水火': '熱情與敏感並存，情緒起伏較大，但很有感染力。',
    '土風': '務實與思考結合，計畫周延，有時想太多、動得慢。',
    '水土': '土與水相合，穩定又體貼，重視安全感與家庭。',
    '水風': '理性與感性互相拉扯，既能分析也很能共感。'
  };

  const ELEMENT_CLASS = { '火': 'fire', '土': 'earth', '風': 'air', '水': 'water' };

  const SIGN_KEYWORDS = [
    '直接、主動、熱情、急性子', '穩定、務實、重享受、固執', '靈活、好奇、多話、多變',
    '溫柔、顧家、敏感、念舊', '自信、大方、愛表現、重面子', '細心、講究、實際、愛操心',
    '和諧、優雅、重關係、猶豫', '深刻、專一、強烈、有洞察力', '樂觀、自由、愛冒險、直率',
    '踏實、負責、有野心、保守', '獨立、創新、理性、重友情', '浪漫、體貼、直覺強、愛幻想'
  ];

  const ELEMENT_TRAIT = { '火': '熱情、行動力', '土': '務實、穩定', '風': '思考、溝通', '水': '感受、情感' };
  const MODE_TRAIT = { '開創': '主動開始新事物', '固定': '堅持、穩定到底', '變動': '靈活適應變化' };

  const BODIES = [
    { key: 'sun', name: '太陽', glyph: '☉', short: '自我', lead: '核心個性' },
    { key: 'moon', name: '月亮', glyph: '☽', short: '情緒', lead: '內在情緒' },
    { key: 'mercury', name: '水星', glyph: '☿', short: '思考溝通', lead: '想法和說話方式' },
    { key: 'venus', name: '金星', glyph: '♀', short: '愛情審美', lead: '談戀愛和喜歡的東西' },
    { key: 'mars', name: '火星', glyph: '♂', short: '行動力', lead: '做事和爭取的方式' },
    { key: 'jupiter', name: '木星', glyph: '♃', short: '幸運擴展', lead: '容易帶來好運的特質' },
    { key: 'saturn', name: '土星', glyph: '♄', short: '責任壓力', lead: '需要花時間磨練的課題' },
    { key: 'uranus', name: '天王星', glyph: '♅', short: '改變突破', lead: '這一代想改變、突破的方向' },
    { key: 'neptune', name: '海王星', glyph: '♆', short: '夢想直覺', lead: '這一代的夢想與靈感' },
    { key: 'pluto', name: '冥王星', glyph: '♇', short: '深層轉化', lead: '這一代深層轉化的力量' },
    { key: 'node', name: '北交點', glyph: '☊', short: '成長方向', lead: '這輩子要學習成長的方向' }
  ];
  const POINTS = {
    asc: { key: 'asc', name: '上升', glyph: 'AC', short: '外在形象', lead: '給人的第一印象' },
    mc: { key: 'mc', name: '天頂', glyph: 'MC', short: '事業方向', lead: '事業方向和社會形象' }
  };
  const BODY_BY_KEY = Object.fromEntries([...BODIES, POINTS.asc, POINTS.mc].map((b) => [b.key, b]));
  const GENERATIONAL = ['uranus', 'neptune', 'pluto'];

  const HOUSES = [
    ['命宮', '自我、外表、給人的印象'], ['財帛宮', '金錢、收入、價值觀'],
    ['兄弟宮', '溝通、學習、兄弟姊妹、短途移動'], ['田宅宮', '家庭、父母、根源、晚年'],
    ['子女宮', '戀愛、娛樂、創作、子女'], ['奴僕宮', '工作日常、健康、生活習慣'],
    ['夫妻宮', '伴侶、婚姻、合作對象'], ['疾厄宮', '共同財產、親密關係、深層心理'],
    ['遷移宮', '遠行、留學、信仰、高等教育'], ['官祿宮', '事業、社會地位、名聲'],
    ['福德宮', '朋友、團體、願望'], ['玄秘宮', '潛意識、獨處、隱藏的事']
  ];

  const ASPECTS = [
    { name: '合相', angle: 0, orb: 8, sym: '☌', nature: '融合', cls: 'conj', text: '兩股力量綁在一起，特質互相放大' },
    { name: '六分相', angle: 60, orb: 5, sym: '⚹', nature: '和諧', cls: 'soft', text: '互相幫忙，稍微努力就能發揮' },
    { name: '四分相', angle: 90, orb: 7, sym: '□', nature: '緊張', cls: 'hard', text: '互相拉扯、有壓力，也是成長的動力' },
    { name: '三分相', angle: 120, orb: 7, sym: '△', nature: '和諧', cls: 'soft', text: '天生合拍，自然流暢' },
    { name: '對分相', angle: 180, orb: 8, sym: '☍', nature: '緊張', cls: 'hard', text: '兩邊拉鋸，需要找到平衡' }
  ];

  const PLACES = [
    { group: '台灣', items: [
      ['台北', 25.033, 121.565], ['新北', 25.012, 121.465], ['基隆', 25.128, 121.739],
      ['桃園', 24.993, 121.301], ['新竹', 24.804, 120.971], ['苗栗', 24.560, 120.821],
      ['台中', 24.148, 120.674], ['彰化', 24.081, 120.538], ['南投', 23.909, 120.684],
      ['雲林', 23.709, 120.543], ['嘉義', 23.480, 120.449], ['台南', 22.999, 120.227],
      ['高雄', 22.627, 120.301], ['屏東', 22.672, 120.488], ['宜蘭', 24.757, 121.753],
      ['花蓮', 23.987, 121.601], ['台東', 22.756, 121.144], ['澎湖', 23.571, 119.579],
      ['金門', 24.436, 118.318], ['馬祖', 26.160, 119.949]
    ].map(([n, lat, lon]) => [n, lat, lon, 'Asia/Taipei']) },
    { group: '海外', items: [
      ['香港', 22.319, 114.169, 'Asia/Hong_Kong'], ['澳門', 22.199, 113.544, 'Asia/Macau'],
      ['上海', 31.230, 121.474, 'Asia/Shanghai'], ['北京', 39.904, 116.407, 'Asia/Shanghai'],
      ['廣州', 23.129, 113.264, 'Asia/Shanghai'], ['東京', 35.690, 139.692, 'Asia/Tokyo'],
      ['大阪', 34.694, 135.502, 'Asia/Tokyo'], ['首爾', 37.567, 126.978, 'Asia/Seoul'],
      ['新加坡', 1.352, 103.820, 'Asia/Singapore'], ['吉隆坡', 3.139, 101.687, 'Asia/Kuala_Lumpur'],
      ['曼谷', 13.756, 100.502, 'Asia/Bangkok'], ['胡志明市', 10.823, 106.630, 'Asia/Ho_Chi_Minh'],
      ['馬尼拉', 14.600, 120.984, 'Asia/Manila'], ['雅加達', -6.208, 106.846, 'Asia/Jakarta'],
      ['雪梨', -33.869, 151.209, 'Australia/Sydney'], ['墨爾本', -37.814, 144.963, 'Australia/Melbourne'],
      ['奧克蘭', -36.849, 174.763, 'Pacific/Auckland'], ['倫敦', 51.507, -0.128, 'Europe/London'],
      ['巴黎', 48.857, 2.352, 'Europe/Paris'], ['紐約', 40.713, -74.006, 'America/New_York'],
      ['洛杉磯', 34.052, -118.244, 'America/Los_Angeles'], ['舊金山', 37.775, -122.419, 'America/Los_Angeles'],
      ['溫哥華', 49.283, -123.121, 'America/Vancouver'], ['多倫多', 43.653, -79.383, 'America/Toronto']
    ] }
  ];

  const CUSTOM_ZONES = [
    'Asia/Taipei', 'Asia/Hong_Kong', 'Asia/Shanghai', 'Asia/Tokyo', 'Asia/Seoul', 'Asia/Singapore',
    'Asia/Bangkok', 'Asia/Manila', 'Asia/Jakarta', 'Asia/Kolkata', 'Asia/Dubai', 'Europe/London',
    'Europe/Paris', 'Europe/Berlin', 'America/New_York', 'America/Chicago', 'America/Denver',
    'America/Los_Angeles', 'America/Vancouver', 'America/Toronto', 'Australia/Sydney',
    'Australia/Perth', 'Pacific/Auckland', 'Pacific/Honolulu', 'UTC'
  ];

  const STORE_KEY = 'star-sign.people';
  const $ = (id) => document.getElementById(id);

  // ---------- 時區 ----------

  const fmtCache = {};
  function tzOffsetMinutes(utcMs, tz) {
    const fmt = fmtCache[tz] || (fmtCache[tz] = new Intl.DateTimeFormat('en-US', {
      timeZone: tz, hourCycle: 'h23', year: 'numeric', month: '2-digit', day: '2-digit',
      hour: '2-digit', minute: '2-digit', second: '2-digit'
    }));
    const p = {};
    for (const part of fmt.formatToParts(new Date(utcMs))) p[part.type] = part.value;
    const asUtc = Date.UTC(+p.year, +p.month - 1, +p.day, +p.hour % 24, +p.minute, +p.second);
    return Math.round((asUtc - Math.floor(utcMs / 1000) * 1000) / 60000);
  }

  function zonedToUtc(y, mo, d, h, mi, tz) {
    const wall = Date.UTC(y, mo - 1, d, h, mi);
    let off = tzOffsetMinutes(wall, tz);
    let utc = wall - off * 60000;
    const off2 = tzOffsetMinutes(utc, tz);
    if (off2 !== off) { off = off2; utc = wall - off * 60000; }
    const std = Math.min(tzOffsetMinutes(Date.UTC(y, 0, 1), tz), tzOffsetMinutes(Date.UTC(y, 6, 1), tz));
    return { date: new Date(utc), offset: off, dst: off > std };
  }

  function fmtOffset(min) {
    const sign = min >= 0 ? '+' : '−';
    const a = Math.abs(min);
    const h = Math.floor(a / 60), m = a % 60;
    return 'UTC' + sign + h + (m ? ':' + String(m).padStart(2, '0') : '');
  }

  // ---------- 星座 ----------

  const signIndex = (lon) => Math.floor(lon / 30) % 12;

  function fmtDegree(lon) {
    const inSign = lon % 30;
    let deg = Math.floor(inSign);
    let min = Math.round((inSign - deg) * 60);
    if (min === 60) { deg += 1; min = 0; }
    return deg + '°' + String(min).padStart(2, '0') + '′';
  }

  // 在 [a, b] 之間找出星座改變的時間點
  function findChange(fn, a, b) {
    const sa = signIndex(fn(a));
    for (let i = 0; i < 30; i++) {
      const mid = new Date((a.getTime() + b.getTime()) / 2);
      if (signIndex(fn(mid)) === sa) a = mid; else b = mid;
    }
    return b;
  }

  function fmtLocalTime(date, tz) {
    return new Intl.DateTimeFormat('zh-TW', { timeZone: tz, hour: '2-digit', minute: '2-digit', hourCycle: 'h23' }).format(date);
  }

  // ---------- 表單 ----------

  function buildPlaceSelect() {
    const sel = $('place');
    for (const g of PLACES) {
      const og = document.createElement('optgroup');
      og.label = g.group;
      for (const [n, lat, lon, tz] of g.items) {
        const o = document.createElement('option');
        o.value = n;
        o.textContent = n;
        o.dataset.lat = lat; o.dataset.lon = lon; o.dataset.tz = tz;
        og.appendChild(o);
      }
      sel.appendChild(og);
    }
    const o = document.createElement('option');
    o.value = '__custom';
    o.textContent = '其他地點（自己填經緯度）';
    sel.appendChild(o);

    const tzSel = $('customTz');
    for (const z of CUSTOM_ZONES) {
      const op = document.createElement('option');
      op.value = z; op.textContent = z;
      tzSel.appendChild(op);
    }
  }

  function readForm() {
    const place = $('place');
    const custom = place.value === '__custom';
    const opt = place.selectedOptions[0];
    return {
      name: $('name').value.trim(),
      date: $('birthDate').value,
      time: $('birthTime').value,
      unknownTime: $('unknownTime').checked,
      place: place.value,
      lat: custom ? parseFloat($('customLat').value) : parseFloat(opt.dataset.lat),
      lon: custom ? parseFloat($('customLon').value) : parseFloat(opt.dataset.lon),
      tz: custom ? $('customTz').value : opt.dataset.tz,
      customLat: $('customLat').value,
      customLon: $('customLon').value,
      customTz: $('customTz').value
    };
  }

  function fillForm(p) {
    $('name').value = p.name || '';
    $('birthDate').value = p.date || '';
    $('birthTime').value = p.time || '';
    $('unknownTime').checked = !!p.unknownTime;
    $('place').value = p.place || '台北';
    $('customLat').value = p.customLat || '';
    $('customLon').value = p.customLon || '';
    $('customTz').value = p.customTz || 'Asia/Taipei';
    syncFormState();
  }

  function syncFormState() {
    $('birthTime').disabled = $('unknownTime').checked;
    $('customBox').hidden = $('place').value !== '__custom';
  }

  // ---------- 計算與顯示 ----------

  function calculate(p) {
    const [y, mo, d] = p.date.split('-').map(Number);
    const res = { p, placeName: p.place === '__custom' ? `緯度 ${p.lat}、經度 ${p.lon}` : p.place };

    if (p.unknownTime) {
      const start = zonedToUtc(y, mo, d, 0, 0, p.tz);
      const next = new Date(y, mo - 1, d + 1);
      const end = zonedToUtc(next.getFullYear(), next.getMonth() + 1, next.getDate(), 0, 0, p.tz);
      const endMinus = new Date(end.date.getTime() - 1000);
      res.tzInfo = start;
      res.sun = dayRange(Astro.sunLongitude, start.date, endMinus, p.tz);
      res.moon = dayRange(Astro.moonLongitude, start.date, endMinus, p.tz);
      res.rising = null;
      res.chart = buildChart(zonedToUtc(y, mo, d, 12, 0, p.tz).date, null);
    } else {
      const [h, mi] = p.time.split(':').map(Number);
      const t = zonedToUtc(y, mo, d, h, mi, p.tz);
      res.tzInfo = t;
      res.sun = atTime(Astro.sunLongitude, t.date, 6 * 3600e3, p.tz);
      res.moon = atTime(Astro.moonLongitude, t.date, 3600e3, p.tz);
      const ascFn = (dt) => Astro.ascendant(dt, p.lat, p.lon);
      res.rising = atTime(ascFn, t.date, 15 * 60e3, p.tz);
      res.mcInfo = atTime((dt) => Astro.midheaven(dt, p.lon), t.date, 15 * 60e3, p.tz);
      res.chart = buildChart(t.date, Astro.houses(t.date, p.lat, p.lon));
    }
    return res;
  }

  function buildChart(date, houses) {
    const lons = Astro.bodies(date);
    const list = BODIES.map((b) => {
      const lon = lons[b.key];
      const motion = b.key === 'node' ? 0 : Astro.dailyMotion(b.key, date);
      return { ...b, lon, idx: signIndex(lon), retro: motion < 0, house: houses ? Astro.houseOf(lon, houses.cusps) : null };
    });
    if (houses) {
      list.push({ ...POINTS.asc, lon: houses.asc, idx: signIndex(houses.asc), house: 1 });
      list.push({ ...POINTS.mc, lon: houses.mc, idx: signIndex(houses.mc), house: 10 });
    }
    return { list, houses, aspects: findAspects(list) };
  }

  function findAspects(list) {
    const pts = list.filter((b) => b.key !== 'node');
    const out = [];
    for (let i = 0; i < pts.length; i++) {
      for (let j = i + 1; j < pts.length; j++) {
        const a = pts[i], b = pts[j];
        if (POINTS[a.key] && POINTS[b.key]) continue;
        if (GENERATIONAL.includes(a.key) && GENERATIONAL.includes(b.key)) continue;
        const sep = Math.abs(((b.lon - a.lon + 540) % 360) - 180);
        for (const asp of ASPECTS) {
          const orb = Math.abs(sep - asp.angle);
          if (orb <= asp.orb) out.push({ a, b, asp, orb });
        }
      }
    }
    return out.sort((x, y) => x.orb - y.orb);
  }

  function atTime(fn, date, margin, tz) {
    const lon = fn(date);
    const idx = signIndex(lon);
    const r = { lon, idx, alt: null };
    const before = signIndex(fn(new Date(date.getTime() - margin)));
    const after = signIndex(fn(new Date(date.getTime() + margin)));
    const other = before !== idx ? before : after !== idx ? after : null;
    if (other !== null) {
      const a = before !== idx ? new Date(date.getTime() - margin) : date;
      const b = before !== idx ? date : new Date(date.getTime() + margin);
      r.alt = { idx: other, at: fmtLocalTime(findChange(fn, a, b), tz), margin };
    }
    return r;
  }

  function dayRange(fn, start, end, tz) {
    const s = signIndex(fn(start));
    const e = signIndex(fn(end));
    if (s === e) return { lon: fn(new Date((start.getTime() + end.getTime()) / 2)), idx: s, change: null };
    return { idx: s, change: { idx: e, at: fmtLocalTime(findChange(fn, start, end), tz) } };
  }

  function marginText(ms) {
    return ms >= 3600e3 ? (ms / 3600e3) + ' 小時' : (ms / 60e3) + ' 分鐘';
  }

  function cardHtml(kind, title, desc, r) {
    const s = SIGNS[r.idx];
    let body = `<p class="sign-text">${s[kind]}</p>`;
    let note = '';
    let degree = r.lon !== undefined && !r.change ? fmtDegree(r.lon) : '';
    if (r.change) {
      const s2 = SIGNS[r.change.idx];
      degree = '';
      note = `<p class="note">這天 ${r.change.at} 從${s.name}進入<b>${s2.name}</b>：${r.change.at} 前出生是${s.name}，之後是${s2.name}。</p>`
        + `<p class="sign-text alt">${s2.sym}\uFE0E ${s2.name}：${s2[kind]}</p>`;
    } else if (r.alt) {
      const s2 = SIGNS[r.alt.idx];
      note = `<p class="note">接近交界：${r.alt.at} 是${s.name}與${s2.name}的分界，出生時間若差 ${marginText(r.alt.margin)}內，可能是<b>${s2.name}</b>。</p>`;
    }
    const nameLine = r.change ? `${s.name} / ${SIGNS[r.change.idx].name}` : s.name;
    return `<article class="card ${ELEMENT_CLASS[s.element]}">
      <header><span class="kind">${title}</span><span class="desc">${desc}</span></header>
      <div class="sign"><span class="sym">${s.sym}\uFE0E</span><div><div class="sign-name">${nameLine}</div>
      <div class="meta">${s.element}象・${s.mode}${degree ? '・' + degree : ''}</div></div></div>
      ${body}${note}
    </article>`;
  }

  function render(res) {
    const { p, tzInfo } = res;
    const who = p.name ? `${p.name}的` : '';
    const timeText = p.unknownTime ? '（出生時間不確定）' : p.time;
    let html = `<h2>${who}星座結果</h2>
      <p class="summary">${p.date.replace(/-/g, '/')} ${timeText}・${res.placeName}・${fmtOffset(tzInfo.offset)}${tzInfo.dst ? '（當時是夏令時間，已自動扣回）' : ''}</p>
      <div class="cards">`;
    html += cardHtml('sun', '太陽星座', '核心自我、人生方向', res.sun);
    html += cardHtml('moon', '月亮星座', '內在情緒、安全感', res.moon);
    if (res.rising) {
      html += cardHtml('rising', '上升星座', '第一印象、外在風格', res.rising);
    } else {
      html += `<article class="card muted"><header><span class="kind">上升星座</span><span class="desc">第一印象、外在風格</span></header>
        <p class="sign-text">上升星座大約每 2 小時換一個，需要知道出生時間才能算。</p></article>`;
    }
    html += '</div>';

    if (!res.sun.change && !res.moon.change) {
      const e1 = SIGNS[res.sun.idx].element, e2 = SIGNS[res.moon.idx].element;
      const key = [e1, e2].sort().join('');
      const combo = ELEMENT_COMBO[key] || ELEMENT_COMBO[e2 + e1];
      html += `<div class="combo"><b>太陽${e1}象 × 月亮${e2}象</b>：${combo}</div>`;
    }
    html += chartSection(res);
    $('result').innerHTML = html;
    $('result').hidden = false;
    $('result').scrollIntoView({ behavior: 'smooth', block: 'start' });
  }

  // ---------- 星盤 ----------

  const glyph = (b) => (POINTS[b.key] ? b.glyph : b.glyph + '\uFE0E');

  function chartSection(res) {
    const ch = res.chart;
    const timeKnown = !!ch.houses;
    let html = '<h3>星盤</h3>';
    if (!timeKnown) {
      html += '<p class="note">不知道出生時間：行星以當天中午的位置估算（月亮一天會移動約 13°），上升、天頂、宮位需要出生時間才能算。</p>';
    }
    html += `<div class="chart-wrap">${chartSvg(ch)}${elementSummary(ch)}</div>`;
    html += summarySection(ch, res);
    html += planetTable(ch, res);
    if (timeKnown) html += houseTable(ch);
    html += aspectTable(ch);
    return html;
  }

  const mainBodies = (ch) => ch.list.filter((b) => !POINTS[b.key] && b.key !== 'node');
  const topKey = (obj) => Object.keys(obj).reduce((a, k) => (obj[k].length > obj[a].length ? k : a));
  const lowKey = (obj) => Object.keys(obj).reduce((a, k) => (obj[k].length < obj[a].length ? k : a));

  function countElements(ch) {
    const el = { '火': [], '土': [], '風': [], '水': [] };
    const md = { '開創': [], '固定': [], '變動': [] };
    for (const b of mainBodies(ch)) {
      el[SIGNS[b.idx].element].push(b.name);
      md[SIGNS[b.idx].mode].push(b.name);
    }
    return { el, md };
  }

  const ELEMENT_LACK = {
    '火': '衝勁和主動性需要刻意培養', '土': '容易不夠務實，做事要多規劃',
    '風': '溝通表達與客觀思考要多練習', '水': '情感表達比較含蓄，不太說出心裡話'
  };

  function summarySection(ch, res) {
    const by = Object.fromEntries(ch.list.map((b) => [b.key, b]));
    const sn = (k) => SIGNS[by[k].idx].name;
    const kw = (k) => SIGN_KEYWORDS[by[k].idx].split('、').slice(0, 2).join('、');
    const items = [];

    let moonPart = `內心是${sn('moon')}的${kw('moon')}`;
    if (res.moon.change) moonPart = `內心可能是${SIGNS[res.moon.idx].name}或${SIGNS[res.moon.change.idx].name}（看出生時間）`;
    items.push(`<b>整體個性</b>：${by.asc ? `別人第一眼看到的是${sn('asc')}的${kw('asc')}；` : ''}核心是${sn('sun')}的${kw('sun')}；${moonPart}。`);

    const { el, md } = countElements(ch);
    const tEl = topKey(el), lEl = lowKey(el), tMd = topKey(md);
    items.push(`<b>能量主調</b>：${tEl}象最多（${el[tEl].length} 顆），偏重${ELEMENT_TRAIT[tEl]}；${tMd}星座最多，${MODE_TRAIT[tMd]}。`
      + `${lEl}象最少（${el[lEl].length} 顆），${ELEMENT_LACK[lEl]}。`);

    if (ch.houses) {
      const counts = {};
      for (const b of mainBodies(ch)) (counts[b.house] = counts[b.house] || []).push(b.name);
      const focus = Object.keys(counts).filter((h) => counts[h].length >= 2)
        .sort((a, b) => counts[b].length - counts[a].length).slice(0, 2);
      if (focus.length) {
        items.push(`<b>人生重心</b>：` + focus.map((h) =>
          `第 ${h} 宮${HOUSES[h - 1][0]}（${HOUSES[h - 1][1]}）有${counts[h].join('、')}`).join('；') + '，這些領域會特別突出。');
      }
    }

    const housePart = (k) => (by[k].house ? `，落在第 ${by[k].house} 宮（${HOUSES[by[k].house - 1][1].split('、')[0]}）` : '');
    items.push(`<b>感情與行動</b>：金星${sn('venus')}，喜歡${kw('venus')}的相處${housePart('venus')}；火星${sn('mars')}，做事${kw('mars')}${housePart('mars')}。`);
    items.push(`<b>思考溝通</b>：水星${sn('mercury')}，想法${kw('mercury')}${housePart('mercury')}。`);
    items.push(`<b>事業與課題</b>：${by.mc ? `天頂${sn('mc')}，適合發揮${kw('mc')}的特質；` : ''}木星${sn('jupiter')}帶來機會，土星${sn('saturn')}${housePart('saturn')}，是需要慢慢磨練的地方。`);

    const retro = ['mercury', 'venus', 'mars'].filter((k) => by[k].retro).map((k) => by[k].name);
    if (retro.length) items.push(`<b>逆行</b>：${retro.join('、')}逆行，這方面的特質比較內斂，常會反覆思考後才表現出來。`);

    const top = ch.aspects.filter((x) => !(GENERATIONAL.includes(x.a.key) && GENERATIONAL.includes(x.b.key))).slice(0, 3);
    if (top.length) {
      items.push(`<b>最明顯的相位</b>：` + top.map(({ a, b, asp }) =>
        `${a.name}${asp.name}${b.name}（${asp.nature}，${a.short}×${b.short}）`).join('；') + '。');
    }

    items.push(`<b>成長方向</b>：北交點${sn('node')}，這輩子要學習${kw('node')}；南交點在${SIGNS[(by.node.idx + 6) % 12].name}，是熟悉的舒適圈。`);

    return `<h3>總結</h3><div class="summary-box"><ul>${items.map((t) => `<li>${t}</li>`).join('')}</ul></div>`;
  }

  function elementSummary(ch) {
    const { el, md } = countElements(ch);
    const topEl = topKey(el), topMd = topKey(md);
    const bar = (obj, cls) => Object.keys(obj).map((k) =>
      `<div class="bar-row"><span class="bar-label">${k}${cls ? '象' : ''}</span><span class="track"><span class="bar ${cls ? ELEMENT_CLASS[k] : 'mode'}" style="width:${obj[k].length * 10}%"></span></span><span class="bar-num">${obj[k].length}</span><span class="bar-names">${obj[k].join('、')}</span></div>`
    ).join('');
    return `<div class="elements">
      <h4>元素分布（十顆星）</h4>${bar(el, true)}
      <h4>模式分布</h4>${bar(md, false)}
      <p class="sign-text">${topEl}象最多：偏重${ELEMENT_TRAIT[topEl]}；${topMd}最多：${MODE_TRAIT[topMd]}。</p>
    </div>`;
  }

  function planetTable(ch, res) {
    const timeKnown = !!ch.houses;
    const rows = ch.list.map((b) => {
      const s = SIGNS[b.idx];
      let text;
      if (b.key === 'sun') text = s.sun;
      else if (b.key === 'moon') text = s.moon;
      else if (b.key === 'asc') text = s.rising;
      else text = `${b.lead}帶有${s.name}色彩：${SIGN_KEYWORDS[b.idx]}。`;
      if (b.house) text += `<span class="house-hint">落在第 ${b.house} 宮（${HOUSES[b.house - 1][1]}）</span>`;
      if (b.key === 'node') text += `<span class="house-hint">南交點在對面的${SIGNS[(b.idx + 6) % 12].name}，代表習慣、舒適圈。</span>`;
      if (b.key === 'mc' && res.mcInfo && res.mcInfo.alt) {
        text += `<span class="house-hint warn">接近交界，出生時間差 15 分鐘內可能是${SIGNS[res.mcInfo.alt.idx].name}。</span>`;
      }
      const est = !timeKnown && b.key === 'moon' ? '<span class="tag">中午估算</span>' : '';
      const retro = b.retro ? '<span class="tag retro">℞ 逆行</span>' : '';
      const gen = GENERATIONAL.includes(b.key) ? '<span class="tag">世代</span>' : '';
      return `<tr class="${ELEMENT_CLASS[s.element]}">
        <td class="body"><span class="glyph">${glyph(b)}</span>${b.name}${retro}${gen}</td>
        <td class="pos"><span class="sym">${s.sym}\uFE0E</span>${s.name}<br><small>${fmtDegree(b.lon)}</small>${est}</td>
        ${timeKnown ? `<td class="house">${b.house} 宮</td>` : ''}
        <td>${text}</td></tr>`;
    }).join('');
    return `<h3>行星與重要點</h3><div class="table-wrap"><table class="planets">
      <thead><tr><th>星體</th><th>星座</th>${timeKnown ? '<th>宮位</th>' : ''}<th>說明</th></tr></thead>
      <tbody>${rows}</tbody></table></div>`;
  }

  function houseTable(ch) {
    const { cusps, system } = ch.houses;
    const rows = cusps.map((c, i) => {
      const inside = ch.list.filter((b) => !POINTS[b.key] && b.house === i + 1)
        .map((b) => `<span class="pill">${glyph(b)} ${b.name}</span>`).join('') || '<span class="empty">—</span>';
      const s = SIGNS[signIndex(c)];
      return `<tr><td class="hnum">${i + 1}</td><td>${HOUSES[i][0]}</td>
        <td class="pos"><span class="sym ${ELEMENT_CLASS[s.element]}">${s.sym}\uFE0E</span>${s.name} <small>${fmtDegree(c)}</small></td>
        <td>${HOUSES[i][1]}</td><td>${inside}</td></tr>`;
    }).join('');
    const sysNote = system === 'Placidus' ? '' : '出生地緯度太高，改用 Porphyry 分宮制。';
    return `<h3>十二宮位</h3><p class="summary">${sysNote}宮首星座代表這個生活領域的態度，宮內有星代表人生會特別著重這一塊。</p>
      <div class="table-wrap"><table class="houses">
      <thead><tr><th>宮</th><th>名稱</th><th>宮首星座</th><th>主題</th><th>宮內星體</th></tr></thead>
      <tbody>${rows}</tbody></table></div>`;
  }

  function aspectTable(ch) {
    if (!ch.aspects.length) return '';
    const rows = ch.aspects.map(({ a, b, asp, orb }) => `<tr class="${asp.cls}">
      <td><span class="glyph">${glyph(a)}</span>${a.name} <span class="asp-sym">${asp.sym}\uFE0E</span> <span class="glyph">${glyph(b)}</span>${b.name}</td>
      <td>${asp.name}<br><small>${asp.nature}</small></td>
      <td>${orb.toFixed(1)}°</td>
      <td>${a.short} × ${b.short}：${asp.text}。</td></tr>`).join('');
    return `<h3>相位（行星之間的角度）</h3>
      <p class="summary">容許度越小影響越明顯；天王、海王、冥王彼此的相位是同一代人共有，不列出。</p>
      <div class="table-wrap"><table class="aspects">
      <thead><tr><th>星體</th><th>相位</th><th>容許度</th><th>意思</th></tr></thead>
      <tbody>${rows}</tbody></table></div>`;
  }

  function chartSvg(ch) {
    const size = 560, c = size / 2;
    const R = { outer: 268, zodiac: 228, house: 200, planet: 172, aspect: 128 };
    const asc = ch.houses ? ch.houses.asc : 0;
    const P = (lon, r) => {
      const a = (180 + lon - asc) * Math.PI / 180;
      return [c + r * Math.cos(a), c - r * Math.sin(a)];
    };
    const f = (n) => n.toFixed(1);
    const line = (l1, r1, l2, r2, cls) => {
      const [x1, y1] = P(l1, r1), [x2, y2] = P(l2, r2);
      return `<line x1="${f(x1)}" y1="${f(y1)}" x2="${f(x2)}" y2="${f(y2)}" class="${cls}"/>`;
    };
    const text = (lon, r, str, cls) => {
      const [x, y] = P(lon, r);
      return `<text x="${f(x)}" y="${f(y)}" class="${cls}">${str}</text>`;
    };

    let s = `<svg class="wheel" viewBox="0 0 ${size} ${size}" role="img" aria-label="星盤圖">`;
    for (let i = 0; i < 12; i++) {
      const l1 = i * 30, l2 = l1 + 30;
      const [ax, ay] = P(l1, R.outer), [bx, by] = P(l2, R.outer), [cx2, cy2] = P(l2, R.zodiac), [dx, dy] = P(l1, R.zodiac);
      s += `<path d="M${f(ax)} ${f(ay)} A${R.outer} ${R.outer} 0 0 0 ${f(bx)} ${f(by)} L${f(cx2)} ${f(cy2)} A${R.zodiac} ${R.zodiac} 0 0 1 ${f(dx)} ${f(dy)}Z" class="seg ${ELEMENT_CLASS[SIGNS[i].element]}"/>`;
      s += text(l1 + 15, (R.outer + R.zodiac) / 2, SIGNS[i].sym + '\uFE0E', `zsym ${ELEMENT_CLASS[SIGNS[i].element]}`);
    }
    for (let d = 0; d < 360; d += 5) s += line(d, R.zodiac, d, R.zodiac - (d % 10 ? 4 : 8), 'tick');
    s += `<circle cx="${c}" cy="${c}" r="${R.house}" class="ring"/><circle cx="${c}" cy="${c}" r="${R.aspect}" class="ring"/>`;

    if (ch.houses) {
      const cu = ch.houses.cusps;
      cu.forEach((lon, i) => {
        const angular = i % 3 === 0;
        s += line(lon, angular ? R.outer : R.zodiac, lon, R.aspect, angular ? 'cusp angle' : 'cusp');
        const mid = lon + (((cu[(i + 1) % 12] - lon) % 360 + 360) % 360) / 2;
        s += text(mid, (R.zodiac + R.house) / 2, i + 1, 'hnum');
      });
      s += text(cu[0] + 4, R.aspect + 12, 'ASC', 'axis');
      s += text(cu[9] + 4, R.aspect + 12, 'MC', 'axis');
    }

    for (const { a, b, asp } of ch.aspects) {
      if (asp.cls === 'conj') continue;
      s += line(a.lon, R.aspect, b.lon, R.aspect, `asp ${asp.cls}`);
    }

    const shown = spread(ch.list.filter((b) => !POINTS[b.key]), 8);
    for (const b of shown) {
      const cls = ELEMENT_CLASS[SIGNS[b.idx].element];
      s += line(b.lon, R.house, b.lon, R.house - 6, 'ptick');
      s += line(b.lon, R.house - 6, b.d, R.planet + 13, 'pline');
      s += text(b.d, R.planet, glyph(b), `pglyph ${cls}`);
      s += text(b.d, R.planet - 20, Math.floor(b.lon % 30) + '°' + (b.retro ? '℞' : ''), 'pdeg');
    }
    return s + '</svg>';
  }

  // 讓太靠近的行星符號錯開，避免疊在一起
  function spread(items, minSep) {
    const arr = items.map((o) => ({ ...o, d: o.lon })).sort((x, y) => x.lon - y.lon);
    if (arr.length < 2) return arr;
    for (let it = 0; it < 200; it++) {
      let moved = false;
      for (let i = 0; i < arr.length; i++) {
        const a = arr[i], b = arr[(i + 1) % arr.length];
        const gap = ((b.d - a.d) % 360 + 360) % 360;
        if (gap < minSep - 0.01) {
          const push = (minSep - gap) / 2;
          a.d -= push; b.d += push;
          moved = true;
        }
      }
      if (!moved) break;
    }
    return arr;
  }

  // ---------- 存檔 ----------

  function loadPeople() {
    try { return JSON.parse(localStorage.getItem(STORE_KEY)) || []; } catch (e) { return []; }
  }

  function savePeople(list) {
    localStorage.setItem(STORE_KEY, JSON.stringify(list));
    renderPeople();
  }

  function renderPeople() {
    const list = loadPeople();
    const box = $('people');
    box.innerHTML = '';
    $('peopleBox').hidden = list.length === 0;
    list.forEach((p, i) => {
      const chip = document.createElement('span');
      chip.className = 'chip';
      const btn = document.createElement('button');
      btn.type = 'button';
      btn.textContent = p.name || p.date;
      btn.addEventListener('click', () => { fillForm(p); submit(); });
      const del = document.createElement('button');
      del.type = 'button';
      del.className = 'del';
      del.title = '刪除';
      del.textContent = '×';
      del.addEventListener('click', () => {
        if (!confirm(`刪除「${p.name || p.date}」？`)) return;
        const l = loadPeople(); l.splice(i, 1); savePeople(l);
      });
      chip.append(btn, del);
      box.appendChild(chip);
    });
  }

  // ---------- 事件 ----------

  function validate(p) {
    if (!p.date) return '請填出生日期';
    if (!p.unknownTime && !p.time) return '請填出生時間，或勾選「不知道出生時間」';
    if (p.place === '__custom' && (isNaN(p.lat) || isNaN(p.lon) || Math.abs(p.lat) > 90 || Math.abs(p.lon) > 180)) {
      return '請填正確的緯度（−90～90）和經度（−180～180）';
    }
    return '';
  }

  function submit() {
    const p = readForm();
    const err = validate(p);
    $('error').textContent = err;
    if (err) return;
    render(calculate(p));
  }

  function initTheme() {
    const btn = $('theme');
    const apply = (light) => {
      if (light) document.documentElement.dataset.theme = 'light';
      else delete document.documentElement.dataset.theme;
      btn.textContent = light ? '黑底' : '白底';
    };
    apply(document.documentElement.dataset.theme === 'light');
    btn.addEventListener('click', () => {
      const light = document.documentElement.dataset.theme !== 'light';
      localStorage.setItem('star-sign.theme', light ? 'light' : 'dark');
      apply(light);
    });
  }

  function init() {
    initTheme();
    buildPlaceSelect();
    $('place').value = '台北';
    syncFormState();
    $('unknownTime').addEventListener('change', syncFormState);
    $('place').addEventListener('change', syncFormState);
    $('form').addEventListener('submit', (e) => { e.preventDefault(); submit(); });
    $('saveBtn').addEventListener('click', () => {
      const p = readForm();
      const err = validate(p);
      $('error').textContent = err;
      if (err) return;
      if (!p.name) { $('error').textContent = '存起來前請先填名字'; return; }
      const list = loadPeople().filter((x) => x.name !== p.name);
      list.push(p);
      savePeople(list);
      submit();
    });
    renderPeople();
  }

  document.addEventListener('DOMContentLoaded', init);
})();
