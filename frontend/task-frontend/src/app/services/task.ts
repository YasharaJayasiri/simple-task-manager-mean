import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class TaskService {

  private apiUrl = 'http://localhost:5000/tasks';

  constructor(private http: HttpClient) {}

  getTasks() {
    return this.http.get(this.apiUrl);
  }

  addTask(title: string) {
    return this.http.post(this.apiUrl, { title: title });
  }

  updateTask(id: string, title: string) {
    return this.http.put(this.apiUrl + '/' + id, { title: title });
  }

  deleteTask(id: string) {
    return this.http.delete(this.apiUrl + '/' + id);
  }
}

