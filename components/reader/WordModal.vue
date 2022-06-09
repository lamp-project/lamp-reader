<template>
  <b-modal id="word-modal" hide-backdrop hide-footer hide-header>
    <h2 class="modal-title">
      {{ word }}
      <small v-if="phonetic" class="phonetic" @click="playAudio">
        {{ phonetic.text }}
        <img v-if="phonetic.audio" src="~assets/icons/sound.svg" class="icon faded" alt="">
      </small>
    </h2>
    <hr>
    <p v-if="translation" class="my-4 translation">
      <ul>
        <li v-for="(meaning, key) in translation.meanings" :key="key">
          <b>{{meaning.partOfSpeech}}</b>
          <ol>
            <li v-for="(item, key) in meaning.definitions" :key="key">
              {{item.definition}}
            </li>
          </ol>
          <br>
        </li>
      </ul>
    </p>
    <center v-else>
      <br />
      <br />
      <b-spinner small></b-spinner>
      <br />
      <br />
      <br />
    </center>
    <hr>
    <b-button block variant="success" @click="setWordStatus('LEARNING')">OK, But needs more review</b-button>
    <b-button block variant="dark" @click="setWordStatus('KNOWN')">OK, Move to the known ones</b-button>
  </b-modal>
</template>

<script lang="ts">
import Vue from 'vue';
import { mapActions } from 'vuex';
import { BModal, BButton,BSpinner } from 'bootstrap-vue';
import { UserWordStatus } from '~/store/user-word';
import { HighlighterViewer } from '~/utils/HighlighterViewer';

export default Vue.extend({
  components: {
    BModal,
    BButton,BSpinner,
  },
  data: () => ({
    element: undefined,
    word: '',
    translation: undefined,
  }),
  computed: {
    phonetic() {
      if (this.translation?.phonetics?.length > 0) {
        return this.translation?.phonetics[0];
      } else {
        return undefined;
      }
    }
  },
  methods: {
    ...mapActions({ review: 'user-word/review' }),
    open(element: HTMLSpanElement) {
      this.element = element;
      this.word = element.textContent.toLowerCase();
      this.$bvModal.show('word-modal');
      this.fetchTranslation();
    },
    async fetchTranslation() {
      this.translation = undefined;
      [this.translation] = await fetch(
        `https://api.dictionaryapi.dev/api/v2/entries/en/${this.word}`
      ).then((res) => res.json());
    },
    playAudio() {
      if (this.phonetic?.audio) {
        new Audio(this.phonetic.audio).play();
      }
    },
    async setWordStatus(status: UserWordStatus) {
      const userWord = await this.review({ status, word: this.word });
      HighlighterViewer.updateWordStatus(this.element, userWord);
      this.$bvModal.hide('word-modal');
    }
  },
});
</script>
<style lang="scss">
#word-modal {
  .modal-title {
    text-transform: capitalize;
    small {
      font-size: 50%;
    }
  }
  .phonetic {
    cursor: pointer;
  }
  .translation {
    max-height: 25vh;
    overflow-y: auto;
  }
  ul {
    padding-left: 0px;
  }
  li>b {
    text-transform: capitalize;
  }
}
</style>
