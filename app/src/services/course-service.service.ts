import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class CourseServiceService {
  private apiUrl = 'http://localhost:3001';

  constructor(private http: HttpClient) { }

  createCourse(courseData: FormData): Observable<any> {
    return this.http.post(`${this.apiUrl}/createcourse`, courseData);
  }

  getCourses(): Observable<any> {
    return this.http.get(`${this.apiUrl}/courses`);
  }

  getCourse(id: string): Observable<any> {
    return this.http.get(`${this.apiUrl}/course/${id}`);
  }

  updateCourse(id: string, courseData: FormData): Observable<any> {
    return this.http.put(`${this.apiUrl}/updatecourse/${id}`, courseData);
  }

  deleteCourse(id: string): Observable<any> {
    return this.http.delete(`${this.apiUrl}/deletecourse/${id}`);
  }

  getCoursesByFormationId(formationId: string): Observable<any[]> {
    return this.http.get<any[]>(`${this.apiUrl}/formation/${formationId}/courses`);
  }
  
}
