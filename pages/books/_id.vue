<template>
  <article>
    <h1>{{ book.title }}</h1>
    <hr />
    <section>
      <b-row>
        <b-col lg="3" sm="12">
          <b-img
            rounded
            thumbnail
            :src="book.cover.medium"
            :alt="book.title"
          ></b-img>
        </b-col>
        <b-col>
          <b-button
            size="md"
            variant="success"
            :disabled="state != 'initial'"
            @click="addToLibrary"
          >
            <img src="~assets/icons/book-white.svg" height="24" alt="library" />
            <span v-if="state == 'initial'"> Add To Libraray </span>
            <span v-else-if="state == 'downloading'">{{ progress }} % </span>
            <span v-else-if="state == 'downloaded'"> Adding To LIbraray </span>
            <span v-else-if="state == 'added'"> Added To LIbraray </span>
          </b-button>
          <br />
          <br />
          <p>
            <strong>Highest Word Rank:</strong> <kbd>{{ book.HWR }}</kbd>
          </p>
          <p>
            <strong>Unique Words Count:</strong> <kbd>{{ book.UWC }}</kbd>
          </p>
        </b-col>
      </b-row>
    </section>
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
import fetchProgress from 'fetch-progress';
import { library } from '@derock.ir/epubjs-plus';

export default Vue.extend({
  async asyncData({ store, params }) {
    const book = await store.dispatch('book/getBook', +params.id);
    return {
      book,
    };
  },
  data: () => ({
    progress: 0,
    state: 'initial',
  }),
  methods: {
    async addToLibrary() {
      this.state = 'downloading';
      const file = await fetch(this.book.file)
        .then(
          fetchProgress({
            onProgress: (progress: any) => {
              this.progress = progress.percentage;
            },
          })
        )
        .then(function (res) {
          return res.arrayBuffer();
        });
      this.state = 'downloaded';
      await library.addFromArrayBuffer(file);
      this.state = 'added';
    },
  },
});
</script>
