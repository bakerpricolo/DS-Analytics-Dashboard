// Strategic insights derived from the 2025–2026 content analysis.
// These are a fixed read of the imported dataset. When live data grows, the
// numbers can be recomputed — but the findings below are the current snapshot.

export const insights = {
  headline: {
    totalReach: 3149236,
    totalContent: 214,
  },

  // Finding 1 — concentration
  concentration: {
    top10Share: 60,       // % of reach from top 10% of content
    top20Share: 75,
    median: 4143,
    mean: 14854,
    max: 319617,
  },

  // Finding 2 — multi-platform lift
  multiplatform: [
    { label: '1 platform', reach: 4790, pieces: 44 },
    { label: '2 platforms', reach: 8629, pieces: 83 },
    { label: '4 platforms', reach: 26145, pieces: 85 },
  ],
  multiplatformMult: 5.5,
  notAllFour: 127,

  // Finding 3 — format power vs volume (avg reach per piece + count)
  formats: [
    { format: 'VDO', reachPerPiece: 56513, pieces: 9, engRate: 4.79 },
    { format: 'Reels', reachPerPiece: 31869, pieces: 35, engRate: 6.27 },
    { format: 'Short VDO', reachPerPiece: 17267, pieces: 46, engRate: 11.37 },
    { format: 'Live', reachPerPiece: 9361, pieces: 42, engRate: 3.90 },
    { format: 'Podcast', reachPerPiece: 6876, pieces: 10, engRate: 0.58 },
    { format: 'Article', reachPerPiece: 4208, pieces: 34, engRate: 3.05 },
    { format: 'Graphics', reachPerPiece: 3494, pieces: 35, engRate: 7.30 },
  ],

  // Finding 4 — the April proof (monthly reach + power-format volume)
  monthly: [
    { m: 'Aug', reachPerPiece: 5978, powerFormats: 0 },
    { m: 'Sep', reachPerPiece: 4015, powerFormats: 0 },
    { m: 'Oct', reachPerPiece: 11879, powerFormats: 0 },
    { m: 'Nov', reachPerPiece: 17370, powerFormats: 0 },
    { m: 'Dec', reachPerPiece: 10902, powerFormats: 0 },
    { m: 'Jan', reachPerPiece: 25978, powerFormats: 2 },
    { m: 'Feb', reachPerPiece: 16899, powerFormats: 10 },
    { m: 'Mar', reachPerPiece: 11840, powerFormats: 9 },
    { m: 'Apr', reachPerPiece: 40439, powerFormats: 17 },
    { m: 'May', reachPerPiece: 23953, powerFormats: 4 },
    { m: 'Jun', reachPerPiece: 22267, powerFormats: 2 },
  ],

  // Finding 5/6 — platform efficiency
  platforms: [
    { platform: 'Facebook', reachPerPost: 11350, engRate: 6.33, posts: 202, role: 'reach engine' },
    { platform: 'YouTube', reachPerPost: 4463, engRate: 1.62, posts: 140, role: 'archive / search' },
    { platform: 'TikTok', reachPerPost: 1791, engRate: 32.35, posts: 86, role: 'community depth' },
    { platform: 'Instagram', reachPerPost: 636, engRate: 11.29, posts: 122, role: 'underperforming' },
  ],

  // Finding 7 — cross-post opportunity list (highest reach, missing platforms)
  crossPost: [
    { reach: 120701, format: 'Short VDO', on: 2, missing: ['instagram', 'tiktok'], title: 'คำพยานชีวิต "หมออ้อ"' },
    { reach: 86718, format: 'Live', on: 2, missing: ['instagram', 'tiktok'], title: 'รับไฟ ไล่ผี มั่งมี คริสตจักรไทย' },
    { reach: 75394, format: 'Article', on: 1, missing: ['instagram', 'tiktok', 'youtube'], title: 'คริสเตียนถ้ายังไม่รู้เรื่องนี้…' },
    { reach: 50805, format: 'VDO', on: 2, missing: ['instagram', 'tiktok'], title: '[เทป] มีใครเคยสิ้นเนื้อประดาตัว' },
    { reach: 41341, format: 'Podcast', on: 1, missing: ['facebook', 'instagram', 'tiktok'], title: 'EP.1 อยากเป็นคริสเตียนต้องทำยังไง' },
    { reach: 33454, format: 'Graphics', on: 2, missing: ['tiktok', 'youtube'], title: 'Card วันแม่' },
    { reach: 26777, format: 'Live', on: 2, missing: ['instagram', 'tiktok'], title: 'อ. แซม' },
    { reach: 23240, format: 'Live', on: 2, missing: ['instagram', 'tiktok'], title: 'สงครามเขย่าสวรรค์ อ.กนก & อ.ประยูร' },
  ],
};

// Content-signal analysis: what title & content features drive reach
export const signals = {
  livecut: {
    reachPerPiece: 29190,
    restPerPiece: 10076,
    shareOfReach: 49,
    shareOfContent: 25,
    inTop20: 12,
    vsFullStream: { clip: 29190, stream: 9361 },
    reliability: { beatMedian: 94, beat10k: 75 },
  },
  titleFeatures: [
    { label: 'Named speaker', with: 20997, without: 10744, lift: 95 },
    { label: 'Question in title', with: 22260, without: 13133, lift: 69 },
    { label: '[Live cut] tag', with: 29190, without: 10076, lift: 190 },
    { label: 'Episode number', with: 7446, without: 18507, lift: -60 },
  ],
  titleLength: [
    { b: '<25', reach: 10615, n: 40 },
    { b: '25–45', reach: 11986, n: 79 },
    { b: '45–70', reach: 18477, n: 70 },
    { b: '70+', reach: 21055, n: 23 },
  ],
  themes: [
    { t: 'Testimony', th: 'คำพยาน', reach: 69615, n: 3 },
    { t: 'Christian identity', th: 'คริสเตียน', reach: 30169, n: 9 },
    { t: 'Life', th: 'ชีวิต', reach: 17700, n: 20 },
    { t: 'God', th: 'พระเจ้า', reach: 13086, n: 62 },
    { t: 'Love', th: 'รัก', reach: 12869, n: 18 },
    { t: 'Prayer', th: 'อธิษฐาน', reach: 4514, n: 21 },
    { t: 'Faith', th: 'เชื่อ', reach: 3330, n: 9 },
  ],
  viewsReachCorr: 0.93,
  topShared: [
    { rate: 13.3, reach: 18029, title: 'รักพระเจ้าไม่เคยหยุด อ.ประถม' },
    { rate: 11.8, reach: 16124, title: 'รักพระเจ้า ไม่มีจริง?' },
    { rate: 9.7, reach: 21008, title: 'บทเพลงในความมืด พี่หม่อง พิษณุ' },
    { rate: 8.3, reach: 52327, title: 'เห็นความจริงด้วยการเปิดใจ (พี่มองต์)' },
  ],
};
