SET check_function_bodies = false;
-- Drop the function if it already exists to avoid the duplicate error
DROP FUNCTION IF EXISTS public.set_current_timestamp_updated_at();
CREATE FUNCTION public.set_current_timestamp_updated_at() RETURNS trigger
    LANGUAGE plpgsql
    AS $$
BEGIN
    NEW.updated_at = NOW();
    RETURN NEW;
END;
$$;
CREATE TABLE public.artist_categories (
    artist_id uuid NOT NULL,
    category_id uuid NOT NULL,
    created_at timestamp with time zone DEFAULT now() NOT NULL,
    updated_at timestamp with time zone DEFAULT now() NOT NULL
);
CREATE TABLE public.artist_events (
    id uuid DEFAULT gen_random_uuid() NOT NULL,
    artist_id uuid,
    country_code text NOT NULL,
    event_count integer DEFAULT 0,
    created_at timestamp with time zone DEFAULT now() NOT NULL,
    updated_at timestamp with time zone DEFAULT now() NOT NULL
);
CREATE TABLE public.artists (
    id uuid DEFAULT gen_random_uuid() NOT NULL,
    name text NOT NULL,
    favorite_count integer DEFAULT 0,
    created_at timestamp with time zone DEFAULT now() NOT NULL,
    updated_at timestamp with time zone DEFAULT now() NOT NULL
);
CREATE TABLE public.categories (
    id uuid DEFAULT gen_random_uuid() NOT NULL,
    name text NOT NULL,
    user_id uuid,
    created_at timestamp with time zone DEFAULT now() NOT NULL,
    updated_at timestamp with time zone DEFAULT now() NOT NULL
);
CREATE TABLE public.event_artists (
    event_id uuid NOT NULL,
    artist_id uuid NOT NULL,
    is_headliner boolean DEFAULT false,
    created_at timestamp with time zone DEFAULT now() NOT NULL
);
CREATE TABLE public.event_lineup (
    id uuid DEFAULT gen_random_uuid() NOT NULL,
    event_id uuid,
    artist_name text NOT NULL,
    created_at timestamp with time zone DEFAULT now() NOT NULL
);
CREATE TABLE public.events (
    id uuid DEFAULT gen_random_uuid() NOT NULL,
    name text NOT NULL,
    type text NOT NULL,
    category text NOT NULL,
    description text,
    start_date timestamp with time zone NOT NULL,
    end_date timestamp with time zone,
    venue_id uuid,
    url text,
    about text,
    image_url text,
    is_favorite boolean DEFAULT false,
    created_at timestamp with time zone DEFAULT now() NOT NULL,
    updated_at timestamp with time zone DEFAULT now() NOT NULL,
    tm_id text,
    CONSTRAINT events_category_check CHECK ((category = ANY (ARRAY['Festival'::text, 'Concert'::text, 'Tour'::text]))),
    CONSTRAINT events_type_check CHECK ((type = ANY (ARRAY['Concert'::text, 'Festival'::text, 'Tour'::text])))
);
CREATE TABLE public.user_favorite_events (
    user_id uuid NOT NULL,
    event_id uuid NOT NULL,
    created_at timestamp with time zone DEFAULT now() NOT NULL
);
CREATE TABLE public.users (
    id uuid DEFAULT gen_random_uuid() NOT NULL,
    username text NOT NULL,
    email text NOT NULL,
    password text NOT NULL,
    role text DEFAULT 'user'::text,
    active boolean DEFAULT true,
    created_at timestamp with time zone DEFAULT now() NOT NULL,
    updated_at timestamp with time zone DEFAULT now() NOT NULL
);
CREATE TABLE public.venues (
    id uuid DEFAULT gen_random_uuid() NOT NULL,
    name text NOT NULL,
    city text NOT NULL,
    country text NOT NULL,
    country_code text NOT NULL,
    latitude numeric(9,6),
    longitude numeric(9,6),
    created_at timestamp with time zone DEFAULT now() NOT NULL,
    updated_at timestamp with time zone DEFAULT now() NOT NULL,
    tm_id text
);
ALTER TABLE ONLY public.artist_categories
    ADD CONSTRAINT artist_categories_pkey PRIMARY KEY (artist_id, category_id);
ALTER TABLE ONLY public.artist_events
    ADD CONSTRAINT artist_events_pkey PRIMARY KEY (id);
ALTER TABLE ONLY public.artists
    ADD CONSTRAINT artists_pkey PRIMARY KEY (id);
ALTER TABLE ONLY public.categories
    ADD CONSTRAINT categories_name_key UNIQUE (name);
ALTER TABLE ONLY public.categories
    ADD CONSTRAINT categories_pkey PRIMARY KEY (id);
ALTER TABLE ONLY public.event_artists
    ADD CONSTRAINT event_artists_pkey PRIMARY KEY (event_id, artist_id);
ALTER TABLE ONLY public.event_lineup
    ADD CONSTRAINT event_lineup_pkey PRIMARY KEY (id);
ALTER TABLE ONLY public.events
    ADD CONSTRAINT events_pkey PRIMARY KEY (id);
