import { makeAutoObservable, runInAction } from "mobx";

export interface Course {
  _id: string;
  courseName: string;
  roomNumber: string;
  teacherName: string;
}

class CourseStore {
  courses: Course[] = [];
  loading = false;
  hasFetched = false;

  constructor() {
    makeAutoObservable(this);
  }

  async fetchAllCourses() {
    // 🔥 Prevent repeated API calls
    if (this.hasFetched) return;
    runInAction(() => {
      this.loading = true;
    });

    try {
      const res = await fetch("/api/user/course/get-all");
      const data = await res.json();

      if (res.ok) {
        runInAction(() => {
          this.courses = data.courses;
          this.hasFetched = true;
        });
      } else {
        alert(data.message);
      }
    } catch (error) {
      alert("Error fetching courses");
    } finally {
      runInAction(() => {
        this.loading = false;
      });
    }
  }
}

export const courseStore = new CourseStore();
