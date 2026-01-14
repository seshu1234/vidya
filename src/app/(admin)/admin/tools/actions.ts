import { createAdminClient } from "@/lib/supabase/server";
import { revalidatePath } from "next/cache";
import { getDBCategories, getDBCourses } from "@/lib/course-service";

export async function fetchCategories() {
  return await getDBCategories();
}

export async function fetchCourses(includeHidden = false) {
  return await getDBCourses(includeHidden);
}

export async function getTools(search?: string) {
  const supabase = await createAdminClient();
  let query = supabase
    .schema("vidya")
    .from("tools")
    .select("*")
    .order("created_at", { ascending: false });

  if (search) {
    query = query.or(`name.ilike.%${search}%,slug.ilike.%${search}%`);
  }

  const { data, error } = await query;

  if (error) throw new Error(error.message);
  return data;
}

export async function createTool(formData: FormData) {
  const supabase = await createAdminClient();

  const name = formData.get("name") as string;
  const category_id = formData.get("category_id") as string;
  const category_name = formData.get("category_name") as string;
  const description = formData.get("description") as string;
  const course_id = formData.get("course_id") as string; // New field

  const slug = name
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/(^-|-$)/g, "");

  const { data, error } = await supabase
    .schema("vidya")
    .from("tools")
    .insert({
      name,
      slug,
      category_id: category_id || null,
      category_name: category_name || null,
      description,
      course_id: course_id || null, // Insert connection
      metadata: { group_name: category_name || "General" },
    })
    .select()
    .single();

  if (error) {
    if (error.code === "23505") {
      return { error: "A tool with this name already exists." };
    }
    return { error: error.message };
  }
  revalidatePath("/admin/tools");
  revalidatePath("/");
  return { data };
}

export async function deleteTool(toolId: string) {
  const supabase = await createAdminClient();
  const { error } = await supabase
    .schema("vidya")
    .from("tools")
    .delete()
    .eq("id", toolId);

  if (error) throw new Error(error.message);
  revalidatePath("/admin/tools");
  revalidatePath("/");
}

export async function updateTool(
  toolId: string,
  data: Record<string, unknown>
) {
  const supabase = await createAdminClient();
  const { error } = await supabase
    .schema("vidya")
    .from("tools")
    .update(data)
    .eq("id", toolId);

  if (error) throw new Error(error.message);
  revalidatePath("/admin/tools");
  revalidatePath("/");
}
