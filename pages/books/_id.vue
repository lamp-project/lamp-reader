<template>
  <article>
    <h1>{{ book.title }}</h1>
    <hr />
    <b-img rounded thumbnail :src="book.cover.medium" :alt="book.title"></b-img>
    <br />
    <br />
    <section>
      <h2>Authors</h2>
      <hr />
      <ul>
        <li v-for="({ person }, i) of book.persons" :key="i">
          {{ person.name }}
        </li>
      </ul>
    </section>
    <br />
    <section>
      <h2>Subjects</h2>
      <hr />
      <ul>
        <li v-for="(subject, i) of book.subjects" :key="i">
          {{ subject.title }}
        </li>
      </ul>
    </section>
    <br />
    <section>
      <h2>Readablility</h2>
      <hr />
      <ul>
        <li><strong>A1:</strong> {{ book.level.A1.readability.toFixed() }}%</li>
        <li><strong>A2:</strong> {{ book.level.A2.readability.toFixed() }}%</li>
        <li><strong>B1:</strong> {{ book.level.B1.readability.toFixed() }}%</li>
        <li><strong>B2:</strong> {{ book.level.B2.readability.toFixed() }}%</li>
        <li><strong>C1:</strong> {{ book.level.C1.readability.toFixed() }}%</li>
        <li><strong>C2:</strong> {{ book.level.C2.readability.toFixed() }}%</li>
      </ul>
    </section>
    <br />
    <section>
      <h2>Words Count</h2>
      <hr />
      <ul>
        <li><strong>A1:</strong> {{ book.level.A1.count }}</li>
        <li><strong>A2:</strong> {{ book.level.A2.count }}</li>
        <li><strong>B1:</strong> {{ book.level.B1.count }}</li>
        <li><strong>B2:</strong> {{ book.level.B2.count }}</li>
        <li><strong>C1:</strong> {{ book.level.C1.count }}</li>
        <li><strong>C2:</strong> {{ book.level.C2.count }}</li>
      </ul>
    </section>
  </article>
</template>
<script lang="ts">
import Vue from 'vue';
export default Vue.extend({
  async asyncData({ store, params }) {
    const book = await store.dispatch('book/getBook', +params.id);
    return {
      book,
    };
  },
});
</script>
