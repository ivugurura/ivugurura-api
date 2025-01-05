import helmet from "helmet";
import { getMimeType } from "../helpers";

// Here you can spoof any back end
const SPOOFED_SERVER = "Phusion Passenger (mod_rails/mod_rack) 3.0.11";

export const security = (app) => {
  app
    .use(helmet({ contentSecurityPolicy: false }))
    .use(helmet.noSniff())
    .use(helmet.frameguard({ action: "deny" }))
    .use(helmet.xssFilter())
    .use(helmet.hidePoweredBy({ setTo: SPOOFED_SERVER }))
    .use(helmet.dnsPrefetchControl({ allow: false }));
};

// Define allowed origins
const allowedOrigins = [
  "http://localhost:3000", // Allow localhost
  "https://reformationvoice.com",
];
export const corseOptions = {
  origin: (origin, callback) => {
    if (!origin || allowedOrigins.indexOf(origin) !== -1) {
      // Allow requests with no origin (like mobile apps or Postman)
      callback(null, true);
    } else {
      // Reject requests from other origins
      callback(new Error("Not allowed by CORS"));
    }
  },
  methods: ["GET", "POST", "PUT", "PATCH", "DELETE"], // List allowed methods
  allowedHeaders: ["Content-Type", "Authorization"], // List allowed headers
  credentials: true, // If you want to allow cookies and credentials
};

export const setHeaders = (res, path) => {
  const type = getMimeType(path); // Get MIME type based on file extension
  console.log({ type, path });

  res.set("Content-Type", type);
};
