import { requestOboToken } from "@navikt/oasis";
import { isLocal } from "@src/utils/server/environment.ts";
import { generateKeyPair, SignJWT } from "jose";

export const getOboToken = async (
  token: string,
  audience: string
): Promise<string> => {
  const oboResult = await requestOboToken(token, audience);

  if (isLocal) {
    return "Fake token";
  }

  if (!oboResult.ok) {
    console.error("Error getting access token: " + oboResult.error);
    throw new Error("Request oboToken for mine-saker-api failed ");
  }

  return oboResult.token;
};

const alg = "RS256";

const cachedKeyPair = generateKeyPair(alg);
const privateKey = async () => (await cachedKeyPair).privateKey;

// TODO: document this
export const localToken = async ({
  audience = "default_audience",
  issuer = "default_issuer",
  algorithm = alg,
  exp = Math.round(Date.now() / 1000) + 1000,
  ...payload
}: {
  audience?: string;
  issuer?: string;
  algorithm?: string;
  exp?: number | string;
} & Record<string, unknown> = {}) =>
  new SignJWT(payload)
    .setExpirationTime(exp)
    .setProtectedHeader({ alg: algorithm })
    .setAudience([audience, "https://nav.no"])
    .setIssuer(issuer)
    .setJti(`${Math.random()}`)
    .sign(await privateKey());
