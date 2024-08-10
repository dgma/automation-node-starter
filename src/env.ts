import * as dotenvx from "@dotenvx/dotenvx";

if (!process.env.NODE_ENV) {
  // load env in case of running outside docker
  dotenvx.config({ path: "conf/.env" });
}

if (process.env.NODE_ENV === "production") {
  // decrypted .production.secrets.env file
  // more info https://github.com/dotenvx/dotenvx
  dotenvx.config({ path: "/run/secrets/keys" });
  dotenvx.decrypt("conf/.production.secrets.env");
  dotenvx.config({ path: "conf/.production.secrets.env" });
}

if (process.env.NODE_ENV !== "production") {
  dotenvx.config({ path: "conf/.local.secrets.env" });
}
