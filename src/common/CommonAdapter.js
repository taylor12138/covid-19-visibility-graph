export default function adapter(titleFontSize) {
  // 和分辨率大小相关的配置
  return {
    title: {
      textStyle: {
        fontSize: titleFontSize,
      },
    },
  };
}