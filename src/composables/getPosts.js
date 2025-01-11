import { ref } from "vue";
import { projectFirestore } from "../firebase/config";
import { collection, query, orderBy, onSnapshot } from "firebase/firestore";

const getPosts = () => {
    const posts = ref([]);
    const error = ref(null);

    const load = async () => {
        // await new Promise(resolve => {
        //     setTimeout(resolve, 2000);
        // })
        try {
            // Get a reference to the 'posts' collection
            const colRef = query(collection(projectFirestore, 'posts'), orderBy('createdAt', 'desc'));
            // Fetch documents from the collection            
            //const res = await getDocs(colRef);
            onSnapshot(colRef, snap => {
                posts.value = snap.docs.map(doc => {
                    return { ...doc.data(), id: doc.id }
                });
            });
        } catch (err) {
            error.value = err.message;
            console.log(error.value);
        }
    };

    return { posts, error, load };
}

export default getPosts;