export default function adapter(titleFontSize) {
  const halfSize = titleFontSize / 2;
  // 和分辨率大小相关的配置
  return {
    title: {
      textStyle: {
        fontSize: titleFontSize,
      },
    },
    series: [
      {
        barWidth: titleFontSize,
        itemStyle: {
          // 控制bar的圆角，分别对应左上、右上、右下、左下
          borderRadius: [0, halfSize, halfSize, 0],
        },
      },
    ],
  };
}