export const categoriesTopicQuery = (languageId) => {
  return `
    select 
      c.id, c."name", c.slug
    from 
      topics t 
    inner join 
      categories c 
    on 
      t."categoryId" = c.id 
    where 
      t."languageId"=${languageId} 
    group by 
      c.id, c."name", c.slug
`;
};

export const topicViewsQuery = (languageId, limit = 4) => {
  return `
    SELECT 
      t.id, t.title, t.description, t.slug, t."coverImage", t."content", t."createdAt", cast(t_v.topic_views as int)
    FROM topics t
    LEFT JOIN (
      SELECT "topicId", COUNT(tv2."topicId") AS topic_views 
      FROM topic_views tv2 GROUP BY tv2."topicId"
    ) AS t_v ON t.id = t_v."topicId"
    WHERE t."languageId"=${languageId} AND t."isPublished"=true
    ORDER BY t_v.topic_views DESC
    LIMIT ${limit};
  `;
};
