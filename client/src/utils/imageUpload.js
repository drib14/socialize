export const checkImage = (file) => {
    let err = ""
    if (!file) return err = "File does not exist."

    if (file.size > 1024 * 1024) // 1mb
        err = "The largest image size is 1mb."

    if (file.type !== 'image/jpeg' && file.type !== 'image/png')
        err = "Image format is incorrect."

    return err;
}


export const imageUpload = async (images) => {
    let imgArr = [];
    for (const item of images) {
        const formData = new FormData();
        formData.append("file", item.camera ? item.camera : item);
        formData.append("upload_preset", "socialize"); 
        formData.append("cloud_name", "drcuvibon");

        try {
            const res = await fetch("https://api.cloudinary.com/v1_1/drcuvibon/upload", {
                method: "POST",
                body: formData,
            });

            if (!res.ok) {
                throw new Error(`Cloudinary upload failed with status: ${res.status}`);
            }

            const data = await res.json();
            imgArr.push({ public_id: data.public_id, url: data.secure_url });
        } catch (error) {
            console.error("Error uploading image:", error);
        }
    }
    return imgArr;
}
