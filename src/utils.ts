export const calculateAge = (birthDate: string) => {
  const diffMs = Date.now() - new Date(birthDate).getTime();
  const ageDate = new Date(diffMs);
  const a = Math.abs(ageDate.getUTCFullYear() - 1970);
  return a;
};
