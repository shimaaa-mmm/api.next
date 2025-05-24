const baseUri = process.env.BASE_URI;
export async function getArticeById(articleID) {
    try {
        const response = await fetch(`${baseUri}/Articles/${articleID}`);
        const result = await response.json();
        return result;

    } catch (error) {

    }
}

export async function getArticleByTypeId(typeId) {
    try {
        const response = await fetch(`${baseUri}/Articles?TypeId=${typeId}&IsActive=${true}`);
        const result = await response.json();
        return result;
    } catch (error) {
        console.log(error);

    }
}
export async function getArticlesWithPagination(pageNumber = 1, pageSize = 10) {
    try {
        const response = await fetch(`${baseUri}/Articles?PageNumber=${pageNumber}&PageSize=${pageSize}`);
        const result = await response.json();
        return result;
    } catch (error) {
        console.error('Error fetching articles with pagination:', error);
        throw error;
    }
}