ALTER TABLE ONLY public.events
    ADD CONSTRAINT events_tm_id_key UNIQUE (tm_id);
ALTER TABLE ONLY public.user_favorite_events
    ADD CONSTRAINT user_favorite_events_pkey PRIMARY KEY (user_id, event_id);
ALTER TABLE ONLY public.users
    ADD CONSTRAINT users_email_key UNIQUE (email);
ALTER TABLE ONLY public.users
    ADD CONSTRAINT users_pkey PRIMARY KEY (id);
ALTER TABLE ONLY public.users
    ADD CONSTRAINT users_username_key UNIQUE (username);
ALTER TABLE ONLY public.venues
    ADD CONSTRAINT venues_pkey PRIMARY KEY (id);
ALTER TABLE ONLY public.venues
    ADD CONSTRAINT venues_tm_id_key UNIQUE (tm_id);
CREATE INDEX idx_artist_categories_artist_id ON public.artist_categories USING btree (artist_id);
CREATE INDEX idx_artist_categories_category_id ON public.artist_categories USING btree (category_id);
CREATE INDEX idx_artist_events_country_code ON public.artist_events USING btree (country_code);
CREATE INDEX idx_event_artists_artist_id ON public.event_artists USING btree (artist_id);
CREATE INDEX idx_event_artists_event_id ON public.event_artists USING btree (event_id);
CREATE INDEX idx_events_category ON public.events USING btree (category);
CREATE INDEX idx_events_start_date ON public.events USING btree (start_date);
CREATE INDEX idx_events_type ON public.events USING btree (type);
CREATE INDEX idx_venues_country_code ON public.venues USING btree (country_code);
CREATE INDEX idx_venues_tm_id ON public.venues USING btree (tm_id);
CREATE TRIGGER set_artist_categories_updated_at BEFORE UPDATE ON public.artist_categories FOR EACH ROW EXECUTE FUNCTION public.set_current_timestamp_updated_at();
CREATE TRIGGER set_artist_events_updated_at BEFORE UPDATE ON public.artist_events FOR EACH ROW EXECUTE FUNCTION public.set_current_timestamp_updated_at();
CREATE TRIGGER set_artists_updated_at BEFORE UPDATE ON public.artists FOR EACH ROW EXECUTE FUNCTION public.set_current_timestamp_updated_at();
CREATE TRIGGER set_categories_updated_at BEFORE UPDATE ON public.categories FOR EACH ROW EXECUTE FUNCTION public.set_current_timestamp_updated_at();
CREATE TRIGGER set_events_updated_at BEFORE UPDATE ON public.events FOR EACH ROW EXECUTE FUNCTION public.set_current_timestamp_updated_at();
CREATE TRIGGER set_users_updated_at BEFORE UPDATE ON public.users FOR EACH ROW EXECUTE FUNCTION public.set_current_timestamp_updated_at();
CREATE TRIGGER set_venues_updated_at BEFORE UPDATE ON public.venues FOR EACH ROW EXECUTE FUNCTION public.set_current_timestamp_updated_at();
ALTER TABLE ONLY public.artist_categories
    ADD CONSTRAINT artist_categories_artist_id_fkey FOREIGN KEY (artist_id) REFERENCES public.artists(id) ON DELETE CASCADE;
ALTER TABLE ONLY public.artist_categories
    ADD CONSTRAINT artist_categories_category_id_fkey FOREIGN KEY (category_id) REFERENCES public.categories(id) ON DELETE CASCADE;
ALTER TABLE ONLY public.artist_events
    ADD CONSTRAINT artist_events_artist_id_fkey FOREIGN KEY (artist_id) REFERENCES public.artists(id) ON DELETE CASCADE;
ALTER TABLE ONLY public.categories
    ADD CONSTRAINT categories_user_id_fkey FOREIGN KEY (user_id) REFERENCES public.users(id) ON DELETE CASCADE;
ALTER TABLE ONLY public.event_artists
    ADD CONSTRAINT event_artists_artist_id_fkey FOREIGN KEY (artist_id) REFERENCES public.artists(id) ON DELETE CASCADE;
ALTER TABLE ONLY public.event_artists
    ADD CONSTRAINT event_artists_event_id_fkey FOREIGN KEY (event_id) REFERENCES public.events(id) ON DELETE CASCADE;
ALTER TABLE ONLY public.event_lineup
    ADD CONSTRAINT event_lineup_event_id_fkey FOREIGN KEY (event_id) REFERENCES public.events(id) ON DELETE CASCADE;
ALTER TABLE ONLY public.events
    ADD CONSTRAINT events_venue_id_fkey FOREIGN KEY (venue_id) REFERENCES public.venues(id) ON DELETE SET NULL;
ALTER TABLE ONLY public.user_favorite_events
    ADD CONSTRAINT user_favorite_events_event_id_fkey FOREIGN KEY (event_id) REFERENCES public.events(id) ON DELETE CASCADE;
ALTER TABLE ONLY public.user_favorite_events
    ADD CONSTRAINT user_favorite_events_user_id_fkey FOREIGN KEY (user_id) REFERENCES public.users(id) ON DELETE CASCADE;
