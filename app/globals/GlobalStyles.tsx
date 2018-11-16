export default GlobalStyles = {
  color: {
    purple: '#4700DC',
    white: '#fff',
    black: '#000'
  },
  textColor: {
    purple: {color: '#4700DC'},
    white: {color: '#fff'},
    black: {color: '#000'}
  },
  padding: {
    defaultPadding: 10
  },
  gradients: {
    purple: ['#4700DC', '#8E72FF'],
    yellow: ['#FF7A00', '#FFD600'],
    red: ['#9E00FF', '#FF3939'],
    green: ['#009E35', '#B6FF6C'],
    blue: ['#0040BC', '#00D1FF'],
    morning: ['#FF9900', '#FFD600'],
    afternoon: ['#8CFFF8', '#FFF0A4'],
    night: ['#03009A', '#AD00FF'],
    latenight: ['#870000', '#47007F']
  },
  fontFamily: {
    primaryFont: {
      fontFamily: 'open-sans-regular'
    },
    primaryFontBold: {
      fontFamily: 'open-sans-bold'
    },
    secondaryFont: {
      fontFamily: 'karla-regular'
    },
    secondaryFontBold: {
      fontFamily: 'karla-bold'
    }
  },
  dropShadow: {
    // Shadow requirement for Android
    elevation: 3,

    // Shadow requirements for iOS
    shadowRadius: 5,
    shadowOpacity: 0.25,
    shadowColor: '#000',
    shadowOffset: {width: 0, height: 0},
  },
  fontSize: {
    large: {
      fontSize: 40
    },
    medium: {
      fontSize: 25
    },
    small: {
      fontSize: 15
    }
  },
  groupText: {
    fontSize: 40,
    color: '#4700DC',
    textAlign: 'left',
    fontWeight: 'bold'
  }
}
