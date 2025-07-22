export interface VolunteerBase {
    profilePhoto: string | File | null, 
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
  
  export interface VolunteerCreateRequest extends Omit<VolunteerBase, 'profilePhoto'> {
    profilePhoto: File | null;
  }
  
  export interface VolunteerUpdateRequest extends Omit<VolunteerBase, 'profilePhoto'> {
    profilePhoto: string | File | null, 
  }
  
  export interface VolunteerResponse {
    status: boolean;
    message: string;
    data: VolunteerBase & { _id: string; createdAt?: string; updatedAt?: string };
  }
  
  export interface VolunteerListResponse {
    status: boolean;
    message: string;
    items: {
      data: (VolunteerBase & { _id: string })[];
      total: number;
      page: number;
      limit: number;
    };
  }
  