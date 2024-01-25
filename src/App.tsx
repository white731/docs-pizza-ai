import "./App.css";
import Home from "./Home";
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";

function App() {
  // Import the functions you need from the SDKs you need

  // TODO: Add SDKs for Firebase products that you want to use
  // https://firebase.google.com/docs/web/setup#available-libraries

  // Your web app's Firebase configuration
  // For Firebase JS SDK v7.20.0 and later, measurementId is optional
  const firebaseConfig = {
    apiKey: "AIzaSyDZYPwsWyh7x2alTUFpFN6qfwri10AobI0",
    authDomain: "docs-pizza.firebaseapp.com",
    projectId: "docs-pizza",
    storageBucket: "docs-pizza.appspot.com",
    messagingSenderId: "366517735027",
    appId: "1:366517735027:web:bfcc07ffaf1a3a81f22406",
    measurementId: "G-FXL253E752",
  };

  // Initialize Firebase
  const app = initializeApp(firebaseConfig);
  return <Home app={app} />;
}

export default App;
