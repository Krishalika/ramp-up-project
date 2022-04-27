export type StudentCreateDTO = {
  id: number;
  name: string;
  gender: string;
  address: string;
  mobile: number;
  dob: string;
  age: number;
};

export type UpdateStudentInput = {
  id: number;
  name: string;
  gender: string;
  address: string;
  mobile: number;
  dob: string;
  age: number;
};

export type StudentType = {
  id: string;
  name: string;
  gender: string;
  address: string;
  mobile: number;
  dob: string;
  age: number;
};

// export type OwnerInputType = {
//     name: string;
//     address: string;
// }
