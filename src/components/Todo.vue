<template>
  <div class="todos">
    <h1>Todo App</h1>

    <input
      @keyup.enter="Add"
      type="text"
      v-model="title"
      placeholder="Que voulez-vous faire ?"
    />
    <button @click="Add">Ajouter à la liste</button>

    <ul>
      <li v-for="(todo, index) in todos" v-bind:key="index">
        {{ todo }}
        <span @click="Remove(index)" class="remove">x</span>
      </li>
    </ul>
  </div>
</template>

<script>
export default {
  name: "Todo",
  props: {
    msg: String
  },
  data() {
    return {
      title: "",
      todos: ["Faire les courses"]
    };
  },
  methods: {
    Add() {
      if (this.title != "") {
        this.todos.push(this.title);
        /*
        //  Ajoute l'élément au début de la liste 
        this.todos.unshift( this.title );
        */
        this.title = "";
      }
    },
    Remove(index) {
      /* 
      // Version javascript 
      this.todos.splice(index, 1);
      */
      this.$delete(this.todos, index);
    }
  }
};
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped lang="scss">
.remove {
  padding: 0.3rem 0.6rem;
  background-color: red;
  color: #fff;
  border-radius: 30px;
}

.remove:hover {
  cursor: pointer;
}

ul li {
  padding: 0.4rem;
  list-style: none;
}
</style>
