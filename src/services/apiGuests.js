import supabase from "./supabase";

export async function createGuest(newGuest) {
  const { data, error } = await supabase
    .from("guests")
    .insert(newGuest)
    .select();

  if (error) {
    console.error(error);
    throw new Error("Guest cannot be created");
  }

  return data;
}
export async function getGuest(id) {
  let { data: guest, error } = await supabase
    .from("guests")
    .select("*")
    .eq("id", id)
    .single();

  if (error) {
    console.error(error);
    throw new Error("Guest not found");
  }

  return guest;
}
