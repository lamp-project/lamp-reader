import { Mutex } from 'async-mutex';
import { ref } from 'vue';
import { LoginInput, SignupInput, User } from 'types/backend';
import { backend } from '@/utils/Backend';
import { userWordStore } from './user-word.store';

export class UserStore {
  private readonly initialising = new Mutex();
  public readonly user = ref<User>();

  async initialise(): Promise<User | undefined> {
    const release = await this.initialising.acquire();
    try {
      this.user.value = backend.authenticatedUser ?? undefined;
      return this.user.value;
    } finally {
      release();
    }
  }

  async login(input: LoginInput) {
    this.user.value = await backend.login(input);
    return this.user.value;
  }

  async signup(input: SignupInput) {
    this.user.value = await backend.signup(input);
    return this.user.value;
  }

  async signOut() {
    await backend.signOut();
    this.user.value = undefined;
    userWordStore.userWords.value = [];
  }
}

export const userStore = new UserStore();
