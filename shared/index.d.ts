export type Message = {
  title: string;
  body: string;
};

export type Course = {
  name: string;
  phoneNumber: string;
  section: string;
  birthDate?: Date | null;
  topic: string;
  email: string;
  isPresident: boolean;
};

export type Error = {
  error?: string | undefined;
};
