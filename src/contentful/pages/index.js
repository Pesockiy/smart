import { client } from "..";

export const getIndexPageData = async () => {
    const pageData = await client.getEntries({
        content_type: "page",
    });

    return pageData.items;
};
