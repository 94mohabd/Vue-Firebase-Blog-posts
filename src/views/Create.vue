<template>
  <div class="create">
    <form>
      <label>Title</label>
      <input v-model="title" type="text" required />
      <p v-if="errors.title" class="error">{{ errors.title }}</p>

      <label>Content</label>
      <textarea v-model="body" required></textarea>
      <p v-if="errors.body" class="error">{{ errors.body }}</p>

      <label>Tags (hit enter to add a tag)</label>
      <input v-model="tag" type="text" @keydown.enter.prevent="handleKeyDown" />

      <div v-for="tag in tags" :key="tag" class="pill">#{{ tag }}</div>
      <button @click.prevent="handleSubmit">Add Post</button>
    </form>
  </div>
</template>

<script>
import { ref } from "vue";
import { useRouter } from "vue-router";
import addPost from "../composables/addPost";
import { timestamp } from "../firebase/config";

export default {
  setup() {
    const title = ref("");
    const body = ref("");
    const tag = ref("");
    const tags = ref([]);
    const errors = ref({ title: "", body: "" });
    const router = useRouter();

    const handleKeyDown = () => {
      if (!tags.value.includes(tag.value)) {
        tag.value = tag.value.replace(/\s/, "");
        tags.value.push(tag.value);
      }
      tag.value = "";
    };

    const handleSubmit = async () => {
      errors.value.title = "";
      errors.value.body = "";
      // Validate fields
      if (!title.value.trim()) {
        errors.value.title = "Title is required.";
      }
      if (!body.value.trim()) {
        errors.value.body = "Content is required.";
      }

      // If there are errors, stop submission
      if (errors.value.title || errors.value.body) {
        return;
      }
      const post = {
        title: title.value,
        body: body.value,
        tags: tags.value,
        createdAt: timestamp(),
      };
      await addPost(post, router);
    };

    return { title, body, tag, tags, errors, handleKeyDown, handleSubmit };
  },
};
</script>

<style>
form {
  max-width: 480px;
  margin: 0 auto;
  text-align: left;
}
input,
textarea {
  display: block;
  margin: 10px 0;
  width: 100%;
  box-sizing: border-box;
  padding: 10px;
  border: 1px solid #eee;
}
textarea {
  height: 160px;
}
label {
  display: inline-block;
  margin-top: 30px;
  position: relative;
  font-size: 20px;
  color: white;
  margin-bottom: 10px;
}
label::before {
  content: "";
  display: block;
  width: 100%;
  height: 100%;
  background: #ff8800;
  position: absolute;
  z-index: -1;
  padding-right: 40px;
  left: -30px;
  transform: rotateZ(-1.5deg);
}
button {
  display: block;
  margin-top: 30px;
  background: #ff8800;
  color: white;
  border: none;
  padding: 8px 16px;
  font-size: 18px;
  cursor: pointer;
}
.pill {
  display: inline-block;
  margin: 10px 10px 0 0;
  color: #444;
  background: #ddd;
  padding: 8px;
  border-radius: 20px;
  font-size: 14px;
}
.error {
  color: red;
  font-size: 0.9em;
  margin-top: 5px;
}
</style>