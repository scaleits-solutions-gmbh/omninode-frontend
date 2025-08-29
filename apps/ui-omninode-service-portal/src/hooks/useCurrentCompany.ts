export const useCurrentCompanyId = () => {
  const currentCompanyId = localStorage.getItem("currentCompanyId");
  return currentCompanyId;
};
