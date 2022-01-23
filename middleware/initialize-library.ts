export default async function ({ store }: any) {
  await store.dispatch('library/initialize');
}
