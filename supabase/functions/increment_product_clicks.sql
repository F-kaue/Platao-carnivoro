
create or replace function increment_product_clicks(product_id uuid)
returns void
language plpgsql
security definer
as $$
begin
  update products
  set clicks = coalesce(clicks, 0) + 1
  where id = product_id;
end;
$$;
