import firebase from 'react-native-firebase';

export function activateFirebase() {
  firebase.config().fetch().then( () => {
    return firebase.config().activateFetched();
  }).then( activated => {
    if (!activated) console.log('Fetched data not activated');
  })
}