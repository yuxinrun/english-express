/** Tailwind CSS v3 配置：站点配色严格按设计规范收敛到 warm 色板 */
module.exports = {
  content: ['./index.html', './assets/js/**/*.js'],
  theme: {
    extend: {
      colors: {
        warm: {
          bg: '#FFFDF8',      // 主背景：暖米白
          card: '#FFFFFF',    // 卡片背景
          ink: '#3A3A38',     // 文字主色
          muted: '#70706C',   // 次要文字
          accent: '#C88A65',  // 强调色：低饱和暖棕
          blue: '#648B94',    // 辅助色：低饱和灰蓝
          line: '#EAE7E2'     // 边框 / 分割线
        }
      },
      fontFamily: {
        sans: ['PingFang SC', 'Source Han Sans SC', 'Noto Sans SC', 'Microsoft YaHei', 'system-ui', 'sans-serif'],
        en: ['Inter', 'system-ui', 'sans-serif']
      },
      lineHeight: {
        body: '1.7',
        title: '1.3'
      },
      boxShadow: {
        soft: '0 2px 10px rgba(58, 58, 56, 0.045)',
        hover: '0 8px 24px rgba(58, 58, 56, 0.085)'
      }
    }
  },
  // 少量由 JS 状态切换的类名，避免动态拼接时未被扫描
  safelist: [
    'bg-warm-accent', 'text-white', 'border-warm-accent',
    'bg-warm-accent/10', 'text-warm-accent'
  ],
  plugins: []
};
