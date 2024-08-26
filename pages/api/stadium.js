import { db } from "../../firebaseConfig";
import { collection, getDocs, query } from "firebase/firestore";

async function handler(req, res) {
  if (req.method === "GET") {
    try {
      const q = query(collection(db, "stadiums"));
      const querySnapshot = await getDocs(q);

      if (querySnapshot.empty) {
        res.status(404).json({ message: "No stadiums found" });
      } else {
        // Extract the data from each document
        const stadiumData = querySnapshot.docs.map(doc => doc.data());
        res.status(200).json(stadiumData);
      }
    } catch (error) {
      console.error("Error fetching stadiums:", error);
      res.status(500).json({ message: "Internal server error" });
    }
  } else {
    res.status(405).json({ message: "Method not allowed" });
  }
}

export default handler;