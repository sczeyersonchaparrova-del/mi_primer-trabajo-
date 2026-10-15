/*
 * Configuración pública de Mi agenda ágil.
 * Copia los datos desde Supabase > Connect o Project Settings > API Keys.
 * Es seguro publicar una clave sb_publishable_... (o anon legacy) SIEMPRE
 * que las políticas RLS del archivo supabase_setup.sql estén activadas.
 * NUNCA pegues aquí una clave sb_secret_... ni una clave service_role.
 */

window.APP_CONFIG = Object.freeze({
  SUPABASE_URL: "https://ijqcngkfsneezazezlfg.supabase.co",
  SUPABASE_PUBLISHABLE_KEY: "sb_publishable_WLYqc_vT9a7zn07J09SGDA_kA1mISom"
});
