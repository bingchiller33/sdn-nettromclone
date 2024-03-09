import swaggerJSDoc from "swagger-jsdoc";
import swaggerUi from "swagger-ui-express";
const swaggerOptions = {
  swaggerDefinition: {
    openapi: "3.0.0",
    info: {
      title: "NETTROM API",
      version: "1.0.0",
      description: "This is the comprehensive API documentation for the NETTROM service. Here you will find detailed information about all the endpoints, including request parameters, request bodies, and response formats.",
      contact: {
        name: "NETTROM",
        url: "http://localhost:3000/nettruyen.net",
        email: "phuchthe176452@fpt.edu.vn",
      },
      license: {
        name: "MIT License",
        url: "https://opensource.org/license/MIT",
      },
    },
    components: {
      securitySchemes: {
        BearerAuth: {
          type: "http",
          scheme: "bearer",
          bearerFormat: "JWT",
          description:
            'For authorized routes, please enter the JWT Bearer token in the field below. Make sure to include the word "Bearer" before your token.',
        },
      },
    },
    servers: [{ url: "http://localhost:9999" }],
  },
  apis: ["./routes/userRouter/userRouter.js"],
};

const swaggerDocs = swaggerJSDoc(swaggerOptions);
export { swaggerUi, swaggerDocs };
