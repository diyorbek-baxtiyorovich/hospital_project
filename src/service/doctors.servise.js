import axios from "@/lib/axios.js";

export async function getDoctors(params = {}) {
  try {
    const { data } = await axios.get("/v1/doctors/get-all", { params });

    return data;
  } catch (error) {
    console.error("API error:", error);
    throw error;
  }
}

export async function getDoctorsId(id) {
  try {
    const { data } = await axios.get(`/v1/doctors/get/${id}`);

    return data;
  } catch (error) {
    return error;
  }
}

export async function deleteDoctors(doctor_id) {
  try {
    return await axios.delete(`/v1/doctors/delete/${doctor_id}`);
  } catch (error) {
    return error;
  }
}

export async function addDoctors(newData) {
  try {
    return await axios.post("/v1/doctors/add", newData);
  } catch (error) {
    return error;
  }
}

export async function updateDoctors(id, newData) {
  try {
    return await axios.put(`/v1/doctors/update/${id}`, newData);
  } catch (error) {
    return error;
  }
}
