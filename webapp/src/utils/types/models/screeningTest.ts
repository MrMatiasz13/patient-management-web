export interface ScreeningTest {
  id: number;
  patientId: number;
  date: string;
  formState: Record<string, boolean>;
  conclusion?: string;
}
