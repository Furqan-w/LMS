import { makeAutoObservable, runInAction } from "mobx";

class EnrollmentStore {
  enrollments: any[] = [];
  loading = false;

  constructor() {
    makeAutoObservable(this);
  }

  async fetchRegistered(studentId: string) {
    runInAction(() => {
      this.loading = true;
    });

    try {
      const res = await fetch(
        `/api/user/course/get-registered?studentId=${studentId}`
      );
      const data = await res.json();

      if (res.ok) {
        runInAction(() => {
          this.enrollments = data.enrollments;
        });
      }
    } finally {
      runInAction(() => {
        this.loading = false;
      });
    }
  }

  addEnrollment(enrollment: any) {
    runInAction(() => {
      this.enrollments.push(enrollment);
    });
  }
}

export const enrollmentStore = new EnrollmentStore();
