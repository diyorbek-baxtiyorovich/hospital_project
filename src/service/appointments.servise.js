import axios from "@/lib/axios.js";

export async function getAppointments(filters) {
  try {
    const { data } = await axios.get("/v1/appointments/get-list", {
      params: {
        department_id: filters.department_id,
        for_date: filters.for_date,
        status: filters.status
      }
    });

    return data;
  } catch (error) {
    console.error("Appointment fetching error:", error);
    throw error;
  }
}

export async function getAppointmentsId(appointment_id) {
  try {
    const { data } = await axios.get(`/v1/appointments/get/{appointment_id}`);

    return data;
  } catch (error) {
    return error;
  }
}

export async function addAppointments(newData) {
  try {
    return await axios.post("/v1/appointments/add-appointment", newData);
  } catch (error) {
    return error;
  }
}

export async function updateAppointments(id, status) {
  try {
    return await axios.put(
      `/v1/appointments/set-status/${id}?status=${status}`
    );
  } catch (error) {
    console.error("Statusni yangilashda xatolik:", error);
    throw error;
  }
}
