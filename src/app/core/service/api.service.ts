import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { environment } from '../../../environments/environment';

@Injectable({
  providedIn: 'root'
})
export class ApiService {

  private base = environment.GATEWAY;

  constructor(private http: HttpClient) {}

  private authHeaders() {
    const token = localStorage.getItem('token') || '';
    return {
      headers: new HttpHeaders({
        Authorization: `Bearer ${token}`
      })
    };
  }

  // ---------------- AUTH --------------------
  login(body: any) {
    return this.http.post(`${this.base}/auth/login`, body);
  }

  session() {
    return this.http.get(`${this.base}/session`, this.authHeaders());
  }

  logout() {
    return this.http.post(`${this.base}/auth/logout`, {}, this.authHeaders());
  }

  // ---------------- DASHBOARD SUMMARY --------------------
//  getSummary() {
//    return this.http.get(`${this.base}/summary`, this.authHeaders());
//  }

  getOperationsBoard() {
    return this.http.get(`${this.base}/operations/board`, this.authHeaders());
  }

  // ---------------- DEVICES --------------------
  getDevices(region?: string) {
    const q = region ? `?region=${region}` : '';
    return this.http.get(`${this.base}/devices${q}`, this.authHeaders());
  }

  getDevice(id: string) {
    return this.http.get(`${this.base}/devices/${id}`, this.authHeaders());
  }

  createDevice(body: any) {
    return this.http.post(`${this.base}/devices`, body, this.authHeaders());
  }

  updateDevice(id: string, body: any) {
    return this.http.put(`${this.base}/devices/${id}`, body, this.authHeaders());
  }

  deleteDevice(id: string) {
    return this.http.delete(`${this.base}/devices/${id}`, this.authHeaders());
  }

  // ---------------- DEVICE READINGS --------------------
  getDeviceReadings(id: string) {
    return this.http.get(`${this.base}/devices/${id}/readings`, this.authHeaders());
  }

  // ---------------- DLMS --------------------
  getDlmsRegisters(id: string) {
    return this.http.get(`${this.base}/devices/${id}/dlms`, this.authHeaders());
  }

  dlmsManualRead(body: any) {
    return this.http.post(`${this.base}/dlms/readings`, body, this.authHeaders());
  }

  // ---------------- DCU --------------------
  getDcus() {
    return this.http.get(`${this.base}/dcus`, this.authHeaders());
  }

  getDcuStats() {
    return this.http.get(`${this.base}/dcus/stats`, this.authHeaders());
  }

  // ---------------- TELEMETRY SUMMARY --------------------
  getTelemetrySummary() {
    return this.http.get(`${this.base}/summary`, this.authHeaders());
  }

  // ---------------- COMMANDS --------------------
  getCommands() {
    return this.http.get(`${this.base}/commands`, this.authHeaders());
  }

  createCommand(body: any) {
    return this.http.post(`${this.base}/commands`, body, this.authHeaders());
  }

  // ---------------- EVENTS --------------------
  getEvents() {
    return this.http.get(`${this.base}/events`, this.authHeaders());
  }

  // ---------------- MAINTENANCE --------------------
  getMaintenance() {
    return this.http.get(`${this.base}/maintenance`, this.authHeaders());
  }

  createMaintenance(body: any) {
    return this.http.post(`${this.base}/maintenance`, body, this.authHeaders());
  }

  updateMaintenance(id: string, body: any) {
    return this.http.put(`${this.base}/maintenance/${id}`, body, this.authHeaders());
  }

  deleteMaintenance(id: string) {
    return this.http.delete(`${this.base}/maintenance/${id}`, this.authHeaders());
  }

  // ---------------- ALERTS --------------------
  getAlerts() {
    return this.http.get(`${this.base}/alerts`, this.authHeaders());
  }
}
