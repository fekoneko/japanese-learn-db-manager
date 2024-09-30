export interface TaggedTemplate {
  array: TaggedTemplateArray;
  append: (chunks: TemplateStringsArray, ...args: any[]) => TaggedTemplate;
}

export type TaggedTemplateArray = [chunks: TemplateStringsArray, ...args: any[]];

const taggedTemplate = (chunks: TemplateStringsArray, ...args: any[]): TaggedTemplate => ({
  array: [chunks, ...args],
  append(chunks: TemplateStringsArray, ...args: any[]) {
    const newChunks: any = [
      ...(this.array[0].length > 1 ? this.array[0].slice(0, -1) : []),
      ...[this.array[0][this.array.length - 1] + chunks[0]],
      ...(chunks.length > 1 ? chunks.slice(1) : []),
    ];
    newChunks.raw = newChunks;
    Object.freeze(newChunks);
    this.array = [newChunks, ...this.array.slice(1), ...args];
    return this;
  },
});
export default taggedTemplate;
