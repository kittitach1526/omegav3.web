import { db } from "./firebase.js";
import { collection, getDocs } from "firebase/firestore";

export const getLastUpdate = async () => {
  try {
    const querySnapshot = await getDocs(collection(db, "last_update"));

    // เอา document แรก
    const lastUpdate =
      querySnapshot.docs[0]?.data()?.date || "N/A";

    console.log("Last Update:", lastUpdate);

    return lastUpdate;

  } catch (error) {
    console.error("โหลดข้อมูลไม่สำเร็จ:", error);
    return "N/A";
  }
};