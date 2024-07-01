import { db } from "../../firebaseConfig";
import { collection, getDocs, query } from "firebase/firestore";

async function handler(req, res) {
  if (req.method === "GET") {
    try {
      const q = query(collection(db, "badges"));
      const querySnapshot = await getDocs(q);

      if (querySnapshot.empty) {
        res.status(404).json({ message: "No badges found" });
      } else {
        // Extract the data from each document
        const badgesData = querySnapshot.docs.map(doc => doc.data());
        res.status(200).json(badgesData);
      }
    } catch (error) {
      console.error("Error fetching badges:", error);
      res.status(500).json({ message: "Internal server error" });
    }
  } else {
    res.status(405).json({ message: "Method not allowed" });
  }
}

export default handler;