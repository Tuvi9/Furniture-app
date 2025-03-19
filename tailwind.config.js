/** @type {import('tailwindcss').Config} */
module.exports = {
  // NOTE: Update this to include the paths to all of your component files.
  content: ["./app/**/*.{js,jsx,ts,tsx}"],
  presets: [require("nativewind/preset")],
  theme: {
    extend: {
      colors: {
        seablue:'#4F63AC',
        muteorange:'#FCA34D',
        lightgray: '#8D9BB5',
        darkgray: '#303030',
        gray: '#F5F5F5',
        white: '#FFFFFF',
      },
      fontFamily: {
        'dm-sans': ['DM-Sans'],
        'dm-sans-bold': ['DM-Sans-Bold'],
        'dm-sans-medium': ['DM-Sans-Medium'],
        'dm-sans-extrabold': ['DM-Sans-ExtraBold'],
      },
    },
  },
  plugins: [],
}