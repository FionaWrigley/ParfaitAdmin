module.exports = {
  purge: [],
  darkMode: 'media', // or 'media' or 'class'
  theme: {
    gradientColorStops: theme => ({
      ...theme('colors'),
        primaryLight: '#fce7f3',
        secondaryLight: '#ede9fe',
        primaryDark: '#99174d',
        secondaryDark: '#481f7c',
        pinkish: '#e5d1f0'
        }),

        extend: {
        minWidth: {
          '1200' : '1200px',
          '3/4': '75%',
          'full': '100%'
      },
      width: {
        'active' : '5em',
        'search' : '22em'
      }
    }
      

    },

  variants: {
    extend: {

      


    },
  },
  plugins: [],
}
