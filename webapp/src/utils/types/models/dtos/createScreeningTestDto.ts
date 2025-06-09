export interface CreateScreeningTestDto {
  patientId: number;
  date: string;
  formState: Record<string, boolean>;
  conclusion?: string;
}
