export const utf16toEntities = (str) => {
  if (!str) return
  const patt=/[\ud800-\udbff][\udc00-\udfff]/g; // 检测utf16字符正则
  str = str.replace(patt, function(char){
    let H, L, code;
    if (char.length===2) {
      H = char.charCodeAt(0); // 取出高位
      L = char.charCodeAt(1); // 取出低位
      code = (H - 0xD800) * 0x400 + 0x10000 + L - 0xDC00; // 转换算法
      return "&#" + code + ";";
    } else {
      return char;
    }
  });
  return str;
}

export const toUtf16 = (str) => {
  if (!str) return
  const patt = /&#(\d+);/g;
  str = str.replace(patt, ($1,$2) => {
    const H = Math.floor(($2-0x10000) / 0x400)+0xD800
    const L = ($2 - 0x10000) % 0x400 + 0xDC00
    return unescape('%u'+ H.toString(16) + '%u' + L.toString(16))
  })
  return str
}