module.exports = {
  theme: {
    extend: {
      colors: {
        kakao: '#fbe300',
        email: '#2196f3',
      },
    },
  },
  variants: {},
  plugins: [require('@tailwindcss/aspect-ratio')],
  purge: {
    enabled: true,
  },
};
