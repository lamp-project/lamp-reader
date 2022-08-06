<template>
  <ion-card>
    <ion-card-header class="ion-inherit-color md hydrated">
      <img class="header-img" :src="book.cover.medium" />
    </ion-card-header>

    <ion-card-content>
      <div class="title-box">
        <h1>{{ book.title }}</h1>
        <p>{{ creator }}</p>
      </div>
      <hr />
      <ReadMore :value="book.description || ''" />
    </ion-card-content>
  </ion-card>
</template>

<script lang="ts">
import { defineComponent } from 'vue';
import {
  IonCard,
  IonCardHeader,
  IonCardContent,
  IonCardTitle,
  IonCardSubtitle,
} from '@ionic/vue';
import { bookRepository } from '@/repositories/book.repository';
import { useRoute } from 'vue-router';
import { BookPerson } from 'types/backend';
import ReadMore from '@/components/utils/ReadMore.vue';

export default defineComponent({
  async setup() {
    // 1- validate param
    const { params } = useRoute();
    if (!params.id) {
      throw new Error(`ID param didn't provide.`);
    }
    // 2- loading book
    const book = await bookRepository.findUnique(+params.id);
    return { book };
  },
  components: {
    IonCard,
    IonCardHeader,
    IonCardContent,
    ReadMore,
  },
  computed: {
    creator() {
      // eslint-disable-next-line @typescript-eslint/ban-ts-comment
      // @ts-ignore
      const [author] = this.book.persons.filter(
        (person: BookPerson) => person.role == 'AUTHOR'
      );
      return author?.person?.name;
    },
  },
});
</script>
<style lang="scss" scoped>
ion-card-header {
  text-align: center;
  img {
    max-width: 66vw;
    box-shadow: 0px 2px 8px rgb(2 8 20 / 10%), 0px 8px 16px rgb(2 8 20 / 8%);
    border-radius: 6px;
  }
}
ion-card-content {
  .title-box {
    text-align: center;
    font-family: 'Merriweather', serif;
    color: black;
  }
}
</style>
