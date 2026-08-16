alter table newsletter_subscribers drop constraint if exists newsletter_subscribers_interests_check;

alter table newsletter_subscribers add constraint newsletter_subscribers_interests_check check (
  interests <@ array['gestion-publica', 'electoral', 'datos-ia']::text[]
  and cardinality(interests) between 1 and 3
  and cardinality(array_positions(interests, 'gestion-publica')) <= 1
  and cardinality(array_positions(interests, 'electoral')) <= 1
  and cardinality(array_positions(interests, 'datos-ia')) <= 1
);
