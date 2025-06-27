export interface CreateScreeningTestDto {
  patientId: number;
  date: string;
  formState: Record<string, Record<string, boolean>>;
  conclusions: string;
}
