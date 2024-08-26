import { Hono } from "hono";
import { compress } from "hono/compress";
import { serve } from "@hono/node-server";
import { cors } from "hono/cors";
import status from "./data/status.json" assert { type: "json" };
import journalposter from "./data/journalposter.json" assert { type: "json" };
import fullmaktsinfo from "./data/fullmaktsinfo.json" assert { type: "json" };
import fullmaktsforhold from "./data/fullmaktsforhold.json" assert { type: "json" };
import sakstemaer from "./data/sakstemaer.json" assert { type: "json" };


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

api.get('/mine-saker-api/sakstemaer', (c) => {
  return c.json(sakstemaer);
});

api.get('/mine-saker-api/journalposter', (c) => {
  return c.json(journalposter);
});

api.get('/mine-saker-api/fullmakt/info', (c) => {
  return c.json(fullmaktsinfo);
});

api.get('/mine-saker-api/fullmakt/forhold', (c) => {
  return c.json(fullmaktsforhold);
});

serve(api);
