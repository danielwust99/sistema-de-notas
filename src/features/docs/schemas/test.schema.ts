export const testSchema = {
    requestBody: {
        content: {
            "application/x-www-form-urlencoded": {
                schema: {
                    type: "object",
                    properties: {
                        name: {
                            description: "Updated name of the pet",
                            type: "string",
                        },
                        status: {
                            description: "Updated status of the pet",
                            type: "string",
                        },
                    },
                    required: ["status"],
                },
            },
        },
    },
};
