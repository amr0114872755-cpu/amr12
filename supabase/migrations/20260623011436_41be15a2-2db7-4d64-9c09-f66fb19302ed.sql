DO $$ BEGIN
  CREATE POLICY "Backend can manage push subscriptions"
    ON public.push_subscriptions FOR ALL TO service_role USING (true) WITH CHECK (true);
EXCEPTION WHEN duplicate_object THEN NULL; END $$;

DO $$ BEGIN
  CREATE POLICY "Backend can manage push updates"
    ON public.push_updates FOR ALL TO service_role USING (true) WITH CHECK (true);
EXCEPTION WHEN duplicate_object THEN NULL; END $$;