import { Url } from "next/dist/shared/lib/router/router";

export type appoinment = {
  _id: string;
  id: string;
  name: string;
  slug: string;
  images: images;
  description:string | null
};

type images = {
  logo: null | string;
  banner: string;
};


export type appointmentLocation = {
  id:number, 
  name:string,
  opening_time:string,
  closing_time:string,
  working_hours:string,
  address:clinicAddress, 
  distance_text:string,
  distance:number
}

type clinicAddress = {
  id:number,
  name:string, 
  flat_number:string, 
  building:string,
  street_address:string,
  area:string,
  city:string ,
  state:string,
  country:"UAE" | "SA",
  latitude:string,
  longitude:string
}