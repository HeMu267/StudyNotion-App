const cloudinary=require("cloudinary").v2
exports.DeleteImage=async(file)=>{
    const lastSlashIndex = file.lastIndexOf('/');
    const lastIndexOfDot=file.lastIndexOf('.');
// Find the second-to-last index of '/'
    const secondLastSlashIndex = file.lastIndexOf('/', lastSlashIndex - 1);
    console.log(secondLastSlashIndex);
    // Use slice to extract the substring between the second last and last '/'
    const publicId = file.slice(secondLastSlashIndex + 1,lastIndexOfDot);
    console.log(publicId);
    return await cloudinary.uploader.destroy(publicId);
}