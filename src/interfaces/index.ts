export interface PatientProps{
  id: string;
  name: string;
  gender: string;
  weight: string;
  disease: string;
}

export interface AppointmentProps{
  id: string;
  date: string;
  hour: string;
  patient: PatientProps;
}

export interface NoteProps{
  id: string;
  title: string;
  content?: string;
}
