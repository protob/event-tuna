DO $$ 
DECLARE
    r RECORD;
BEGIN
    -- Drop all tables in the 'public' schema
    FOR r IN (SELECT tablename FROM pg_tables WHERE schemaname = 'public') 
    LOOP
        EXECUTE 'DROP TABLE IF EXISTS public.' || quote_ident(r.tablename) || ' CASCADE';
    END LOOP;

    -- Drop all triggers in the 'public' schema
    FOR r IN (
        SELECT tgname, relname 
        FROM pg_trigger 
        JOIN pg_class ON pg_trigger.tgrelid = pg_class.oid 
        WHERE relnamespace = 'public'::regnamespace
    ) 
    LOOP
        EXECUTE 'DROP TRIGGER IF EXISTS ' || quote_ident(r.tgname) || ' ON public.' || quote_ident(r.relname);
    END LOOP;

    -- Drop user-defined functions, excluding system and extension-provided functions
    FOR r IN (
        SELECT p.proname AS routine_name,
               pg_get_function_identity_arguments(p.oid) AS args
        FROM pg_proc p
        JOIN pg_namespace n ON p.pronamespace = n.oid
        LEFT JOIN pg_depend d ON d.objid = p.oid AND d.deptype = 'e'
        LEFT JOIN pg_extension ext ON ext.oid = d.refobjid
        WHERE n.nspname = 'public'
        AND p.proname NOT IN ('set_current_timestamp_updated_at', 'set_is_author')
        AND p.proname NOT LIKE 'pg_%'
        AND ext.extname IS NULL  -- Exclude all extension-owned functions
    ) 
    LOOP
        EXECUTE 'DROP FUNCTION IF EXISTS public.' || quote_ident(r.routine_name) || '(' || r.args || ') CASCADE';
    END LOOP;

END $$;