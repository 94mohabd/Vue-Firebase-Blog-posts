import { projectFirestore } from "../firebase/config";
import { collection, addDoc } from "firebase/firestore";

const addPost = async (post, router) => {
    try {
        const colRef = collection(projectFirestore, 'posts');
        // Add the new document to the collection
        await addDoc(colRef, post);
        router.push({ name: "Home" });
    } catch (err) {
        console.log(err);
    }
}

export default addPost;