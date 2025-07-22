export interface AlumniBase {
  exStudent: 'ex-student' | 'ex-employee';
  orphanStatus: 'orphan' | 'not-orphan';
  schoolName: string;
  degreeCertificate: string;
  passingYear: string;
  name: string;
  fatherName: string;
  cell_no: string;
  whatsappNo: string;
  email: string;
  Country: string;
  City: string;
  Province: string;
  dateOfBirth: string;
  maritalStatus: string;
  gender: string;
  permanentAddress: string;
  mailingAddress: string;
  institute?: string;
  faculty?: string;
  degree?: string;
  designation?: string;
  organization?: string;
  location?: string;
  hobbies?: {
    contentWriting?: boolean;
    socialMedia?: boolean;
    fundRaising?: boolean;
    voiceOver?: boolean;
    teacherTraining?: boolean;
    otherHobby?: string;
  };
}

export interface AlumniCreateRequest extends AlumniBase {}

export interface AlumniUpdateRequest extends Partial<AlumniBase> {}

export interface AlumniResponse {
  status: boolean;
  message: string;
  data: AlumniBase & { _id: string; createdAt?: string; updatedAt?: string };
}

export interface AlumniListResponse {
  status: boolean;
  message: string;
  items: {
    data: (AlumniBase & { _id: string })[];
    total: number;
    page: number;
    limit: number;
  };
}
