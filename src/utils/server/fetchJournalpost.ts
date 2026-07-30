import type { JournalpostProps } from "@components/journalpostliste/JournalpostInterfaces";
import { getOboToken } from "@src/utils/server/token";
import type { AstroRuntimeLogger } from "astro";

export const fetchJournalpost = async (
  url: string,
  token: string,
  logger: AstroRuntimeLogger,
): Promise<JournalpostProps> => {
  const audience = `${process.env.NAIS_CLUSTER_NAME}:min-side:mine-saker-api`;
  const oboToken = await getOboToken(token, audience, logger);

  const response = await fetch(url, {
    method: "GET",
    headers: {
      "Content-Type": "application/json",
      Accept: "application/json",
      Authorization: `Bearer ${oboToken}`,
    },
  });

  if (!response.ok) {
    throw new Error(
      "http error with status " + response.status + "when fetching soknad",
    );
  }

  return await response.json();
};
