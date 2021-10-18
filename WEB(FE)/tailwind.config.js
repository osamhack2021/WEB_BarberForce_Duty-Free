module.exports = {
  theme: {
    extend: {
      colors: {
        kakao: '#fbe300',
        email: '#2196f3',
        brand: '#406D96',
      },
    },
  },
  variants: {
    extend: {
      borderWidth: ['last'],
    },
  },
  plugins: [require('@tailwindcss/aspect-ratio')],
  corePlugins: {
    container: false,
  },
  purge: {},
};
