type UniPromisify<T> = T extends { success?: (_s: infer S) => void }
  ? (_options: Omit<T, 'success' | 'fail' | 'complete'>) => Promise<S>
  : never
