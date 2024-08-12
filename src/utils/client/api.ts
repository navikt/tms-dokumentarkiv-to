import {  postUserUrl } from "@src/urls.client.ts";
import { redirectToIdPorten, redirectToLandingsside } from "./redirect.ts";

interface Props {
  path: string;
  options?: object;
  handleNotFound?: boolean;
  eventObj?: object;
}

interface eventObjectProps {
  ident: string;
}

export const include = {
  credentials: "include",
};

export const fetcher = async (url:string) => {
  const response = await fetch(url, {
    method: "GET",
    credentials: "include",
  });

  if (!response.ok) {
    throw new Error("Post request failed");
  }
  return await response.json();
};

export const postUser = async (ident: eventObjectProps) => {
  const response = await fetch(postUserUrl, {
    method: "POST",
    credentials: "include",
    headers: {
      Accept: "application/json",
      "Content-Type": "application/json",
    },
    body: JSON.stringify(ident),
  });

  if (!response.ok) {
    throw new Error("Post request failed");
  }
};
