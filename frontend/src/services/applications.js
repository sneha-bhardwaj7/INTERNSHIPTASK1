import http from "./http";

export async function getApplications(params = {}) {
  const response = await http.get("/applications", { params });
  return response.data;
}

export async function getApplication(id) {
  const response = await http.get(`/applications/${id}`);
  return response.data;
}

export async function createApplication(payload) {
  const response = await http.post("/applications", payload);
  return response.data;
}

export async function updateApplication(id, payload) {
  const response = await http.patch(`/applications/${id}`, payload);
  return response.data;
}

export async function deleteApplication(id) {
  const response = await http.delete(`/applications/${id}`);
  return response.data;
}
