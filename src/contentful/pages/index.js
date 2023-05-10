import { client } from "..";

const CONTENT_TYPE = "page";

export const getIndexPageData = async () => {
    const pageData = await client.getEntries({
        content_type: CONTENT_TYPE,
    });

    return pageData.items;
};
