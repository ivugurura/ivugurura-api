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

export const topicViewsQuery = (languageId) => {
  return `
  select 
      t.id, t.title, t.description, t.slug, t."coverImage", t."content", t."createdAt", cast(t_v.topic_views as int)
    from topics t
    inner join (
      select "topicId", count(tv2."topicId") as topic_views 
      from topic_views tv2 group by tv2."topicId"
    ) as t_v on t.id = t_v."topicId"
    where t."languageId"=${languageId} AND t."isPublished"=true
    order by t_v.topic_views desc
    limit 4;
  `;
};
