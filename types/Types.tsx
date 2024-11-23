import { CalendarDate } from "@nextui-org/react";

export type DisplayPasswordState = {
  mainPassword: boolean;
  confirmPassword: boolean;
};

export type RegisterInputData = {
  fullName: string;
  email: string;
  password: string,
  confirmPassword: string,
  birthday: CalendarDate | null,
  gender?: string,
};
export type ErrorManagement = {
  fullNameError: boolean,
  emailError: boolean,
  passwordError: boolean,
  confirmPasswordError: boolean,
  birthdayError: boolean,
}