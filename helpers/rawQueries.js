export const categoriesTopicQuery = (languageId) => {
  return `
select c.id, c."name", c.slug
from topics t 
inner join categories c 
on t."categoryId" = c.id 
where t."languageId"=${languageId} 
group by c.id, c."name", c.slug
`;
};
