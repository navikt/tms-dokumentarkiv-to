import { dokumentArkivUrl, mineSakerApiUrl } from "@src/urls.client";

export const redirectToIdPorten = (redirectUrl: string) => {
  window.location.assign(`${mineSakerApiUrl}/login?level=Level4&redirect_uri=${redirectUrl}${window.location.search}`);
};

export const redirectToLandingsside = () => {
  window.location.assign(dokumentArkivUrl);
};
