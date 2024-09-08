import supabase, { supabaseUrl } from "./supabase";

export async function getCabins() {
  const { data, error } = await supabase.from("cabins").select("*");
  if (error) {
    console.log(error);
    throw new Error("cabins could not be loaded");
  }
  return data;
}

export async function deleteCabin(id) {
  const { data, error } = await supabase.from("cabins").delete().eq("id", id);
  if (error) {
    console.log(error);
    throw new Error("cabins could not be deleted");
  }

  return data;
}

async function uploadImage(image) {
  const imageName = `${Math.random()}-${image.name}`;
  const imagePath = `${supabaseUrl}/storage/v1/object/public/cabin-images/${imageName}`;
  // https://tifqawwuaiorgvqycztr.supabase.co/storage/v1/object/public/cabin-images/cabin-001.jpg?t=2024-08-25T20%3A16%3A47.202Z

  //upload image
  const { error: storageError } = await supabase.storage
    .from("cabin-images")
    .upload(imageName, image);

  if (storageError) throw new Error("Image upload failed");
  return imagePath;
}

export async function createCabin(newCabin) {
  //create cabin
  const { image, ...cabinData } = newCabin;

  let imagePath = image;
  console.log(imagePath);

  if (typeof imagePath === "object") imagePath = await uploadImage(image);

  const { data, error } = await supabase
    .from("cabins")
    .insert({ ...newCabin, image: imagePath })
    .select()
    .single();

  if (error) {
    console.log(error);
    throw new Error("cabins could not be created ", error.message);
  }

  return data;
}

export async function updateCabin(updatedCabin) {
  const { id, image, ...cabinData } = updatedCabin;

  // If the image is a File object (new upload), then upload it
  let imagePath;
  if (typeof image === "object") {
    imagePath = await uploadImage(image);
  } else {
    // Use the existing image URL if no new image is uploaded
    imagePath = image;
  }

  const { data, error } = await supabase
    .from("cabins")
    .update({ ...cabinData, image: imagePath })
    .eq("id", id)
    .select()
    .single();

  if (error) {
    console.log(error);
    throw new Error("Cabin update failed", error.message);
  }
  return data;
}
