import { Hono } from "hono";
import { HTTPException } from "hono/http-exception";
import { compress } from "hono/compress";
import { serve } from "@hono/node-server";
import { cors } from "hono/cors";
import status from "./data/status.json" assert { type: "json" };
import journalposterAlle from "./data/journalposterAlle.json" assert { type: "json" };
import journalpost from "./data/journalpost.json" assert { type: "json" };
import fullmaktsinfo from "./data/fullmaktsinfo.json" assert { type: "json" };
import fullmaktsforhold from "./data/fullmaktsforhold.json" assert { type: "json" };
import representert from "./data/representert.json" assert { type: "json" };
import digisosHarInnsendte from "./data/digisosHarInnsendte.json" assert { type: "json" };


const api = new Hono();

api.use("/*", cors({
  origin: "http://localhost:4321",
  credentials: true,
}));

api.use(compress())

api.get('/login/status', (c) => {
  return c.json(status);
});

api.post('/collect', (c) => {
  return c.text("Done")
});

api.get('/mine-saker-api/v2/journalposter/alle', (c) => {
  return c.json(journalposterAlle);
});

api.get('/mine-saker-api/v2/journalposter/journalpost/*', (c) => {
  return c.json(journalpost);
});

api.get('/mine-saker-api/fullmakt/info', (c) => {
  return c.json(fullmaktsinfo);
});

api.get('/mine-saker-api/fullmakt/forhold', (c) => {
  return c.json(fullmaktsforhold);
});

api.get('/mine-saker-api/v2/sosialhjelp/har_innsendte', (c) => {
  return c.json(digisosHarInnsendte);
});

api.post('/mine-saker-api/fullmakt/representert', (c) => {
  return c.json(representert);
});

serve(api);
