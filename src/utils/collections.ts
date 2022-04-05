function getTitle(id: string) {
  const map: Record<string, string> = {
    cryptopunks: 'Cryptopunks',
    meebits: 'Meebits',
    'bored-ape-yacht-club': 'Bored Ape Yacht Club',
    'cool-cats': 'Cool Cats',
    'pudgy-penguins': 'Pudgy Penguins',
  };
  return map[id];
}

export {
  getTitle,
};
