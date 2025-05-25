/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./src/**/*.{js,ts,jsx,tsx}", "./app/**/*.{js,ts,jsx,tsx}"], // مسیرهای پروژه رو کامل کن
  theme: {
    extend: {
      fontFamily: {
        iran: ["IRANSans", "sans-serif"],
      },
      colors: {
        hertgez: 'rgb(26, 60, 114)',
        background: "#ffffff",
        buttom: "#e1f0f8",
        titles: "#000000",
        titleButtom: "#44618d",
        headerBtt: "#ff9408",
        headerGee: "#14bc84",
        titleHeader: "#4D5766",
        borderClr: "#d2d2d2",
        textClr: "rgb(28, 62, 117)",
        borclr: "rgb(222, 240, 252)",
        hoverClr: "#07b2b2",
        teXt: "#4D5766",
      },
      borderRadius: {
        card: '20px',
        '11px': '11px',       
      },
      keyframes: {
        'slide-glass': {
          '0%, 100%': { left: '-50%' },
          '50%': { left: '150%' },
        },
      },
      animation: {
        'slide-glass': 'slide-glass 2s ease-in-out infinite',
      },
    },
  },
  plugins: [],
};
