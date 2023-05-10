import { createClient } from "contentful";

const isServer = () => {
    return !(typeof window !== 'undefined' && window.document);
}

const serverCreateClient = () => {
    if (!isServer) return;

    const client = createClient({
        space: process.env.CONTENTFUL_SPACE_ID,
        accessToken: process.env.CONTENTFUL_ACCESS_TOKEN,
    });

    return client;
};

export const client = serverCreateClient();