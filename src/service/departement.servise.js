import axios from "@/lib/axios.js";

export async function getDepartments(params = {}) {
  try {
    const { data } = await axios.get("/v1/day-quota/get", { params });

    return data;
  } catch (error) {
    console.error("API error:", error);
    throw error;
  }
}

export async function getDepartmentId(id) {
  try {
    const { data } = await axios.get(`/v1/departments/get/${id}`);

    return data;
  } catch (error) {
    return error;
  }
}

export async function deleteDepartment(department_id) {
  try {
    return await axios.delete(
      `/v1/departments/update/{department_id}${department_id}`
    );
  } catch (error) {
    return error;
  }
}

export async function addDepartment(newData) {
  try {
    return await axios.post("/v1/departments/add", newData);
  } catch (error) {
    return error;
  }
}

export async function updateDepartment(id, newData) {
  try {
    return await axios.put(`/v1/departments/update/${id}`, newData);
  } catch (error) {
    return error;
  }
}
