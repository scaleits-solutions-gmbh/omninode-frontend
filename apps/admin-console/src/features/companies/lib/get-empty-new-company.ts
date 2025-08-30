import { NewCompany } from "../types/new-company";

export const getEmptyNewCompany = (): NewCompany => {
  return {
    name: "",
    email: "",
    phone: "",
    taxId: "",
    city: "",
    address: "",
    primaryContactFirstName: "",
    primaryContactLastName: "",
    primaryContactEmail: "",
    primaryContactPhone: "",
  };
};
