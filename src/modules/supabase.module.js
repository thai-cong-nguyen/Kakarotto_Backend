import { createClient } from "@supabase/supabase-js";
import "dotenv/config";

const supabase = createClient(
  process.env.SUPABASE_PROJECT_URL,
  process.env.SUPABASE_API_KEY
);

export async function uploadFileToBucket(fileName, bucket, file) {
  return supabase
    ? await supabase.storage.from(bucket).upload(fileName, file, {
        contentType: "application/json",
      })
    : { data: null, error: new Error("Supabase is not inititalized") };
}

export async function retrieveTokenURIFromBucket(fileName, bucket) {
  return supabase.storage.from(bucket).getPublicUrl(fileName);
}

export async function deleteFileFromBucket(fileName, bucket) {
  return await supabase.storage.from(bucket).remove(fileName);
}

export async function replaceExistingFileInBucket(path, bucket, file) {
  return await supabase.storage.from(bucket).update(path, file, {
    contentType: "application/json",
    upsert: true,
  });
}
