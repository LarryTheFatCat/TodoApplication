import { CalendarDate } from "@nextui-org/react";

export type DisplayPasswordState = {
  mainPassword: boolean;
  confirmPassword: boolean;
};

export type RegisterInputData = {
  fullName: string;
  email: string;
  password: string;
  confirmPassword: string;
  birthday: CalendarDate | null;
  gender?: string;
};

export type LoginInformation = {
  email: string;
  password: string;
};

export type ErrorManagement = {
  fullNameError: boolean;
  emailError: boolean;
  passwordError: boolean;
  confirmPasswordError: boolean;
  birthdayError: boolean;
};
export type ErrorManagementDescription = {
  fullNameErrorDescription: string;
  emailErrorDescription: string;
  passwordErrorDescription: string;
  confirmPasswordErrorDescription: string;
  birthdayErrorDescription: string;
};
export type LoginErrorManagement = {
  email: boolean,
  password: boolean,
}
export type LoginErrorManagementDescription = {
  emailErrorDescription: string,
  passwordErrorDescription: string,
}
export type UserData = {
  fullName?: string,
  email?: string,
  birthday?: CalendarDate | null,
  gender?: string, // optional 
}
export type TaskState = {
  task?: string,
  priority?: string,
}