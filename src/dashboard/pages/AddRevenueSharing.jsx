// Contoh axios POST
import axios from "axios";

const createProject = async () => {
  try {
    const res = await axios.post("http://localhost:5000/api/projects", {
      client_name: "PT ABC",
      date: "2025-08-01",
      total_income: 1000000,
      crews: [
        {
          crewName: "Budi",
          crewRole: "Videographer",
          crewShare: 200000,
        },
        {
          crewName: "Susi",
          crewRole: "Editor",
          crewShare: 200000,
        },
      ],
    });
    console.log("Berhasil buat project:", res.data);
  } catch (err) {
    console.error("Gagal:", err.response?.data || err.message);
  }
};
