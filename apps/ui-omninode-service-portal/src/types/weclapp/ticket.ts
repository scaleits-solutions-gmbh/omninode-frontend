export type FeTicket = {
    id: string;
    number: string;
    customer: string;
    status: string;
    date: string;
    finishedDate: string;
    priority: string; //só mandar se quem estiver acedendo for a empresa dona da instancia
    authorFirstName: string;
    authorLastName: string;
    subject: string;
    description: string;
}