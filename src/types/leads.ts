export type LeadStatus = "New" | "Contacted" | "Quoted" | "Converted" | "Lost";

export interface Lead {
  id: string;
  customerName: string;
  mobileNumber: string;
  companyName: string;
  country: string;
  riceVariety: string;
  riceForm: string;
  quantity: string;
  priceType: "FOB" | "CIF";
  status: LeadStatus;
  createdAt: string;
}
