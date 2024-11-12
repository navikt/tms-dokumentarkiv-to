import { dokumentArkivUrl, mineSakerApiUrl } from "@src/urls.client";

export const redirectToIdPorten = () => {
  window.location.assign(`${mineSakerApiUrl}/login?level=Level4&redirect_uri=${dokumentArkivUrl}`);
};

export const redirectToLandingsside = () => {
  window.location.assign(dokumentArkivUrl);
};
