import helmet from 'helmet';
//Here you can spoof any back end
const SPOOFED_SERVER = 'Phusion Passenger (mod_rails/mod_rack) 3.0.11';

export const security = (app) => {
  app
    .use(helmet())
    .use(helmet.noSniff())
    .use(helmet.frameguard({ action: 'deny' }))
    .use(helmet.xssFilter())
    .use(helmet.hidePoweredBy({ setTo: SPOOFED_SERVER }))
    .use(helmet.dnsPrefetchControl({ allow: false }));
};
