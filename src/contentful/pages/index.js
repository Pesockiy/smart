import { client } from "..";

export const CONTENT_TYPE = "page";
export const CONTENT_TYPE_FOOTER = "Socials";


export const getIndexPageData = async (content_type, options = {}) => {
    const pageData = await client.getEntries({
        content_type,
        ...options,
    });

    return pageData.items;
};


// export const getSocialsPageData = async () => {
//     const pageData = await client.getEntries({
//         content_type: CONTENT_TYPE_FOOTER,
//     });

//     return pageData.items;
// };
