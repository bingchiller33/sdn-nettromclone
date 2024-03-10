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
      schemas: {
        Comment: {
          type: 'object',
          properties: {
            _id: {
              type: 'string',
              description: 'The unique identifier for the comment',
            },
            userId: {
              type: 'string',
              description: 'The ID of the user who made the comment',
            },
            storyId: {
              type: 'string',
              description: 'The ID of the story the comment is associated with',
            },
            comment: {
              type: 'string',
              description: 'The content of the comment',
            },
            isActive: {
              type: 'boolean',
              description: 'The status of the comment',
            },
            createdAt: {
              type: 'string',
              format: 'date-time',
              description: 'The date and time when the comment was created',
            },
            updatedAt: {
              type: 'string',
              format: 'date-time',
              description: 'The date and time when the comment was last updated',
            },
          },
        },
      },
    },
    servers: [{ url: "http://localhost:9999" }],
  },
  apis: [
    "./routes/feedbackRouter/feedbackRouter.js",
    "./routes/storyRouter/storyRouter.js",
    "./routes/userRouter/userRouter.js",
    "./routes/categoriesRouter/categoriesRouter.js",
    "./routes/storyCategoriesRouter/storyCategories.js",
    "./routes/commentRouter/commentRouter.js",
  ],
};

const swaggerDocs = swaggerJSDoc(swaggerOptions);
export { swaggerUi, swaggerDocs };
