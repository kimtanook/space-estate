// const admin = require("firebase-admin");
// const firestore = require("firebase-admin/firestore");

// const serviceAccount = require("../../../utils/d-test-e64af-firebase-adminsdk-7exf5-da0aa26f15.json");
// if (!admin.apps.length) {
//   admin.initializeApp({
//     credential: admin.credential.cert(serviceAccount),
//   });
// }
// const db = firestore.getFirestore();

// // 초기 행성 데이터
// let planetPriceData = {
//   planets: [
//     {name: "Mercury", price: 200},
//     {name: "Venus", price: 100},
//     {name: "Earth", price: 120},
//     {name: "Mars", price: 340},
//     {name: "Jupiter", price: 130},
//     {name: "Saturn", price: 150},
//     {name: "Uranus", price: 90},
//     {name: "Neptune", price: 20},
//   ],
// };

// // 1분(60초)마다 가격을 수정하는 타이머 설정
// setInterval(async () => {
//   const cityRef = db.collection("planetPriceData").doc("LA2");
//   const doc = await cityRef.get();
//   if (!doc.exists) {
//     console.log("No such document!");
//   } else {
//     console.log("Document data:", doc.data());
//   }
//   // 각 행성의 가격을 10% 증가 또는 감소시킴
//   planetPriceData.planets.forEach((planet) => {
//     // 50% 확률로 가격을 10% 증가시키거나 감소시킴
//     if (Math.random() < 0.5) {
//       planet.price = Math.floor(planet.price * 1.1); // 10% 증가
//     } else {
//       planet.price = Math.floor(planet.price * 0.9); // 10% 감소
//     }
//   });
//   db.collection("planetPriceData").doc("LA2").set(planetPriceData);
// }, 1000 * 60 * 5);
