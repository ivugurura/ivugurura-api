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
    .use(helmet.dnsPrefetchControl({ allow: false }))
    .use(helmet.crossOriginResourcePolicy({ policy: "cross-origin" }));
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
      return callback(null, true);
    } else {
      // Reject requests from other origins
      return callback(new Error("Not allowed by CORS"));
    }
  },
  methods: ["GET", "POST", "PUT", "PATCH", "DELETE"],
  allowedHeaders: ["Content-Type", "Authorization"],
  credentials: true,
};
