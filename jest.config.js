module.exports = {
  preset: 'react-native',
  moduleFileExtensions: ['ts', 'tsx', 'js', 'jsx', 'json', 'node'],
  transformIgnorePatterns: [
    "node_modules/(?!react-native|native-base-shoutem-theme|react-navigation|@shoutem/theme|@shoutem/animation|@shoutem/ui|tcomb-form-native|react-native-firebase)"
  ],
  setupFiles: [
    "./__mocks__/react-navigation.ts"
  ]
}
