import { getPayload } from "payload";
import config from "@payload-config";
import { SiteSettings, SocialLinks } from "@/types";

export async function getSettings(): Promise<SiteSettings | null> {
  try {
    const payload = await getPayload({ config });
    const settings = await payload.findGlobal({ slug: "settings" });
    return (settings as unknown as SiteSettings) || null;
  } catch (error) {
    console.error("Error fetching settings from Payload:", error);
    return null;
  }
}

export async function getSocialLinks(): Promise<SocialLinks | null> {
  const settings = await getSettings();
  return settings?.socialLinks || null;
}
