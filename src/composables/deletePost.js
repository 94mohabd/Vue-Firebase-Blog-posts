import { doc, deleteDoc } from "firebase/firestore";
import { projectFirestore } from "../firebase/config";

const deletePost = async (id, router) => {
    try {
        // Get a reference to the specific document by ID
        const docRef = doc(projectFirestore, 'posts', id);
        // Delete the document
        await deleteDoc(docRef);
        router.push({ name: "Home" });
    } catch (err) {
        console.log(err.value);
    }
};

export default deletePost;
