import { ref } from "vue";
import { projectFirestore } from "../firebase/config";
import { doc, getDoc, onSnapshot } from "firebase/firestore";

const getPost = (id) => {
    const post = ref(null);
    const error = ref(null);

    const load = async () => {
        try {
            // Get a reference to the specific document by id
            const docRef = doc(projectFirestore, 'posts', id);
            // Fetch the document  
            const res = await getDoc(docRef);
            if (!res.exists()) {
                throw new Error("That post does not exist");
            }
            post.value = { ...res.data(), id: res.id };
        } catch (err) {
            error.value = err.message;
            console.log(error.value);
        }
    };

    return { post, error, load };
}

export default getPost;