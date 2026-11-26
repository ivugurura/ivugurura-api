import helmet from "helmet";

// Here you can spoof any back end
const SPOOFED_SERVER = "Phusion Passenger (mod_rails/mod_rack) 3.0.11";

export const security = app => {
  app
    .use(helmet({ contentSecurityPolicy: false, xFrameOptions: "sameorigin" }))
    .use(helmet.noSniff())
    .use(helmet.frameguard({ action: "deny" }))
    .use(helmet.xssFilter())
    .use(helmet.hidePoweredBy({ setTo: SPOOFED_SERVER }))
    .use(helmet.dnsPrefetchControl({ allow: false }))
    .use(helmet.crossOriginResourcePolicy({ policy: "cross-origin" }));
};

// Define allowed origins
/**
 * TODO: Allow dev to dev server and production likewise
 */
// reformationvoice.org and any of its subdomains (www, dev, ...), HTTPS only
const SITE_ORIGIN = /^https:\/\/([a-z0-9-]+\.)*reformationvoice\.org$/;
const allowLocalhost = ["develop", "staging"].includes(process.env.NODE_ENV);

export const isAllowedOrigin = origin =>
  SITE_ORIGIN.test(origin) ||
  (allowLocalhost && origin === "http://localhost:3000");

export const corseOptions = {
  origin: (origin, callback) => {
    if (!origin || isAllowedOrigin(origin)) {
      // Allow requests with no origin (like mobile apps or Postman)
      return callback(null, true);
    } else {
      // Reject requests from other origins
      return callback(new Error("Not allowed by CORS"));
    }
  },
  methods: ["GET", "POST", "PUT", "PATCH", "DELETE"],
  allowedHeaders: [
    "Content-Type",
    "Authorization",
    "X-Timestamp",
    "X-Signature",
  ],
  credentials: true,
};
