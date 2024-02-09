import { CollectionConfig } from "payload/types";

export const Users: CollectionConfig = {
    slug: "users",
    auth: {
        verify: {
            generateEmailHTML: ({ token }) => {
                return `<p> hello please verify </p>`
            },
        },
    },
    access: {
        // temp
        read: () => true,
        create: () => true,
    },
    fields: [
        {
            name: "role",
            defaultValue: "user",
            required: true,
            // admin: {
            //     condition: () => false,
            // },
            type: "select",
            options: [
                {
                    label: "Admin",
                    value: "admin"
                },
                {
                    label: "User",
                    value: "user"
                }
            ]
        },
    ]
}