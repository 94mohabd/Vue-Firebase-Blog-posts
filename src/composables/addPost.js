import { projectFirestore } from "../firebase/config";
import { collection, addDoc } from "firebase/firestore";

const addPost = async (post, router) => {
    try {
        if (!post.title || !post.body) {
            throw new Error("Title and body are required.");
        }
        const colRef = collection(projectFirestore, 'posts');
        // Add the new document to the collection
        await addDoc(colRef, post);
        router.push({ name: "Home" });
    } catch (err) {
        console.log(err);
    }
}

export default addPost;